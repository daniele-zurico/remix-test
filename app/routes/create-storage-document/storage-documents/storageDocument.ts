import { callApi } from "~/communication";
import CONFIG from "~/config";
import { IDashboardSDData } from "~/types";

const STORAGE_NOTE_SURL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=storageNotes`;
const NOTIFICATION_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`;

export const getStorageDocuments = async(): Promise<IDashboardSDData> => {
  const res: Response = await callApi(STORAGE_NOTE_SURL);
  const data = await res.json();

  const response: Response = await callApi(NOTIFICATION_URL);
  const notification = await response.json();

  return { ...data, notification };
}