import { ReactElement } from "react"
import { Link } from "remix";
import moment from 'moment';
import { CompletedCertificate } from '../routes/create-catch-certificate/catchCertificate';

interface CompleteTableProps {
  certificates: CompletedCertificate[]
};

export const CompleteTable = ({ certificates }: CompleteTableProps): ReactElement => {
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
            Date created
          </th>
          <th scope="col" className="govuk-table__header">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {certificates.map(({ documentNumber, userReference, createdAt }) => (
          <tr key={documentNumber} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell">
              {documentNumber}
            </td>
            <td className="govuk-table__cell">{userReference}</td>
            <td className="govuk-table__cell">{moment(createdAt).format('DD MMM YYYY')}</td>
            <td className="govuk-table__cell">
              <Link
                to={`/`}
                className="govuk-link"
              >
                View
              </Link>
              <br />
              <Link
                to="/"
                className="govuk-link"
              >
               Void
              </Link>
              <br />
              <Link
                to="/"
                className="govuk-link"
              >
               Copy
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}