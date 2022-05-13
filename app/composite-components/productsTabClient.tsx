import {
  Button,
  BUTTON_TYPE, Details, FormCheckbox, FormSelect
} from "@capgeminiuk/dcx-react-library";
import { isEmpty } from "lodash";
import { useEffect, useState } from 'react';
import { AccessibleAutocomplete, ClientOnly } from '~/components';
import { IErrorTransformed, ILabelAndValue, ISpecies } from "~/types";

type ProductTabsProps = {
  species: ISpecies[];
  states: ILabelAndValue[];
  presentations: ILabelAndValue[];
  commodityCodes: ILabelAndValue[];
  faoCode?: string;
  stateCode?: string;
  presentationCode?: string;
  commodityCode?: string;
  errors?: IErrorTransformed;
};

export const ProductsTabClient = ({
  species,
  states,
  faoCode,
  stateCode,
  presentationCode,
  presentations,
  commodityCodes,
  commodityCode,
  errors
}: ProductTabsProps) => {
  const [selectedSpeciesCode, setSelectedSpeciesCode] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [selectedPresentationCode, setSelectedPresentationCode] = useState('');
  const [speciesStateLookup, setSpeciesStateLookup] = useState([]);
  const [speciesPresentationLookup, setSpeciesPresentationLookup] = useState([]);
  const [speciesCommodityLookup, setSpeciesCommodityLookup] = useState([]);
  const speciesName = (s)=> {
    return `${s.faoName} (${s.faoCode})`;
  }
   useEffect(()=> {
    if(selectedSpeciesCode) {
      setSelectedStateCode('');
     const fetchData = async ()=> {
      const res = await (await fetch(`http://localhost:3001/reference/api/v1/speciesStateLookup?faoCode=${selectedSpeciesCode}`)).json();
      setSpeciesStateLookup(res);
     }
     fetchData();
    }
   }, [selectedSpeciesCode]);

   useEffect(()=> {
    if(selectedStateCode) {
      const obj = speciesStateLookup.find(i=> {
        
        return i.state.code === selectedStateCode
      });
      if (obj) {
      setSpeciesPresentationLookup(obj.presentations);
      }
     }
   }, [selectedStateCode]);


   useEffect(()=> {
    if(selectedPresentationCode) {
     const fetchData = async ()=> {
      const res = await (await fetch(`http://localhost:3001/reference/api/v1/commodities/search?speciesCode=${selectedSpeciesCode}&state=${selectedStateCode}&presentation=${selectedPresentationCode}`)).json();
      setSpeciesCommodityLookup(res);
     }
     fetchData();
    }
   }, [selectedPresentationCode]);

  const quickSearch = (query, populateResults) => {
    const queryStr = query.toLowerCase();
    let data = species.filter( d => d.faoName)
      .filter( d => speciesName(d).toLowerCase().indexOf(queryStr) !== -1)
      .map( d => {
        const commonRank = d.commonRank || 0;
        let rank;
        if( d.faoCode.toLowerCase().indexOf( queryStr ) !== -1 ) rank = 1;
        else if( d.faoName.toLowerCase().indexOf( queryStr ) !== -1 ) rank = 10 + commonRank;
        else if( d.scientificName.toLowerCase().indexOf( queryStr ) !== -1 ) rank = 20 + commonRank;
        else if( (d.commonNames || []).join('').toLowerCase().indexOf( queryStr ) !== -1 ) rank = 20 + commonRank;
        d.rank = rank || 100;
        return d;
      });
  
    data.sort((a,b) => {
  
      if (a.rank < b.rank) {
        return -1;
      }
  
      if (a.rank > b.rank) {
        return 1;
      }
  
      if (a.faoCode < b.faoCode) {
        return -1;
      }
  
      if (a.faoCode > b.faoCode) {
        return 1;
      }
  
      return 0;
    });
    populateResults(data.map( (d) => speciesName(d)))
    return data.map( (d) => speciesName(d));
  };
  
  return <div id='add-products'>
    <h2 className="govuk-heading-l">Add products</h2>
    <p>Selected Species Code: {selectedSpeciesCode}</p>
    <p>Selected State Code: {selectedStateCode}</p>
    <p>Selected Presentation Code: {selectedPresentationCode}</p>
    {/* <pre>{JSON.stringify(speciesStateLookup, null, 2)}</pre> */}
    
    <AccessibleAutocomplete source={quickSearch} displayMenu='overlay' onConfirm={(val: string)=> {
      if (val===selectedSpeciesCode) {
        return;
      }
      const fish = species.find( f => speciesName(f) === val);
      if(fish) {
        setSelectedSpeciesCode(fish.faoCode)
      }
     }} />     
    
    

    <Details
      summary="I cannot find the species"
      detailsClassName="govuk-details"
      summaryClassName="govuk-details__summary"
      summaryTextClassName="govuk-details__summary-text"
      detailsTextClassName="govuk-details__text"
    >
      <>
        <p>For best results, search for the common English name or the FAO code (if known) as species nicknames are not supported.</p>
        <p>Some species are exempt</p>
          <a className="govuk-link" rel="noopener noreferrer" href='https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:057:0010:0018:EN:PDF' target="_blank" aria-label="Link opens in a new window">
            Species exempt from Catch Certificate (europa.eu) <span className="govuk-visually-hidden">(opens in new tab)</span>
          </a>
          <p>If you cannot find the species and it is not exempt, call 0330 159 1989.</p>
      </>
    </Details>
    <Button
      label="Add species"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button govuk-!-margin-right-4 govuk-button--primary hide"
      data-module="govuk-button"
      name="_action"
      value="addSpecies"
    />
    <div id="add-state" className={`govuk-form-group${!isEmpty(errors?.state) ? ' govuk-form-group--error' : ''}`}>
      <FormSelect
        id="state"
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName={`govuk-select${!isEmpty(errors?.state) ? ' govuk-select--error' : ''} govuk-!-width-two-thirds`}
        error={{
          text: errors?.state?.message || '',
          className: 'govuk-error-message',
          visuallyHiddenText: {
            text: 'Error:',
            className: 'govuk-visually-hidden'
          }
        }}
        label="State"
        nullOption="Select..."
        options={speciesStateLookup.map((i:any)=>({
          label: i.state.description,
          value: i.state.code
        }))}
        name="state"
        value={selectedStateCode}
        onChange={(v)=> {setSelectedStateCode(v.target.value)}}
      />
    </div>
    <Button
      label="Add state"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button govuk-button--primary hide"
      data-module="govuk-button"
      name="_action"
      value="addState"
    />
    <div id="add-presentation" className={`govuk-form-group${!isEmpty(errors?.presentation) ? ' govuk-form-group--error' : ''}`}>
      <FormSelect
        id="presentation"
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName={`govuk-select${!isEmpty(errors?.presentation) ? ' govuk-select--error' : ''} govuk-!-width-two-thirds`}
        error={{
          text: errors?.presentation?.message || '',
          className: 'govuk-error-message',
          visuallyHiddenText: {
            text: 'Error:',
            className: 'govuk-visually-hidden'
          }
        }}
        label="Presentation"
        nullOption="Select..."
        options={speciesPresentationLookup.map(i=>({
          label: i.description,
          value: i.code
        }))}
        name="presentation"
        value={presentationCode}
        onChange={(v)=> {setSelectedPresentationCode(v.target.value)}}
      />
    </div>
    <Button
      label="Add presentation"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button govuk-button--primary hide"
      data-module="govuk-button"
      name="_action"
      value="addPresentation"
    />
    <div id="add-commodity-code" className={`govuk-form-group${!isEmpty(errors?.commodity_code) ? ' govuk-form-group--error' : ''}`}>
      <FormSelect
        id="commodity_code"
        labelClassName="govuk-label govuk-!-font-weight-bold"
        selectClassName={`govuk-select${!isEmpty(errors?.commodity_code) ? ' govuk-select--error' : ''} govuk-!-width-two-thirds`}
        error={{
          text: errors?.commodity_code?.message || '',
          className: 'govuk-error-message',
          visuallyHiddenText: {
            text: 'Error:',
            className: 'govuk-visually-hidden'
          }
        }}
        label="Commodity Code"
        nullOption="Select..."
        options={speciesCommodityLookup.map(i=>({
          label: `${i.description} - ${i.description}`,
          value: i.code
        }))}
        value={commodityCode}
        name="commodity_code"
      />
    </div>
    
    <div className="govuk-checkboxes__item govuk-!-margin-bottom-4">
      <FormCheckbox
        type="checkbox"
        inputClassName="govuk-checkboxes__input"
        labelClassName="govuk-label govuk-checkboxes__label"
        id="addToFavourites"
        name="addToFavourites"
        value="yes"
        label="Add to product favourites"
      />
    </div>
    <Button
      label="Cancel"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary hide"
      data-module="govuk-button"
      name="_action"
      value="cancel"
    />
    <Button
      label="Add product"
      type={BUTTON_TYPE.SUBMIT}
      className="govuk-button"
      data-module="govuk-button"
      name="_action"
      value="addProduct"
    />
  </div>
};
