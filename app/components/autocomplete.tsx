import { IAccessibleAutocomplteProps, ISpecies } from '~/types/catchCertificate';

let Autocomplete = {};

if (typeof window !== "undefined") {
  Autocomplete = require("accessible-autocomplete/react").default;
}

export const AccessibleAutocomplete = ({
  id,
  name,
  defaultValue,
  defaultSelectMessage,
  nojsValues,
}: IAccessibleAutocomplteProps) => (
  <select
    defaultValue={defaultValue}
    className="autocomplete__input autocomplete__input--default"
    id={id}
    name={name}
  >
    <option key="-1" value="">
      {defaultSelectMessage}
    </option>
    {nojsValues.map(({ faoName, faoCode }: ISpecies, index: number) => (
      <option key={index} value={`${faoName} (${faoCode})`}>
        {`${faoName} (${faoCode})`}
      </option>
    ))}
  </select>
);
