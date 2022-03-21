import { Form, redirect } from "remix";
import { IAction } from "../../interfaces/action.interface";
import { Button, BUTTON_TYPE, FormRadio } from "@capgeminiuk/dcx-react-library";
import React from "react";

export const action = async ({ request }: IAction) => {
  const form = await request.formData();
  const journeySelection = form.get("journeySelection")?.toString() || "/";
  return redirect(journeySelection);
};

const Home = () => {
  const [value, setValue] = React.useState(
    "/create-catch-certificate/catch-certificates"
  );
  const handleChange = (event: any) => {
    setValue(event.currentTarget.value);
  };
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
        What do you want to do?
      </h1>
      <Form method="post">
        <div className="govuk-form-group govuk-!-margin-bottom-6">
          <div className="govuk-fieldset govuk-!-margin-bottom-6">
            <FormRadio
              id="createCatchCertificate"
              value="/create-catch-certificate/catch-certificates"
              label="Create a UK catch certificate (Including links to direct landing documents)"
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
              value="/processing-statements"
              label="Create a UK processing statement"
              labelClassName="govuk-label govuk-radios__label"
              inputClassName="govuk-radios__input"
              itemClassName="govuk-radios__item"
              name="journeySelection"
              selected={value === "/processing-statements"}
              onChange={handleChange}
            />
            <FormRadio
              id="createStorageDocument"
              value="/storage-documents"
              label="Create a UK storage document"
              labelClassName="govuk-label govuk-radios__label"
              inputClassName="govuk-radios__input"
              itemClassName="govuk-radios__item"
              name="journeySelection"
              selected={value === "/storage-documents"}
              onChange={handleChange}
            />
          </div>
          <Button
            label="Continue"
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
