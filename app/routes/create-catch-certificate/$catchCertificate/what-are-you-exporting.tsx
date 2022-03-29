import { isEmpty } from "lodash";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { json, redirect, useActionData, useLoaderData, ActionFunction, LoaderFunction, Form } from "remix";
import { BackButton, ErrorSummary, Help } from "~/components";
import { getTransformedError } from "~/helpers";
import { IError } from "~/types";
import { getAddSpeciesLoaderData, addSpecies } from "./what-are-you-exporting/whatAreYouExporting";
import { ProductsTab, FavouritesTab, ProductTable } from "./what-are-you-exporting/components";
import { ChangeEvent } from "react";

export const loader: LoaderFunction = async ({ params, request }: DataFunctionArgs) => {
  const url = new URL(request.url);
  const species = url.searchParams.get("species") || '';
  const state = url.searchParams.get("state") || '';
  const presenttion = url.searchParams.get("presentation") || '';
  const { catchCertificate = '' } = params;
  return json(await getAddSpeciesLoaderData(catchCertificate, species, state, presenttion));
};

export const action: ActionFunction = async ({ request, params }): Promise<Response> => {
  const { catchCertificate } = params;
  const form = await request.formData();
  const species: string = form.get("species") as string || '';
  const state: string = form.get("state") as string || '';
  const presentation: string = form.get("presentation") as string || '';
  const commodityCode: string = form.get("commodityCode") as string || '';

  const resquestBody: any = {
    "addToFavourites": false,
    "btn_submit":"",
    "presentation": presentation,
    "presentationLabel":"",
    "redirect": `/create-catch-certificate/${catchCertificate}/what-are-you-exporting`,
    "species":"",
    "speciesCode": species,
    "state": state,
    "stateLabel":"",
    "scientificName":"",
    "commodity_code": commodityCode,
    "commodity_code_description":""
  }
  
  const response = await addSpecies(catchCertificate, resquestBody);
  const errors: IError[] = response.errors || [];

  if (errors.length > 0) {
    return json(
      {
        errors: getTransformedError(errors)
      },
      { status: 400 }
    );
  }

  return redirect("/");
}

const AddSpeciesPage = () => {
  const { errors = {} } = useActionData() || {};
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

  const onChangeHandler = (event: ChangeEvent) => {
    // TO DO
    console.log(event.currentTarget.id, 'is Changing');
  }

  return (
    <>
      <BackButton to={`/create-catch-certificate/${documentNumber}/add-your-reference`} />
      <div className="govuk-!-padding-top-6">
        {!isEmpty(errors) && (
          <ErrorSummary
            errors={Object.keys(errors).flatMap((key: string) => errors[key])}
          />
        )}
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
        <Form
          method="post"
          action={`/create-catch-certificate/${documentNumber}/what-are-you-exporting`}
        >
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
            <ProductsTab
              species={species}
              states={stateLookup.states}
              presentations={stateLookup.presentations}
              commodityCodes={commodityCodes}
              faoCode={faoCode}
              stateCode={stateCode}
              presentationCode={presentationCode}
              errors={errors}
              onChange={onChangeHandler}
            />
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
        </Form>
      </div>
      <Help />
    </>
  );
};

export default AddSpeciesPage;
