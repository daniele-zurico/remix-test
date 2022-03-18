import { ReactElement } from "react";
import { json, Link, useLoaderData } from "remix";
import { CatchCertificate, getCatchCertificates } from "./catchCertificate";

export const loader = async () => {
  return json(getCatchCertificates());
};

const Dashboard: React.FC = (): ReactElement => {
  const certificates = useLoaderData<CatchCertificate[]>();
  return (
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
          <th scope="col" className="govuk-table__header">
            Status
          </th>
          <th scope="col" className="govuk-table__header">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {certificates.map(({ documentNumber, userReference, status, startedAt }) => (
          <tr key={documentNumber} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell">
              {documentNumber}
            </td>
            <td className="govuk-table__cell">{userReference}</td>
            <td className="govuk-table__cell">{startedAt}</td>
            <td className="govuk-table__cell">{status}</td>
            <td className="govuk-table__cell">
              <Link
                to={`/catch-certificates/${documentNumber}/what-are-you-exporting`}
                className="govuk-link"
              >
                Continue
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dashboard;