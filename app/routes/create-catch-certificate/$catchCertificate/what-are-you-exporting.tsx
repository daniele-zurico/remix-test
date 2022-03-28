import { json, LoaderFunction, useLoaderData, useFetcher } from "remix";
import { BackButton, Help } from "~/components";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { getAddSpeciesLoaderData } from "./what-are-you-exporting/whatAreYouExporting";
import { ProductsTab, FavouritesTab, ProductTable } from "./what-are-you-exporting/components";

export const loader: LoaderFunction = async ({ params, request }: DataFunctionArgs) => {
  const url = new URL(request.url);
  const species = url.searchParams.get("species") || '';
  const state = url.searchParams.get("state") || '';
  const presenttion = url.searchParams.get("presentation") || '';
  const { catchCertificate = '' } = params;
  return json(await getAddSpeciesLoaderData(catchCertificate, species, state, presenttion));
};

const AddSpeciesPage = () => {
  const {
    documentNumber,
    config,
    products,
    species,
    favourites,
    stateLookup,
    commodityCodes,
    faoCode,
    stateCode,
    presentationCode
  } = useLoaderData();

  console.log('STATES' ,JSON.stringify(stateLookup.states));

  const data = useFetcher();
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
            <data.Form method="get" action={`/create-catch-certificate/${documentNumber}/what-are-you-exporting`}>
              <ProductsTab
                species={species}
                states={stateLookup.states}
                presentations={stateLookup.presentations}
                commodityCodes={commodityCodes}
                onChange={(event: any) => {
                  console.log('CALLING ON CHANGE');
                  data.submit(event.target.form);
                }}
                faoCode={faoCode}
                stateCode={stateCode}
                presentationCode={presentationCode}
              />
            </data.Form>
          </div>
          <div
            className="govuk-tabs__panel govuk-tabs__panel--hidden"
            id="add-favourites"
          >
            <FavouritesTab favourites={favourites} />
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
