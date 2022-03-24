import { isEmpty } from "lodash";
import { ICommodityCodes, IPresentation, IProduct, ISpecies, IStates } from "~/types";
import CONFIG from "~/config";

const ADDED_SPECIES_URL = 
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/fish/added`;

const SPECIES_URL =
`${CONFIG.MMO_ECC_REFERENCE_SVC_URL}/v1/species?uk=?`;

const STATES_URL =
`${CONFIG.MMO_ECC_REFERENCE_SVC_URL}/v1/states`;

const PRESENTATIONS_URL =
`${CONFIG.MMO_ECC_REFERENCE_SVC_URL}/v1/presentations`;

const FAVOURITES_URL =
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/favourites`;

type Config = {
  config: { maxSpeciesLimit?: string; }
}

export const getAddedSpeciesPerUser = async (catchCertificate?: string): Promise<Config & { products: IProduct[], documentNumber: string }> => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }

  const response = await fetch(ADDED_SPECIES_URL,
    {
      method: "GET",
      headers: {
        documentnumber: catchCertificate,
      },
    }
  );

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
  const response: Response = await fetch(SPECIES_URL);
  const species = await response.json();
  return species;
}

export const getStates = async (): Promise<IStates[]> => {
  const response: Response = await fetch(STATES_URL);
  const states = await response.json();
  console.log(states);
  return states;
}

export const getPresentations = async (): Promise<IPresentation[]> => {
  const response: Response = await fetch(PRESENTATIONS_URL);
  const presentations = await response.json();

  return presentations;
}

export const getCommodityCodes = async (): Promise<ICommodityCodes[]> => {
  return [];
}

export const getFavourites = async (): Promise<ISpecies[]> => {
  const response = await fetch(FAVOURITES_URL);
  const favourites = await response.json();

  return favourites.map((favourite: any) => ({
    faoCode: favourite.speciesCode,
    faoName: favourite.species,
    scientificName: favourite.scientificName
  }))
}

export const getAddSpeciesLoaderData = async (catchCertificate?: string): Promise<any> => {
  const [ getAddedSpeciesPerUserData, species, favourites, states, presentations, commodityCodes ] = await Promise.all([
    getAddedSpeciesPerUser(catchCertificate),
    getSpecies(),
    getFavourites(),
    getStates(),
    getPresentations(),
    getCommodityCodes()
  ])

  return {
    ...getAddedSpeciesPerUserData,
    species,
    favourites,
    states,
    presentations,
    commodityCodes
  }
}