import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import _ from 'lodash';

const minQueryLength = 3;

const AutoComplete = ({
  getFunction,
  returnFunction,
  inputValue,
  setInputValue,
  isEdit,
}) => {
  // const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [showSuggestionsFlag, setShowSuggeestionsFlag] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isRendered = useRef(false);

  const downHandler = ({ key }) => {
    if (key === 'ArrowDown') {
      setSelectedIndex((i) => i + 1);
    }
  };
  const upHandler = ({ key }) => {
    if (key === 'ArrowUp') {
      setSelectedIndex((i) => i - 1);
    }
  };

  const enterHandler = ({ key }) => {
    if (key === 'Enter') {
      setIsItemSelected(true);
    }
  };

  useEffect(() => {
    const item = suggestions[selectedIndex];

    if (item) {
      setInputValue(`${item.name}`);
      setShowSuggeestionsFlag(false);
      returnFunction({ ...item, inputValue });
    }
  }, [isItemSelected]);

  useEffect(() => {
    if (isRendered.current) {
      if (showSuggestionsFlag) {
        setIsItemSelected(false);
        if (inputValue.length < minQueryLength) {
          setSuggestions([]);
        }

        if (inputValue.length >= minQueryLength) {
          debounceOnChange(inputValue);
        }
      } else {
        setShowSuggeestionsFlag(true);
      }
    }
  }, [inputValue]);

  useEffect(() => {
    isRendered.current = true;
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    window.addEventListener('keypress', enterHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener('keypress', enterHandler);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex >= suggestions.length) {
      setSelectedIndex(0);
    }
    if (selectedIndex < 0) {
      setSelectedIndex(suggestions.length - 1);
    }
  }, [selectedIndex, suggestions.length]);

  const onInputChange = async (value) => {
    if (value.length >= minQueryLength) {
      const response = await getFunction(value);

      if (!response.error) {
        setSuggestions(response.data.map(x => x._source));
      }
    }
  };

  const debounceOnChange = useCallback(_.debounce(onInputChange, 300), []);

  return (
    <AutoCompleteWrapper>
      <AutoCompleteInput
        autoFocus={!isEdit}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Например YEEZY BOOST"
      />

      {suggestions.length > 0 &&
        inputValue.length >= minQueryLength &&
        !isItemSelected &&
        showSuggestionsFlag && (
          <AutoCompleteSuggestions>
            {suggestions.map((item, index) => (
              <SingleSuggestionWrapper
                style={{ display: 'flex' }}
                isSelected={index === selectedIndex}
                key={index}
                onClick={() => setIsItemSelected(true)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <SingleSuggestionImage src={item.image_url} />
                <SingleSuggestionName>{`${item.name} (${item.style_id})`}</SingleSuggestionName>
              </SingleSuggestionWrapper>
            ))}
          </AutoCompleteSuggestions>
        )}
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;

const SingleSuggestionWrapper = styled.div`
  box-sizing: border-box;
  padding: 5px;

  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5px 0px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#7f7f7f' : 'inherit')};
`;

const SingleSuggestionImage = styled.img`
  height: auto;
  width: 130px;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 10px;
`;

const SingleSuggestionName = styled.span`
  margin-left: 5px;
  font-size: 16px;
  width: 100%;
`;

const AutoCompleteWrapper = styled.div`
  width: 400px;
  height: 90px;
  position: relative;
`;

const AutoCompleteInput = styled.input`
  outline: none;
  background-color: inherit;
  font-family: ${({ theme }) => theme.font};
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textColor};
  height: 30px;
  line-height: 50px;
  width: 450px;
  border: none;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.secondaryColor}`};
  margin-top: 20px;
`;

const AutoCompleteSuggestions = styled.div`
  position: absolute;
  top: 55px;
  left: 0px;
  width: 400px;
  background-color: #afafaf;
  z-index: 1;
`;
