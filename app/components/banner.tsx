import { useTranslation } from "react-i18next";
import { Link } from "remix";

export const Banner = () => {
  const { t } = useTranslation("banner");

  return (
    <div className="govuk-width-container app-width-container">
      <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            {t("tag")}
          </strong>
          <span className="govuk-phase-banner__text">
            {`${t("text_1")} `}
            <Link className="govuk-link" to="/">
              {t("link")}
            </Link>{" "}
            {t("text_2")}
          </span>
        </p>
      </div>
    </div>
  );
};
