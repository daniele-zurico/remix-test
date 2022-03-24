import { Details, Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { AccessibleAutocomplete } from "~/components";

export const FavouritesTab = ({ favourites }: any) => (
  <>
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
          Product favourites are essential to enable the uploading of products
          and can also be used to speed up the process of adding products
          manually.
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
            <span className="govuk-visually-hidden">(opens in new tab)</span>
          </a>{" "}
          at any time through the favourites link in the main navigation at the
          top of the page.
        </p>
      </>
    </Details>
    <Button
      label="Add Product"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button"
      data-module="govuk-button"
    />
  </>
);
