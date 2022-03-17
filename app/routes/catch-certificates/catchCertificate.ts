export type CatchCertificate = {
  documentNumber: string;
  userReference: string;
  status: string;
};

export function getCatchCertificates(): CatchCertificate[] {
  return [
    {
      documentNumber: "GBR-2022-CC-E8F37B0E8",
      userReference: "CC DATA VALIDATION",
      status: "DRAFT",
    },
  ];
}