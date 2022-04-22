import { isEmpty } from "lodash";
import { ICommodityCode, IProduct, ISearchState, ISpecies, ISpecieStateLookupResult, ICodeAndDescription, ILabelAndValue, IError } from "~/types";
import { getErrorMessage, get, post } from "~/helpers";
import CONFIG from "~/config";

const ADDED_SPECIES_URL = 
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/fish/added`;

const ADD_SPECIES_URL = 
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/fish/add`;

const SPECIES_URL =
`${CONFIG.MMO_ECC_REFERENCE_SVC_URL}/v1/species`;

const FAVOURITES_URL =
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/favourites`;

const SPECIES_STATE_LOOK_UP =
`${CONFIG.MMO_ECC_REFERENCE_SVC_URL}/v1/speciesStateLookup`;

const COMMODITY_CODE_LOOK_UP =
`${CONFIG.MMO_ECC_REFERENCE_SVC_URL}/v1/commodities/search`;

const validationErrorMessage : { [key: string]: string } = {
  species: 'error.species.any.empty',
  state: 'error.state.any.required',
  presentation: 'error.presentation.any.required'
};

type Config = {
  config: { maxSpeciesLimit?: string; }
}

export const getAddedSpeciesPerUser = async (catchCertificate?: string): Promise<Config & { products: IProduct[], documentNumber: string }> => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }

  const response: Response = await get(ADDED_SPECIES_URL, { documentnumber: catchCertificate });

  const addedSpeciesPerUser: { species: any[] } = await response.json() || { species: [] };

  if (!isEmpty(addedSpeciesPerUser.species)) {
    const products: IProduct[] = addedSpeciesPerUser.species.map((_: any) => ({
      id: _.id,
      species: _.species,
      speciesCode: _.speciesCode,
      state: _.state,
      stateLabel: _.stateLabel,
      presentation: _.presentation,
      presentationLabel: _.presentationLabel,
      commodityCode: _.commodity_code,
      commodityCodeDescription: _.commodity_code_description,
    }));

    return {
      config: {
        maxSpeciesLimit: CONFIG.LIMIT_ADD_SPECIES
      },
      products,
      documentNumber: catchCertificate
    };
  }

  return {
    config: {
      maxSpeciesLimit: CONFIG.LIMIT_ADD_SPECIES
    },
    products: [],
    documentNumber: catchCertificate
  }
};

export const getSpecies = async (): Promise<ISpecies[]> => {
  const response: Response = await get(`${SPECIES_URL}?uk=Y`);
  const species = await response.json();
  return species.filter((_species: ISpecies) => 
    !isEmpty(_species.faoCode) &&
    !isEmpty(_species.faoName) &&
    !isEmpty(_species.scientificName)
  );
}

export const searchStateLookup = async (fao: string | null, state?: string): Promise<ISearchState> => {
  if (!fao) {
    return { states: [], presentations: [] }
  }

  const response: Response = await get(`${SPECIES_STATE_LOOK_UP}?faoCode=${fao}`);
  const lookupResults: ISpecieStateLookupResult[] = await response.json();

  return {
    states: lookupResults.map((res: ISpecieStateLookupResult) => ({
      label: res.state.description,
      value: res.state.code
    })),
    presentations: (lookupResults.find((res: ISpecieStateLookupResult) => {
      return res.state.code === state
    }) || { presentations: []})
      .presentations.map((presentation: ICodeAndDescription) => ({
        label: presentation.description,
        value: presentation.code
      }))
  };
}

export const getCommodityCodes = async (faoCode: string, stateCode: string, presentationCode: string): Promise<ILabelAndValue[]> => {
  if (!faoCode || !stateCode || !presentationCode) {
    return []
  };

  const response: Response = await get(`${COMMODITY_CODE_LOOK_UP}?speciesCode=${faoCode}&state=${stateCode}&presentation=${presentationCode}`);
  const commodityCodes: ICommodityCode[] = await response.json();
  return commodityCodes.map((commodityCode: ICommodityCode) => ({
    label: `${commodityCode.code} - ${commodityCode.description}`,
    value: commodityCode.code,
    description: commodityCode.description
  }));
}

export const getCommodityCodeDescription = async (faoCode: string, stateCode: string, presentationCode: string, commodityCode: string): Promise<string | undefined> => {
  const commodityCodes = await getCommodityCodes(faoCode, stateCode, presentationCode) || [];
  return commodityCodes.find((cachedCommodityCode: ILabelAndValue) => cachedCommodityCode.value === commodityCode)?.description;
}

export const getFavourites = async (): Promise<ISpecies[]> => {
  const response: Response = await get(FAVOURITES_URL);
  const favourites = await response.json();

  return favourites.map((favourite: any) => ({
    faoCode: favourite.speciesCode,
    faoName: favourite.species,
    scientificName: favourite.scientificName
  }))
}

export const getAddSpeciesLoaderData = async (catchCertificate: string, faoCode: string, stateCode: string, presentationCode: string): Promise<any> => {
  const [ getAddedSpeciesPerUserData, species, favourites, stateLookup, commodityCodes ] = await Promise.all([
    getAddedSpeciesPerUser(catchCertificate),
    getSpecies(),
    getFavourites(),
    searchStateLookup(faoCode, stateCode),
    getCommodityCodes(faoCode, stateCode, presentationCode)
  ]);

  return {
    ...getAddedSpeciesPerUserData,
    species,
    favourites,
    stateLookup,
    commodityCodes,
    ...findSpeciesName(faoCode, species),
    stateCode,
    stateLabel: findStateLabel(stateCode, stateLookup),
    presentationCode,
    presentationLabel: findPresentationLabel(presentationCode, stateLookup),
  }
}

const findSpeciesName = (faoCode: string, species: ISpecies[]): ISpecies | undefined => {
  if (!faoCode || !species.length) {
    return undefined;
  }

  return species.find((species: ISpecies) => species.faoCode === faoCode)
}


const findStateLabel = (code: string, lookup: ISearchState): string | undefined  => {
  if (!code || !lookup?.states) {
    return undefined;
  }

  return lookup?.states.find((state: ILabelAndValue) => state.value === code)?.label
}

const findPresentationLabel = (presentationCode: string, lookup: ISearchState): string | undefined  => {
  if (!presentationCode || !lookup?.presentations) {
    return undefined;
  }

  const presentation: ILabelAndValue | undefined = lookup.presentations.find((presentation: ILabelAndValue) => presentation.value === presentationCode);

  if (presentation === undefined) {
    return undefined;
  }

  return presentation.label;
}

export const addSpecies = async (catchCertificate: string | undefined, requestBody: any): Promise<any> => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }

  const response: Response = await post(ADD_SPECIES_URL, {
    "Content-Type": "application/json",
    documentnumber: catchCertificate,
  }, requestBody);

  return onAddSpeciesResponse(response, requestBody);
}

const onAddSpeciesResponse = async (response: Response, requestBody: any): Promise<{data: any, errors: IError[]}> => {
  switch(response.status) {
    case 200:
    case 204:
      return {
        data: requestBody,
        errors: []
      };
    case 400:
      const data = await response.json();
      return {
        data: requestBody,
        errors: Object.keys(data).map(error => ({
          key: error,
          message: getErrorMessage(data[error])
        }))
      };
    default:
      throw new Error(`Unexpected error: ${response.status}`);
  }
}

export const validateValues = (validate: string[], values: any): IError[] => {
  return validate.reduce((acc: IError[], key: string) => {
    if (!values[key]) {
     return [...acc, {
        key,
        message: getErrorMessage(validationErrorMessage[key])
      }]
    }

    return acc;
  }, []);
}