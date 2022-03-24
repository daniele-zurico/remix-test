
type optionProp = {
  label: string,
  value: string
};

type optionsProps = {
  label: string;
  options: optionProp[]
};

export const Select = ({ label, options }: optionsProps) => (
  <div className="govuk-form-group">
  <label className="govuk-label" style={{ fontWeight: 700 }} htmlFor="sort">
    {label}
  </label>
  <select className="govuk-select" id="sort" name="sort" style={{ width: '60%' }}>
    {options.map((option: optionProp, index: number) => <option key={index} value={option.value}>{option.label}</option>)}
  </select>
</div>
)