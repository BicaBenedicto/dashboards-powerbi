import styled from 'styled-components';

export const Container = styled.section`
  background-color: ${({theme}) => theme.background};
  color: ${({theme}) => theme.text};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  height: 100vh;
  width: 100%;

  h1#title-login {
    display: block;
    font-size: 3em;
  }

  section {
    background: white;
    padding-bottom: 15vh;
    width: 40%;

    h3 {
      text-align: center;
    }

    div.linhas {
      display: flex;
      width: 100%;
  
      hr {
        background-color: ${({theme}) => theme.secondaryBackground};
        border: none;
        height: 4px;
        width: 100%;
        &.active {
          background-color: ${({theme}) => theme.primaryBackground}!important;
        }
      }
    }

    form {
      align-items: center;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      width: 70%;

      label {
        align-items: start;
        display: flex;
        flex-direction: column;
        margin: 10px 0;
        position: relative;
        width: 100%;

        span {
          font-size: 1.5em;
          padding: 2px 10px;
        }

        input {
          border: 1px solid ${({theme}) => theme.primaryBackground};
          border-radius: 10px;
          padding: 5%;
          font-size: 1.5em;
          position: relative;
          width: 90%;
        }

        button.display-password {
          background: transparent;
          border: none;
          position: absolute;
          right: 15px;
          bottom: 20%;
        }
      }

      button.forget-password {
        background-color: transparent;
        border: none;
        color: ${({theme}) => theme.primaryBackground};
        font-size: 0.9em;
        margin-left: auto;
        margin-right: 0;
      }

      button.submit {
        background-color: ${({theme}) => theme.primaryBackground};
        border: none;
        border-radius: 10px;
        color: ${({theme}) => theme.primaryText};
        font-size: 1.3em;
        padding: 15px 0;
        margin-top: 20px;
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    section {
      width: 95%;
    }

    button.display-password {
      right: 15px;
      bottom: 7px!important;
    }
  }
`;