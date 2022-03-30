import { IUserReference } from "~/types";
import { getErrorMessage } from "~/helpers";
import { callApi } from "~/communication";
import CONFIG  from "~/config";

const USER_REFERENCE_URL = 
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/userReference`;

export const getUserReference = async(catchCertificate?: string): Promise<IUserReference>  => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }

  const response: Response = await callApi(USER_REFERENCE_URL, { documentnumber: catchCertificate });
  const userReference: string = await response.text();
  return {userReference};
};

export const addUserReference = async(catchCertificate: string | undefined, userReference: FormDataEntryValue = ''):Promise<IUserReference> => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }

  const response: Response = await callApi(USER_REFERENCE_URL, {
    "Content-Type": "application/json",
    documentnumber: catchCertificate,
  }, 'POST' , { userReference });
  
  return onAddUserReferenceResponse(response, userReference); 
};

const onAddUserReferenceResponse = async(response: Response, userReference?: FormDataEntryValue): Promise<IUserReference> => {
  switch(response.status) {
    case 200:
    case 204:
      return {
        userReference: userReference as string,
        errors: []
      };
    case 400:
      const data = await response.json();
      return {
        userReference: userReference as string,
        errors: [{
          key: 'userReference',
          message: getErrorMessage(data.userReference)
        }]
      }
    default:
      throw new Error(`Unexpected error: ${response.status}`);
  }
}
