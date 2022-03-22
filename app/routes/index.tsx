import { Form, redirect, json, LoaderFunction } from "remix";
import { IAction } from "../interfaces/action.interface";
import { i18n } from "~/i18n.server";
import { useTranslation } from "react-i18next";
import { Button, BUTTON_TYPE, FormRadio } from "@capgeminiuk/dcx-react-library";
import React from "react";

export let loader: LoaderFunction = async ({ request }) => {
  return json({
    i18n: await i18n.getTranslations(request, ["common", "index"]),
  });
};

export const action = async ({ request }: IAction) => {
  const form = await request.formData();
  const journeySelection = form.get("journeySelection")?.toString() || "/";
  return redirect(journeySelection);
};

const Home = () => {
 const { t } = useTranslation("index");

  const [value, setValue] = React.useState(
    "/create-catch-certificate/catch-certificates"
    );
  const handleChange = (event: any) => {
    setValue(event.currentTarget.value);
  };
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
        {t("title")}
      </h1>
      <Form method="post">
        <div className="govuk-form-group govuk-!-margin-bottom-6">
          <div className="govuk-fieldset govuk-!-margin-bottom-6">
            <FormRadio
              id="createCatchCertificate"
              value="/create-catch-certificate/catch-certificates"
              label={t('createCatchCertificateLabel')}
              labelClassName="govuk-label govuk-radios__label"
              inputClassName="govuk-radios__input"
              itemClassName="govuk-radios__item"
              name="journeySelection"
              selected={
                value === "/create-catch-certificate/catch-certificates"
              }
              onChange={handleChange}
            />
            <FormRadio
              id="createProcessingStatement"
              value="/create-processing-statement/processing-statements"
              label={t('createProcessingStatementLabel')}
              labelClassName="govuk-label govuk-radios__label"
              inputClassName="govuk-radios__input"
              itemClassName="govuk-radios__item"
              name="journeySelection"
              selected={value === "/create-processing-statement/processing-statements"}
              onChange={handleChange}
            />
            <FormRadio
              id="createStorageDocument"
              value="/create-storage-document/storage-documents"
              label={t('createStorageDocumentLabel')}
              labelClassName="govuk-label govuk-radios__label"
              inputClassName="govuk-radios__input"
              itemClassName="govuk-radios__item"
              name="journeySelection"
              selected={value === "/create-storage-document/storage-documents"}
              onChange={handleChange}
            />
          </div>
          <Button
            label={t('continueLabel')}
            type={BUTTON_TYPE.SUBMIT}
            className="govuk-button"
            data-module="govuk-button"
          />
        </div>
      </Form>
    </div>
  );
};

export default Home;
