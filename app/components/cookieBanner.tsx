import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { Link } from "remix";
import { useTranslation } from "react-i18next";

export const CookieBanner = () => {
  const { t } = useTranslation("cookieBanner");
  return (
    <div
      className="govuk-cookie-banner "
      data-nosnippet
      role="region"
      aria-label="Cookies on Fish Exports Service"
    >
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-cookie-banner__heading govuk-heading-m">
              {t("title")}
            </h2>

            <div className="govuk-cookie-banner__content">
              <p className="govuk-body">{t("text_1")}</p>
              <p className="govuk-body">{t("text_2")}</p>
            </div>
          </div>
        </div>

        <div className="govuk-button-group">
          <Button
            type={BUTTON_TYPE.BUTTON}
            className="govuk-button"
            data-module="govuk-button"
            label={t("acceptButtonLabel")}
            id="accept-cookies"
          />
          <Button
            type={BUTTON_TYPE.BUTTON}
            className="govuk-button"
            data-module="govuk-button"
            label={t("rejectButtonLabel")}
            id="reject-cookies"
          />
          <Link className="govuk-link" to="/cookies">
            {t("link")}
          </Link>
        </div>
      </div>
    </div>
  );
};
