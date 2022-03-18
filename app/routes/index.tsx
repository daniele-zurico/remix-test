import { ReactElement } from "react";
import { Form, redirect } from "remix";
import { PrimaryButton } from "../components/primaryButton";

interface ActionProps {
  request: Request,
  context: any,
  params: any
}

export const action = async ({ request }: ActionProps) => {
  const form = await request.formData();
  const journeySelection = form.get('journeySelection')?.toString() || '/';
  return redirect(journeySelection)
}

const Home: React.FC = (): ReactElement => {
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">What do you want to do?</h1>
      <Form method="post">
        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset govuk-!-margin-bottom-6">
            <div className="govuk-radios" data-module="govuk-radios">
              <div className="govuk-radios__item">
                <input className="govuk-radios__input" id="createCatchCertificate" name="journeySelection" value="/catch-certificates" defaultChecked type="radio"/>
                <label className="govuk-label govuk-radios__label" htmlFor="createCatchCertificate">
                  Create a UK catch certificate (Including links to direct landing documents)
                </label>
              </div>
              <div className="govuk-radios__item">
                <input className="govuk-radios__input" id="createProcessingStatement" name="journeySelection" value="/processing-statements" type="radio"/>
                <label className="govuk-label govuk-radios__label" htmlFor="createProcessingStatement">
                  Create a UK processing statement
                </label>
              </div>
              <div className="govuk-radios__item">
                <input className="govuk-radios__input" id="createStorageDocument" name="journeySelection" value="/storage-documents" type="radio"/>
                <label className="govuk-label govuk-radios__label" htmlFor="createStorageDocument">
                  Create a UK storage document
                </label>
              </div>
            </div>
          </fieldset>
          <PrimaryButton>Continue</PrimaryButton>
        </div>
      </Form>
    </div>
  )
}

export default Home;