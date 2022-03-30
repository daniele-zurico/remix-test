import { apiCall } from "~/communication";
import CONFIG from "~/config";
import {IDashboardData } from "~/types";

const CC_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=catchCertificate`
const NOTIFICATION_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`;

export const getCatchCertificates = async(): Promise<IDashboardData[]> => {
    const res: Response = await apiCall(CC_URL);
    const data = await res.json();
    const response: Response = await apiCall(NOTIFICATION_URL);
    const notification = await response.json();
    return { ...data, notification };
}