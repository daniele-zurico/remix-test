import { get } from "~/helpers";
import { IDashboardPSData } from "~/types";
import CONFIG from "~/config";

const STORAGE_NOTE_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=processingStatement`;
const NOTIFICATION_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`;

export const getProcessingStatments = async (): Promise<IDashboardPSData> => {
  const res: Response = await get(STORAGE_NOTE_URL);
  const data = await res.json();

  const response: Response = await get(NOTIFICATION_URL);
  const notification = await response.json();

  return { ...data, notification };
};
