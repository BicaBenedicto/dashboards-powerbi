import styled from 'styled-components';

export const Container = styled.section`
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.text};
padding-top: 0;
width: 100%;

h1 {
  font-size: 1.5em;
}

div.status {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 95%;

  select {
    margin: 0 10px;
    width: 50%;
  }

  div.dashboards-select {
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: 50%;
    
    select {
      margin: 0 10px;
      width: 90%;
    }
  }

  span {
    &.type {
      color: ${({theme}) => theme.secondaryText};
      font-weight: bold;
      margin-right: 10px;
    }
  }

  input, textarea, select {
    border: 1px solid ${({theme}) => theme.primaryBackground};
    border-radius: 10px;
    padding: 1%;
    font-size: 1em;
    position: relative;
  }

  textarea {
    height: 15vh;
  }

}

div.dashboard {
  height: 100%;
  position: relative;
  width: 100%;

  iframe {
    border: none;
    border-radius: 20px;
    min-height 90vh;
    height: 100%;
    width: 100%;
  }

  hr {
    background: rgb(247, 247, 252);
    border: none;
    bottom: -5px;
    left: 0;
    height: 56px;
    position: absolute;
    width: 100%;
  }
}
`;