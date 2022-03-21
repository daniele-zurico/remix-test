import { ReactElement } from "react";

export const BackButton = ({ ...props }):ReactElement => {
  return (
    <a href={props.href} className="govuk-back-link">Back</a>
  )
}