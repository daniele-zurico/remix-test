import { Link } from "remix";
import { ILanguages } from "../interfaces/language.interface";

type ILanguageToggleProps = {
  languages: ILanguages;
  locale: "en" | "cy";
};

export const LanguageToggle = ({ languages, locale }: ILanguageToggleProps) => (
  <nav className="govuk-language-select" aria-label="Language switcher">
    <ul className="govuk-language-select__list">
      {Object.keys(languages).map((key: string) =>
        locale === key ? (
          <li key={key} className="govuk-language-select__list-item">
            <span aria-current="true">{languages[key].displayName}</span>
          </li>
        ) : (
          <li key={key} className="govuk-language-select__list-item">
            <Link
              to={`?lng=${key}`}
              hrefLang={key}
              lang={key}
              rel="alternate"
              className="govuk-link"
              data-journey-click={`link - click:lang-select:${languages[key].displayName}`}
            >
              <span className="govuk-visually-hidden">
                {languages[key].description}
              </span>
              <span aria-hidden="true">{languages[key].displayName}</span>
            </Link>
          </li>
        )
      )}
    </ul>
  </nav>
);
