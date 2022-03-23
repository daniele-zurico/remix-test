import CONFIG from "~/config";


export const getAddedSpeciesPerUser = async (catchCertificate?: string) => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }
  return {
    documentNumber: catchCertificate,
    config: {
      maxSpeciesLimit: CONFIG.LIMIT_ADD_SPECIES
    }
  };
};

//{"species":[{"id":"GBR-2022-CC-A883F4F43-af26a64b-0363-408c-ad9d-88a1900f9777","species":"Atlantic cod (COD)","speciesCode":"COD","scientificName":"Gadus morhua","commodity_code":"03044410","commodity_code_description":"Fresh or chilled fillets of cod \"Gadus morhua, Gadus ogac, Gadus macrocephalus\" and of Boreogadus saida","user_id":null,"factor":2.6,"caughtBy":[{"numberOfSubmissions":0,"id":"GBR-2022-CC-A883F4F43-1647423660","vessel":"AUTUMN TIDE","pln":"SD407","homePort":"NORTH SHIELDS","flag":"GBR","cfr":"GBRC19976","imoNumber":null,"licenceNumber":"27544","licenceValidTo":"2382-12-31","date":"2022-03-16","faoArea":"FAO27","weight":10}],"state":"FRE","stateLabel":"Fresh","presentation":"FIL","presentationLabel":"Filleted"}]}
