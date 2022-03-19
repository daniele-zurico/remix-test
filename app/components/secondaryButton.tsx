import { ReactElement } from "react"

export const SecondaryButton: React.FC = ({ ...props }): ReactElement => {
  return (
    <button type="submit" className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary" data-module="govuk-button">
      {props.children}
    </button>
  )
}