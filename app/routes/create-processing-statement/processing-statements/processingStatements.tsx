import { callApi } from "~/communication";
import CONFIG from "~/config";
import { IDashboardPSData } from "~/types";

const STORAGE_NOTE_SURL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=processingStatement`;
const NOTIFICATION_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`;

export const getProcessingStatments = async (): Promise<IDashboardPSData> => {
  const res: Response = await callApi(STORAGE_NOTE_SURL);
  const data = await res.json();

  const response: Response = await callApi(NOTIFICATION_URL);
  const notification = await response.json();

  return { ...data, notification };
};
