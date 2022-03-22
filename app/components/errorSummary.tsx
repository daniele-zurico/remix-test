import React, { ReactElement } from "react";
import { IError } from '../interfaces/errors.interface';

interface IErrorSummaryProps {
  errors: IError[];
}

export const ErrorSummary = ({ errors }: React.PropsWithChildren<IErrorSummaryProps>): ReactElement => (
  <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" data-disable-auto-focus="true" data-module="govuk-error-summary">
    <h2 className="govuk-error-summary__title" id="error-summary-title">
      There is a problem
    </h2>
    <div className="govuk-error-summary__body">
      <ul className="govuk-list govuk-error-summary__list">
        {errors.map((error: IError) => (
          <li key={error.key}>
            <a href={`#${error.key}`}>{error.message}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)