import styled from 'styled-components';

export const Container = styled.section`
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.text};
padding: 20px 0;

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

  div {
    align-items: end;
    display: flex;
    flex-direction: column;
    width: 20%;
  }

  button {
    display: block;
    background-color: ${({theme}) => theme.primaryBackground};
    border: none;
    border-radius: 10px;
    color: ${({theme}) => theme.primaryText};
    font-size: 1em;
    padding: 10px 15px;
    margin: 0 2.5%;
  }

  label.formatted {
    align-items: start;
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    position: relative;
    width: 95%;

    span {
      font-size: 1.5em;
      font-weight: bold;
      padding: 2px 10px;
    }

    input, textarea, select {
      border: 1px solid ${({theme}) => theme.primaryBackground};
      border-radius: 10px;
      padding: 2%;
      font-size: 1em;
      position: relative;
      width: 96%;
    }

    select {
      width: 100%;
    }

    textarea {
      height: 15vh;
    }

    button.display-password {
      background: transparent;
      border: none;
      position: absolute;
      right: 15px;
      bottom: 20%;
    }
  }
}

form {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;

  h3.date-register {
    align-self: start;
    font-size: 1.5em;
    margin-left: 2.5%;
  }

  div.formatted {
    align-items: center;
    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 95%;

    div.formatted {
      flex-direction: row;

      label.formatted {
        margin: 0 1.5%;

        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }

    label.formatted {
      align-items: start;
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      position: relative;
      width: 95%;

      span {
        font-size: 1.5em;
        font-weight: bold;
        padding: 2px 10px;
      }

      input, textarea, select {
        border: 1px solid ${({theme}) => theme.primaryBackground};
        border-radius: 10px;
        padding: 2%;
        font-size: 1.5em;
        position: relative;
        width: 96%;
      }

      select {
        width: 100%;
      }

      textarea {
        height: 15vh;
      }

      button.display-password {
        background: transparent;
        border: none;
        position: absolute;
        right: 15px;
        bottom: 20%;
      }
    }
  }

  div.logo-corpo {
    display: flex;

    div {
      align-items: start;
      display: flex;
      flex-direction: column;
      margin-left: 20px;

      &.company-logo {
        background-color: ${({theme}) => theme.secondaryBackground};
        height: 15vh;
        margin: 0;
        width: 15vh;
      }

      span {
        font-size: 1.2em;

        &.button {
          background-color: ${({theme}) => theme.primaryBackground};
          border-radius: 10px;
          color: ${({theme}) => theme.primaryText};
          cursor: pointer;
          font-size: 1.3em;
          padding: 10px 30px;
          margin-top: 20px;
        }
      }
    }
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    margin: 20px 0;

    button.cancel {
      display: block;
      background-color: transparent;
      border: none;
      border-radius: 10px;
      color: ${({theme}) => theme.secondaryText};
      font-size: 1.3em;
      padding: 15px 20px;
    }

    button.submit {
      display: block;
      background-color: ${({theme}) => theme.primaryBackground};
      border: none;
      border-radius: 10px;
      color: ${({theme}) => theme.primaryText};
      font-size: 1.3em;
      padding: 15px 20px;
      margin: 0 2.5%;
    }
  }

  button.icon {
    align-self: center;
    align-items: center;
    display: flex;
    background-color: transparent;
    margin-top: 1.5%;
    padding: 0;

    &.icon-add {
      svg {
        color: green;
      }
    }
    &.icon-remove {
      display: inline-block;
      margin: 0;
      margin-left: 20px;

      svg {
        color: red;
      }
    }
  }

  ul {
    width: 95%;
    margin: 0 auto;

    li {
      align-items: center;
      border-bottom: 1px solid ${({theme}) => theme.secondaryBackground};
      display: flex;
      font-size: 1.3em;
      margin-left: 0;
      margin-right: auto;

      b {
        margin: 0 5px;
      }
    }
  }
}
`;