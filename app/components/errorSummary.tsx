import { IError } from "../types/errors";

interface IErrorSummaryProps {
  errors: IError[];
}

export const ErrorSummary = ({
  errors,
}: React.PropsWithChildren<IErrorSummaryProps>) => (
  <div
    className="govuk-error-summary"
    aria-labelledby="error-summary-title"
    role="alert"
    data-disable-auto-focus="true"
    data-module="govuk-error-summary"
  >
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      There is a problem
    </h2>
    <div className="govuk-error-summary__body">
      <ul className="govuk-list govuk-error-summary__list">
        {errors.map((error: IError) => (
          <li key={error.key}>
            {/* Please do not change this to <Link />, as we need the native browser behaviour that takes the user to the input where the error is as per GDS guidelines */}
            <a href={`#${error.key}`}>{error.message}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
