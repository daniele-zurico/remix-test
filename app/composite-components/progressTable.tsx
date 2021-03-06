import { Link } from "remix";
import { ICatchCertificate } from "../types/catchCertificate";
import { IProcessingStatement } from "../types/processingStatement";
import { IStorageDocument } from "../types/storageDocument";
import { Journeys } from "../types/journeys";
interface ProgressTableProps {
  certificates:
    | ICatchCertificate[]
    | IProcessingStatement[]
    | IStorageDocument[];
  journey: Journeys;
}

export const ProgressTable = ({
  certificates,
  journey,
}: ProgressTableProps) => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Document number
        </th>
        <th scope="col" className="govuk-table__header">
          Your reference
        </th>
        <th scope="col" className="govuk-table__header">
          Date started
        </th>
        {journey === Journeys.CatchCertificate && (
          <th scope="col" className="govuk-table__header">
            Status
          </th>
        )}
        <th scope="col" className="govuk-table__header">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {certificates.map(
        (
          certificate:
            | ICatchCertificate
            | IProcessingStatement
            | IStorageDocument
        ) => (
          <tr key={certificate.documentNumber} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell">
              {certificate.documentNumber}
            </td>
            <td className="govuk-table__cell">{certificate.userReference}</td>
            <td className="govuk-table__cell">{certificate.startedAt}</td>
            {"status" in certificate && journey === Journeys.CatchCertificate && (
              <td className="govuk-table__cell">
                <strong className="govuk-tag govuk-tag--grey">
                  {certificate.status}
                </strong>
              </td>
            )}
            <td className="govuk-table__cell">
              <Link
                to={journey === Journeys.CatchCertificate ? `/create-catch-certificate/${certificate.documentNumber}/add-your-reference` : '/'}
                className="govuk-link"
              >
                Continue
              </Link>
              <br />
              <Link to="/" className="govuk-link">
                Delete
              </Link>
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
);
