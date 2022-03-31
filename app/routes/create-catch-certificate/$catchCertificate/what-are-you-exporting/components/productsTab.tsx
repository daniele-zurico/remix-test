import { isEmpty } from "lodash";
import {
  Details,
  FormSelect,
  FormCheckbox,
  Button,
  BUTTON_TYPE,
} from "@capgeminiuk/dcx-react-library";
import { AccessibleAutocomplete } from "~/components";
import { IErrorTransformed, ILabelAndValue, ISpecies } from "~/types";

type ProductTabsProps = {
  species: ISpecies[];
  states: ILabelAndValue[];
  presentations: ILabelAndValue[];
  commodityCodes: ILabelAndValue[];
  onChange?: (event: any) => void;
  faoCode?: string;
  stateCode?: string;
  presentationCode?: string;
  commodityCode?: string;
  errors?: IErrorTransformed;
};

export const ProductsTab = ({
  species,
  states,
  faoCode,
  stateCode,
  presentationCode,
  presentations,
  commodityCodes,
  commodityCode,
  errors,
  onChange
}: ProductTabsProps) => (
  <>
    <h2 className="govuk-heading-l">Add products</h2>
    <AccessibleAutocomplete
      id="species"
      name="species"
      value={faoCode}
      defaultSelectMessage=""
      defaultValue=""
      nojsValues={species}
      onChange={onChange}
      error={errors?.species?.message}
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
    <div className={`govuk-form-group${!isEmpty(errors?.state) ? ' govuk-form-group--error' : ''}`}>
      <FormSelect
        id="state"
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName={`govuk-select${!isEmpty(errors?.state) ? ' govuk-select--error' : ''} govuk-!-width-two-thirds`}
        error={{
          text: errors?.state?.message || '',
          className: 'govuk-error-message',
          visuallyHiddenText: {
            text: 'Error:',
            className: 'govuk-visually-hidden'
          }
        }}
        label="State"
        nullOption="Select..."
        options={states}
        name="state"
        value={stateCode}
        onChange={onChange}
      />
    </div>
    <div className={`govuk-form-group${!isEmpty(errors?.presentation) ? ' govuk-form-group--error' : ''}`}>
      <FormSelect
        id="presentation"
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName={`govuk-select${!isEmpty(errors?.presentation) ? ' govuk-select--error' : ''} govuk-!-width-two-thirds`}
        error={{
          text: errors?.presentation?.message || '',
          className: 'govuk-error-message',
          visuallyHiddenText: {
            text: 'Error:',
            className: 'govuk-visually-hidden'
          }
        }}
        label="Presentation"
        nullOption="Select..."
        options={presentations}
        name="presentation"
        value={presentationCode}
        onChange={onChange}
      />
    </div>
    <div className={`govuk-form-group${!isEmpty(errors?.commodity_code) ? ' govuk-form-group--error' : ''}`}>
      <FormSelect
        id="commodity_code"
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName={`govuk-select${!isEmpty(errors?.commodity_code) ? ' govuk-select--error' : ''} govuk-!-width-two-thirds`}
        error={{
          text: errors?.commodity_code?.message || '',
          className: 'govuk-error-message',
          visuallyHiddenText: {
            text: 'Error:',
            className: 'govuk-visually-hidden'
          }
        }}
        label="Commodity Code"
        nullOption="Select..."
        options={commodityCodes}
        value={commodityCode}
        name="commodityCode"
        onChange={onChange}
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
