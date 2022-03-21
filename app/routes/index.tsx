import { Form, redirect } from "remix";
import { IAction } from "../../interfaces/action.interface";
import { Button, BUTTON_TYPE, FormRadio } from "@capgeminiuk/dcx-react-library";

export const action = async ({ request }: IAction) => {
  const form = await request.formData();
  const journeySelection = form.get("journeySelection")?.toString() || "/";
  return redirect(journeySelection);
};

const Home = () => (
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
            selected={true}
            labelClassName="govuk-label govuk-radios__label"
            inputClassName="govuk-radios__input"
            itemClassName="govuk-radios__item"
            name="journeySelection"
          />
          <FormRadio
            id="createProcessingStatement"
            value="/processing-statements"
            label="Create a UK processing statement"
            labelClassName="govuk-label govuk-radios__label"
            inputClassName="govuk-radios__input"
            itemClassName="govuk-radios__item"
            name="journeySelection"
          />
          <FormRadio
            id="createStorageDocument"
            value="/storage-documents"
            label="Create a UK storage document"
            labelClassName="govuk-label govuk-radios__label"
            inputClassName="govuk-radios__input"
            itemClassName="govuk-radios__item"
            name="journeySelection"
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

export default Home;
