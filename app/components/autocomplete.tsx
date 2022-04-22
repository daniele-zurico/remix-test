import { isEmpty } from "lodash";
import { IAccessibleAutocomplteProps, ISpecies } from "~/types";

export const AccessibleAutocomplete = ({
  id,
  name,
  value,
  defaultValue,
  defaultSelectMessage,
  nojsValues,
  error,
}: IAccessibleAutocomplteProps) => (
  <div
    className={`govuk-form-group ${
      !isEmpty(error) ? "govuk-form-group--error" : ""
    }`.trim()}
  >
    <label
      className="govuk-label govuk-!-font-weight-bold"
      htmlFor="my-autocomplete"
    >
      Common name or FAO code
      <div className="govuk-hint">For example, Lobster or LBE</div>
      {!isEmpty(error) && (
        <p id="species-error" className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> Enter the common
          name or FAO code
        </p>
      )}
      <select
        defaultValue={defaultValue}
        className={`autocomplete__input autocomplete__input--default ${
          !isEmpty(error) ? "autocomplete__input--error " : ""
        }govuk-!-width-two-thirds`}
        id={id}
        name={name}
        value={value}
      >
        <option key="-1" value="">
          {defaultSelectMessage}
        </option>
        {nojsValues.map(({ faoName, faoCode }: ISpecies, index: number) => (
          <option key={index} value={faoCode}>
            {`${faoName} (${faoCode})`}
          </option>
        ))}
      </select>
    </label>
  </div>
);
