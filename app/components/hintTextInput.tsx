import { ReactElement } from "react";

interface HintTextInputProps {
  id: string;
  label: string;
  hint: string;
  id_hint: string;
  value: string;
  onChange: React.ChangeEventHandler;
}

export const HintTextInput = ({ id, label, id_hint, hint, value, onChange }: HintTextInputProps): ReactElement => (
  <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={id}>
      {label}
    </label>
    <div id={id_hint} className="govuk-hint govuk-!-width-two-thirds">
      {hint}
    </div>
    <input className="govuk-input govuk-!-width-two-thirds" id={id} name={id} type="text" aria-describedby={id_hint} value={value} onChange={onChange}/>
  </div>
)