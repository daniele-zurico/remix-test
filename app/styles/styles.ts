import styles from "./all.css";
import languageStyles from "./language.css";
import autocompleteStyles from "./autocomplete.css";
import jsDisable from "./js-disabled.css";

export const getStyles = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: languageStyles },
  { rel: "stylesheet", href: autocompleteStyles },
  { rel: "stylesheet", href: jsDisable },
];
