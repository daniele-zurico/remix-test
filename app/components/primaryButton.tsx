import { ReactElement } from "react"

export const PrimaryButton: React.FC = ({ ...props }): ReactElement => {
  return (
    <button type="submit" className="govuk-button" data-module="govuk-button">
      {props.children}
    </button>
  )
}