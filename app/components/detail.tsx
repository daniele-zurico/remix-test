type DetailsProps ={
  summary: string;
};

export const Details = ({ summary, children }: React.PropsWithChildren<DetailsProps>) => {
  return (
    <details className="govuk-details" data-module="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          {summary}
        </span>
      </summary>
      <div className="govuk-details__text">
          {children}
      </div>
    </details>
  )
}