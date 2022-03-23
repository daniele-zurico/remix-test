let Autocomplete = {};

if (typeof window !== "undefined") {
  Autocomplete = require("accessible-autocomplete/react").default;
}

interface IAccessibleAutocomplteProps {
  id: string;
  name: string;
  defaultValue?: string;
  defaultSelectMessage?: string;
  nojsValues: string[];
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
    {nojsValues.map((v: string, index: number) => (
      <option key={index} value={v}>
        {v}
      </option>
    ))}
  </select>
);
