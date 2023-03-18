import styled from 'styled-components';

export const Container = styled.section`
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.text};
padding: 20px 0;
padding-top: 0;
min-height 80vh;
height: 100%;
width: 100%;

h1 {
  font-size: 2em;
  margin-left: 2%;
}

div.status {
  align-items: center;
  display: flex;
  justify-content: end;
  margin: 0 auto;
  width: 95%;

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
    margin-bottom: 10px;
    width: 20%;
  }

  select {
    width: 20%;
  }

  textarea {
    height: 15vh;
  }

}

div.dashboard {
  height: 100%;
  width: 100%;

  iframe {
    border: none;
    border-radius: 20px;
    min-height 70vh;
    height: 100%;
    width: 100%;
  }
}
`;