import { isEmpty } from "lodash";
import { IProduct } from "~/types";
import CONFIG from "~/config";

const ADDED_SPECIES_URL = 
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/fish/added`;

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