export type StorageDocument = {
  documentNumber: string;
  userReference: string;
  startedAt: string;
};

export function getStorageDocuments(): StorageDocument[] {
  return [
    {
      documentNumber: "GBR-2022-SD-E8F37B0E8",
      userReference: "SD DATA VALIDATION",
      startedAt: "17 Mar 2022",
    },
  ];
}