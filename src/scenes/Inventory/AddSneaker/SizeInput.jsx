import React from 'react'
import styled from 'styled-components';
import { useOutsideAlerter } from 'utils/useOutsideAlerter';

function SizeInput({ sizes, placeholder, onSelect, initialSelected }) {
  const wrapperRef = React.useRef(null);

  const [value, setValue] = React.useState('')
  const [selected, setSelected] = React.useState(initialSelected)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  
  useOutsideAlerter(wrapperRef, () => {
    setShowSuggestions(false)
    if (selected) setValue((sizes.find((s) => s.id === selected) || {}).title || '')
    else setValue('');
  })

  React.useEffect(() => {
    setSelected(initialSelected)
    setValue((sizes.find((s) => s.id === initialSelected) || {}).title || '')
  }, [initialSelected, sizes])

  return (
    <SizeInputWrapper ref={wrapperRef}>
      <InputLabel>{placeholder}</InputLabel>
      <Input value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setShowSuggestions(true)} placeholder={placeholder} />
      {showSuggestions && value &&
        <SuggestionsWrapper>
          {sizes.length > 0 && sizes
              .filter(size => size.title.includes(value))
              .slice(0, 2)
              .map(size => (
                <Button key={size.id} onClick={() => {
                  setSelected(size.id)
                  onSelect(size.id)
                  setShowSuggestions(false)
                  console.log('setSelected', size.id)
                }}>{size.title}</Button>
              ))
          }
          { sizes.length === 0 && <InputLabel>Нет размерной сетки</InputLabel> }
        </SuggestionsWrapper>
      }
    </SizeInputWrapper>
  )
}

SizeInput.defaultProps = {
  sizes: [],
  onSelect: () => {},
}


const InputLabel = styled.span`
  color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  // box-sizing: border-box;
  outline: none;
  background-color: inherit;
  font-family: Ubuntu;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 30px;
  
  border: none;
  border-bottom: 2px solid #394974;

  ::placeholder {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.nonFocusedTextColor};
  }
`;

const SizeInputWrapper = styled.div`
  position: relative;
`;

const SuggestionsWrapper = styled.div`
  background-color: #394974;
  max-height: 270px;
  overflow-y: auto;
  padding: 5px 0;
  position: absolute;
  top: 51px;
  width: 100%;
  z-index: 2;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  text-align: left;
  width: 100%;

  :hover {
    background-color: #2c3650;
  }
`;

export { SizeInput }
