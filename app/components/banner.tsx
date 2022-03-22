import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export const Banner = (): ReactElement => {
  const { t } = useTranslation("banner");

  return (
    <div className="govuk-width-container app-width-container">
      <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            {t('tag')}
          </strong>
          <span className="govuk-phase-banner__text">
            {`${t('text_1')} `}
            <a className="govuk-link" href="/">
              {t('link')} 
            </a>{" "}
            {t('text_2')} 
          </span>
        </p>
      </div>
    </div>
  )
};
