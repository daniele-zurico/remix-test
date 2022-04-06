import { isEmpty } from "lodash";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { json, redirect, useActionData, useLoaderData, Form } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { BackButton, ErrorSummary, Help } from "~/components";
import { IError } from "~/types";
import { getAddSpeciesLoaderData, addSpecies } from "~/models";
import {
  FavouritesTab,
  ProductsTab,
  ProductTable,
} from "~/composite-components";
import { getTransformedError } from "~/helpers";

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const species = url.searchParams.get("species") || "";
  const state = url.searchParams.get("state") || "";
  const presenttion = url.searchParams.get("presentation") || "";
  const { catchCertificate = "" } = params;
  return json(
    await getAddSpeciesLoaderData(catchCertificate, species, state, presenttion)
  );
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const { catchCertificate } = params;
  const _redirect = `/create-catch-certificate/${catchCertificate}/what-are-you-exporting`;
  const form = await request.formData();

  const { _action, ...values } = Object.fromEntries(form);

  if (_action === "cancel") {
    return redirect(`${_redirect}#add-products`);
  }

  const resquestBody: any = {
    addToFavourites: false,
    btn_submit: "",
    presentationLabel: "",
    redirect: _redirect,
    species: "",
    stateLabel: "",
    scientificName: "",
    commodity_code_description: "",
    ...values,
  };

  const response = await addSpecies(catchCertificate, resquestBody);
  const errors: IError[] = response.errors || [];

  if (errors.length > 0) {
    return json({
      errors: getTransformedError(errors),
      ...errors,
    });
  }
  if (errors.length > 0) {
    redirect(
      `/create-catch-certificate/${catchCertificate}//what-are-you-exporting`
    );
  }

  // go to the next page but using "/" for now
  return redirect("/");
};

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
    presentationCode,
  } = useLoaderData();

  const onChangeHandler = (event: any) => {
    console.log("morti toi");
  };

  return (
    <>
      <BackButton
        to={`/create-catch-certificate/${documentNumber}/add-your-reference`}
      />
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
        <Form method="post">
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
