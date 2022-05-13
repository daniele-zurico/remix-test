import { isEmpty } from "lodash";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { json, redirect, useActionData, useLoaderData, Form } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { BackButton, ClientOnly } from "~/components";
import { IError } from "~/types";
import { getAddSpeciesLoaderData, addSpecies, validateValues, getCommodityCodeDescription } from "~/models";
import { apiCallFailed } from "~/helpers";
import {
  FavouritesTab,
  ProductsTab,
  ProductsTabClient,
  ProductTable,
  ErrorSummary,
  Help,
} from "~/composite-components";

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

export const action: ActionFunction = async ({ request, params }): Promise<Response> => {
  const form = await request.formData();
  const { catchCertificate } = params;
  const { _action, faoName, ...values } = Object.fromEntries(form);
  const _redirect = `/create-catch-certificate/${catchCertificate}/what-are-you-exporting`;

  switch(_action) {
    case 'cancel':
      return redirect(`${_redirect}#add-products`);
    case 'addSpecies': {
      const errors: IError[] = validateValues(['species'], values);
      if (errors.length > 0) {
        return apiCallFailed(errors, values);
      }
  
      return redirect(`${_redirect}?species=${values.species}#add-state`);
    }
    case 'addState': {
      const errors: IError[] = validateValues(['species', 'state'], values);
      if (errors.length > 0) {
        return apiCallFailed(errors, values);
      }
  
      return redirect(`${_redirect}?species=${values.species}&state=${values.state}#add-presentation`);
    }
    case 'addPresentation': {
      const errors: IError[] = validateValues(['species', 'state', 'presentation'], values);
      if (errors.length > 0) {
        return apiCallFailed(errors, values);
      }
  
      return redirect(`${_redirect}?species=${values.species}&state=${values.state}&presentation=${values.presentation}#add-commodity-code`);
    }
  }

  const requestBody: any = {
    addToFavourites: false, // TODO - adding product to favourites
    commodity_code_description: await getCommodityCodeDescription(values.species as string, values.state as string, values.presentation as string, values.commodity_code as string),
    redirect: _redirect,
    speciesCode: values.species,
    ...values,
    species: faoName ? `${faoName} (${values.species})` : undefined
  };
  const response = await addSpecies(catchCertificate, requestBody);
  const errors: IError[] = response.errors || [];

  if (errors.length > 0) {
    return apiCallFailed(errors, values);
  }

  return redirect(`/create-catch-certificate/${catchCertificate}/what-are-you-exporting`);
};

const AddSpecies = () => {
  const { errors = {}, species: apiFaoCode} = useActionData() || {};
  const {
    documentNumber,
    config,
    products,
    species,
    favourites,
    stateLookup,
    commodityCodes,
    faoName,
    faoCode,
    scientificName,
    stateCode,
    stateLabel,
    presentationLabel,
    presentationCode
  } = useLoaderData();

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
          <ClientOnly fallback={ <ProductsTab
              species={species}
              states={stateLookup.states}
              presentations={stateLookup.presentations}
              commodityCodes={commodityCodes}
              faoCode={apiFaoCode || faoCode}
              stateCode={stateCode}
              presentationCode={presentationCode}
              errors={errors}
            />} >
     {() => <ProductsTabClient
              species={species}
              states={stateLookup.states}
              presentations={stateLookup.presentations}
              commodityCodes={commodityCodes}
              faoCode={apiFaoCode || faoCode}
              stateCode={stateCode}
              presentationCode={presentationCode}
              errors={errors}
            />  }
    </ClientOnly>
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
          className="govuk-button govuk-!-margin-right-4 govuk-button--secondary"
          data-module="govuk-button"
        />
        <Button
          label="Save and continue"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button"
          data-module="govuk-button"
        />
        <input type="hidden" id="faoName" name="faoName" value={faoName} />
        <input type="hidden" id="scientificName" name="scientificName" value={scientificName} />
        <input type="hidden" id="stateLabel" name="stateLabel" value={stateLabel} />
        <input type="hidden" id="presentationLabel" name="presentationLabel" value={presentationLabel} />
        </Form>
      </div>
      <Help />
    </>
  );
};

export default AddSpecies;