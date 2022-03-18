import { ReactElement } from "react";
import { json, Link, useLoaderData } from "remix";
import { ProcessingStatement, getProcessingStatements } from "./processingStatement";

export const loader = async () => {
  return json(getProcessingStatements());
};

const Dashboard: React.FC = (): ReactElement => {
  const certificates = useLoaderData<ProcessingStatement[]>();
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
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {certificates.map(({ documentNumber, userReference, startedAt }) => (
          <tr key={documentNumber} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell">
              {documentNumber}
            </td>
            <td className="govuk-table__cell">{userReference}</td>
            <td className="govuk-table__cell">{startedAt}</td>
            <td className="govuk-table__cell">
              <Link
                to={`/`}
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