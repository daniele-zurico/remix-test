import { callApi } from "~/communication";
import CONFIG from "~/config";
import {IDashboardData } from "~/types";

const CC_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=catchCertificate`
const NOTIFICATION_URL = `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`;

export const getCatchCertificates = async(): Promise<IDashboardData[]> => {
    const res: Response = await callApi(CC_URL);
    const data = await res.json();
    const response: Response = await callApi(NOTIFICATION_URL);
    const notification = await response.json();
    return { ...data, notification };
}