import Autocomplete from 'accessible-autocomplete/react';
import { t } from 'i18next';


export const AccessibleAutocomplete = (props)=> {

  const suggest = async (query: string, populateResults) => {
    console.log
    const results = await props.search(query);
    populateResults(results);
  };
  
    return(
      <label
      className="govuk-label govuk-!-font-weight-bold"
      htmlFor="my-autocomplete"
      >
        Common name or FAO code
        <div className="govuk-hint">
          For example, Lobster or LBE.
        </div>
        <div className='govuk-!-width-two-thirds'>
          <Autocomplete source={suggest} {...props} tNoResults={ () => t('commonNoResultsFound')}/>
        </div>
      </label>
    );
  
}

