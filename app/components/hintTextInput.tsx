import { IError } from "../types/errors";

interface HintTextInputProps {
  id: string;
  label: string;
  hint: string;
  id_hint: string;
  value: string;
  onChange?: React.ChangeEventHandler;
  error?: IError;
}

export const HintTextInput = ({
  id,
  label,
  id_hint,
  hint,
  value,
  onChange,
  error,
}: HintTextInputProps) => (
  <div
    className={`govuk-form-group ${
      error === undefined ? "" : "govuk-form-group--error"
    }`.trim()}
  >
    <label className="govuk-label" htmlFor={id}>
      {label}
    </label>
    <div id={id_hint} className="govuk-hint govuk-!-width-two-thirds">
      {hint}
    </div>
    {error !== undefined && (
      <p id="event-name-error" className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {error.message}
      </p>
    )}
    <input
      className={`govuk-input govuk-!-width-two-thirds ${
        error === undefined ? "" : "govuk-input--error"
      }`.trim()}
      id={id}
      name={id}
      type="text"
      aria-describedby={id_hint}
      value={value}
      onChange={onChange}
    />
  </div>
);
