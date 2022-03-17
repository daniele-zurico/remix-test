import { ReactElement } from "react";
import { Link } from "remix";

const Home: React.FC = (): ReactElement => {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="govuk-heading-l">What do you want to do?</h1>
      <ul>
        <li>
          <Link to="/catch-certificates" className="govuk-link">
            Catch certificates
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Home;