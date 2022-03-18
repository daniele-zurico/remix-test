export type CatchCertificate = {
  documentNumber: string;
  userReference: string;
  startedAt: string;
  status: string;
};

export function getCatchCertificates(): CatchCertificate[] {
  return [
    {
      documentNumber: "GBR-2022-CC-E8F37B0E8",
      userReference: "CC DATA VALIDATION",
      startedAt: "17 Mar 2022",
      status: "DRAFT",
    },
  ];
}