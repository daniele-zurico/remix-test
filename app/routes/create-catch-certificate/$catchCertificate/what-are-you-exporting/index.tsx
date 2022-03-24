import { json, LoaderFunction, useLoaderData } from "remix";
import {
  AccessibleAutocomplete,
  BackButton,
  ProductTable,
  Help,
  Select,
} from "~/components";
import {
  Button,
  BUTTON_TYPE,
  Details,
  FormCheckbox,
} from "@capgeminiuk/dcx-react-library";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { getAddSpeciesLoaderData } from "./whatAreYouExporting";

export const loader: LoaderFunction = async ({ params }: DataFunctionArgs) => {
  return json(await getAddSpeciesLoaderData(params.catchCertificate));
};

const AddSpeciesPage = () => {
  const {
    documentNumber,
    config,
    products,
    species,
    favourites,
    states,
    presentations,
    commodityCodes,
  } = useLoaderData();
  return (
    <>
      <BackButton
        to={`/create-catch-certificate/${documentNumber}/add-your-reference`}
      />
      <div className="govuk-!-padding-top-6">
        <div className="govuk-inset-text govuk-!-margin-top-0">
          <p>Please Note:</p>
          <ul>
            <li>Each product must have at least one landing.</li>
            <li>
              {`A maximum of ${config.maxSpeciesLimit} landings is allowed per certificate`}
              .
            </li>
          </ul>
        </div>
        <h1 className="govuk-heading-xl">What are you exporting?</h1>
        <div className="govuk-tabs" data-module="govuk-tabs">
          <ul className="govuk-tabs__list">
            <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
              <a className="govuk-tabs__tab" href="#add-products">
                Add products
              </a>
            </li>
            <li className="govuk-tabs__list-item">
              <a className="govuk-tabs__tab" href="#add-favourites">
                Add products from favourites
              </a>
            </li>
          </ul>
          <div className="govuk-tabs__panel" id="add-products">
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
              defaultSelectMessage=""
              defaultValue=""
              nojsValues={species}
            />
            <Details
              summary="I cannot find the commodity code"
              detailsClassName="govuk-details"
              summaryClassName="govuk-details__summary"
              summaryTextClassName="govuk-details__summary-text"
              detailsTextClassName="govuk-details__text"
            >
              <p>
                Call 0330 159 1989 if the commodity code you need is not shown.
              </p>
            </Details>
            <Select
              label="State"
              options={[{ label: "Select...", value: "" }, ...states]}
            />
            <Select
              label="Presentation"
              options={[{ label: "Select...", value: "" }, ...presentations]}
            />
            <Select
              label="Commodity Code"
              options={[{ label: "Select...", value: "" }, ...commodityCodes]}
            />
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
              type={BUTTON_TYPE.SUBMIT}
              className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
              data-module="govuk-button"
            />
            <Button
              label="Add product"
              type={BUTTON_TYPE.SUBMIT}
              className="govuk-button"
              data-module="govuk-button"
            />
          </div>
          <div
            className="govuk-tabs__panel govuk-tabs__panel--hidden"
            id="add-favourites"
          >
            <h2 className="govuk-heading-l">Add products from favourites</h2>
            <label
              className="govuk-label govuk-!-font-weight-bold"
              htmlFor="my-autocomplete-2"
            >
              Product
            </label>
            <AccessibleAutocomplete
              id="favourites"
              name="favourites"
              defaultSelectMessage=""
              defaultValue=""
              nojsValues={favourites}
            />
            <Details
              summary="What are product favourites?"
              detailsClassName="govuk-details"
              summaryClassName="govuk-details__summary"
              summaryTextClassName="govuk-details__summary-text"
              detailsTextClassName="govuk-details__text"
            >
              <>
                <p>
                  Product favourites are essential to enable the uploading of
                  products and can also be used to speed up the process of
                  adding products manually.
                </p>
                <p>
                  You can{" "}
                  <a
                    href="/"
                    aria-label="Opens link for information on fish export service"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    manage your product favourites
                    <span className="govuk-visually-hidden">
                      (opens in new tab)
                    </span>
                  </a>{" "}
                  at any time through the favourites link in the main navigation
                  at the top of the page.
                </p>
              </>
            </Details>
            <Button
              label="Add Product"
              type={BUTTON_TYPE.SUBMIT}
              className="govuk-button"
              data-module="govuk-button"
            />
          </div>
        </div>
        <h2 className="govuk-heading-l">Your products</h2>
        <ProductTable products={products} />
        <Button
          label="Save as draft"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
          data-module="govuk-button"
        />
        <Button
          label="Save and continue"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button"
          data-module="govuk-button"
        />
      </div>
      <Help />
    </>
  );
};

export default AddSpeciesPage;
