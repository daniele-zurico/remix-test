export type ProcessingStatement = {
  documentNumber: string;
  userReference: string;
  startedAt: string;
};

export function getProcessingStatements(): ProcessingStatement[] {
  return [
    {
      documentNumber: "GBR-2022-PS-E8F37B0E8",
      userReference: "PS DATA VALIDATION",
      startedAt: "17 Mar 2022",
    },
  ];
}