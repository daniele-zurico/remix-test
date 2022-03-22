import { IStorageDocument } from "~/interfaces/storage-document.interface";

export function getStorageDocuments(): IStorageDocument[] {
  return [
    {
      documentNumber: "GBR-2022-SD-E8F37B0E8",
      userReference: "SD DATA VALIDATION",
      startedAt: "17 Mar 2022",
    },
  ];
}