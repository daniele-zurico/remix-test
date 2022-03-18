import { ReactElement } from "react";
import { Link } from "remix";

const Home: React.FC = (): ReactElement => {
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">What do you want to do?</h1>
      <ul>
        <li>
          <Link to="/catch-certificates" className="govuk-link">
            Catch certificates
          </Link>
        </li>
        <li>
          <Link to="/processing-statements" className="govuk-link">
            Processing statements
          </Link>
        </li>
        <li>
          <Link to="/storage-documents" className="govuk-link">
            Storage Documents
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Home;