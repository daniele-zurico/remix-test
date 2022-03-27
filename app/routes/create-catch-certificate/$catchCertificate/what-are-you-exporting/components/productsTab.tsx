import {
  Details,
  FormSelect,
  FormCheckbox,
  Button,
  BUTTON_TYPE,
} from "@capgeminiuk/dcx-react-library";
import { AccessibleAutocomplete } from "~/components";
import { ILabelAndValue, ISpecies } from "~/types";

type ProductTabsProps = {
  species: ISpecies[];
  states: ILabelAndValue[];
  presentations: ILabelAndValue[];
  commodityCodes: ILabelAndValue[];
  onChange: (event: any) => void;
  faoCode?: string;
  stateCode?: string;
  presentationCode?: string;
};

export const ProductsTab = ({
  species,
  states,
  faoCode,
  stateCode,
  presentationCode,
  presentations,
  commodityCodes,
  onChange
}: ProductTabsProps) => (
  <>
    <h2 className="govuk-heading-l">Add products</h2>
    <label
      className="govuk-label govuk-!-font-weight-bold"
      htmlFor="my-autocomplete"
    >
      Common name or FAO code
    </label>
    <div className="govuk-hint">For example, Lobster or LBE</div>
    <AccessibleAutocomplete
      id="species"
      name="species"
      value={faoCode}
      defaultSelectMessage=""
      defaultValue=""
      nojsValues={species}
      onChange={onChange}
    />
    <Details
      summary="I cannot find the commodity code"
      detailsClassName="govuk-details"
      summaryClassName="govuk-details__summary"
      summaryTextClassName="govuk-details__summary-text"
      detailsTextClassName="govuk-details__text"
    >
      <p>Call 0330 159 1989 if the commodity code you need is not shown.</p>
    </Details>
    <div className="govuk-form-group">
      <FormSelect
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName="govuk-select govuk-!-width-two-thirds"
        label="State"
        nullOption="Select..."
        options={states}
        name="state"
        value={stateCode}
      />
    </div>
    <div className="govuk-form-group">
      <FormSelect
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName="govuk-select govuk-!-width-two-thirds"
        label="Presentation"
        nullOption="Select..."
        options={presentations}
        name="presentation"
        value={presentationCode}
      />
    </div>
    <div className="govuk-form-group">
      <FormSelect
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName="govuk-select govuk-!-width-two-thirds"
        label="Commodity Code"
        nullOption="Select..."
        options={commodityCodes}
        name="commodityCode"
      />
    </div>
    <div className="govuk-checkboxes__item govuk-!-margin-bottom-4">
      <FormCheckbox
        type="checkbox"
        inputClassName="govuk-checkboxes__input"
        labelClassName="govuk-label govuk-checkboxes__label"
        id="add-to-favourites"
        name="add-to-favourites"
        value="yes"
        label="Add to product favourites"
      />
    </div>
    <Button
      label="Cancel"
      type={BUTTON_TYPE.RESET}
      className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
      data-module="govuk-button"
    />
    <Button
      label="Add product"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button"
      data-module="govuk-button"
    />
  </>
);
