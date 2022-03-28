import {
  IAccessibleAutocomplteProps,
  ISpecies,
} from "~/types/catchCertificate";

export const AccessibleAutocomplete = ({
  id,
  name,
  value,
  defaultValue,
  defaultSelectMessage,
  nojsValues,
  onChange
}: IAccessibleAutocomplteProps) => (
  <select
    defaultValue={defaultValue}
    className="autocomplete__input autocomplete__input--default govuk-!-width-two-thirds"
    id={id}
    name={name}
    value={value}
    onChange={onChange}
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
);
