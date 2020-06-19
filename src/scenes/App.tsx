import React from 'react'
import styled from 'styled-components'
import LeftMenu from 'components/LeftMenu'

const App = () => {
  return (
    <Wrapper>
      <LeftMenu />
      <span>Lol kek</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 500;
`

export default App
