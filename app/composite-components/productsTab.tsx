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
  errors
}: ProductTabsProps) => (
  <div id='add-products'>
    <h2 className="govuk-heading-l">Add products</h2>
    <AccessibleAutocomplete
      id="species"
      name="species"
      value={faoCode}
      defaultSelectMessage=""
      defaultValue=""
      nojsValues={species}
      error={errors?.species?.message}
    />
    <Details
      summary="I cannot find the species"
      detailsClassName="govuk-details"
      summaryClassName="govuk-details__summary"
      summaryTextClassName="govuk-details__summary-text"
      detailsTextClassName="govuk-details__text"
    >
      <>
        <p>For best results, search for the common English name or the FAO code (if known) as species nicknames are not supported.</p>
        <p>Some species are exempt{" "}
          <a className="govuk-link" rel="noopener noreferrer" href='https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:057:0010:0018:EN:PDF' target="_blank" aria-label="Link opens in a new window">
            Species exempt from Catch Certificate (europa.eu) <span className="govuk-visually-hidden">(opens in new tab)</span>
          </a>
          <p>If you cannot find the species and it is not exempt, call 0330 159 1989.</p>
        </p>
      </>
    </Details>
    <Button
      label="Add species"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button govuk-!-margin-right-4 govuk-button--primary"
      data-module="govuk-button"
      name="_action"
      value="addSpecies"
    />
    <div id="add-state" className={`govuk-form-group${!isEmpty(errors?.state) ? ' govuk-form-group--error' : ''}`}>
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
      />
    </div>
    <Button
      label="Add state"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button govuk-button--primary"
      data-module="govuk-button"
      name="_action"
      value="addState"
    />
    <div id="add-presentation" className={`govuk-form-group${!isEmpty(errors?.presentation) ? ' govuk-form-group--error' : ''}`}>
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
      />
    </div>
    <Button
      label="Add presentation"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button govuk-button--primary"
      data-module="govuk-button"
      name="_action"
      value="addPresentation"
    />
    <div id="add-commodity-code" className={`govuk-form-group${!isEmpty(errors?.commodity_code) ? ' govuk-form-group--error' : ''}`}>
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
        name="commodity_code"
      />
    </div>
    <Details
      summary="I cannot find the commodity code"
      detailsClassName="govuk-details"
      summaryClassName="govuk-details__summary"
      summaryTextClassName="govuk-details__summary-text"
      detailsTextClassName="govuk-details__text"
    >
      <p>Call 0330 159 1989 if the commodity code you need is not shown.</p>
    </Details>
    <div className="govuk-checkboxes__item govuk-!-margin-bottom-4">
      <FormCheckbox
        type="checkbox"
        inputClassName="govuk-checkboxes__input"
        labelClassName="govuk-label govuk-checkboxes__label"
        id="addToFavourites"
        name="addToFavourites"
        value="yes"
        label="Add to product favourites"
      />
    </div>
    <Button
      label="Cancel"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
      data-module="govuk-button"
      name="_action"
      value="cancel"
    />
    <Button
      label="Add product"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button"
      data-module="govuk-button"
      name="_action"
      value="addProduct"
    />
  </div>
);
