import { json } from "remix";
import CONFIG  from "~/config";

const USER_REFERENCE_URL = 
`${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/userReference`;

type UserReference = {
  userReference: string;
}

export const getUserReference = async(catchCertificate?: string): Promise<UserReference>  => {
  if(!catchCertificate) {
    throw new Error("catchCertificate is required");
  }

  const response = await fetch(USER_REFERENCE_URL,
    {
      method: "GET",
      headers: {
        documentnumber: catchCertificate,
      },
    }
  );
  const userReference: string = await response.text();
  return {userReference};
};

export const addUserReference = async(catchCertificate: string, userReference: FormDataEntryValue = ''):Promise<string> => {

  const response = await fetch(USER_REFERENCE_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        documentnumber: catchCertificate,
      },
      body: JSON.stringify({ userReference }),
    }
  );
  
  return onAddUserReferenceResponse(catchCertificate, response, userReference); 
};

const onAddUserReferenceResponse = async(catchCertificate: string, response: Response, userReference?: FormDataEntryValue): Promise<string> => {
  switch(response.status) {
    case 200:
    case 204:
      return `/create-catch-certificate/${catchCertificate}/what-are-you-exporting`;
    case 400:
      const data = await response.json();
      throw json(
        { userReferenceError: data["userReference"], userReference },
        response.status
      );
    default:
      throw new Error(`Unexpected error: ${response.status}`);
  }
}
