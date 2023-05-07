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

  header {
    display: flex;
    justify-content: center;
    width: 100%;

    img.logo-datax {
      width: 10%;
    }
  }

  footer {
    justify-content: center;
    padding: 0;
    margin: 0;
    display: flex;
    width: 100%;
    h6 {
      padding: 0;
      margin: 1em;
    }
  }
  

  .tooltip-layout {
    align-items: center;
    display: flex;
    justify-content: space-between;
    background-color: ${({theme}) => theme.secondaryBackground};
    border-radius: 10px;
    padding: 10px 5px;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 225;
  
    div {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 100%;
  
    }
    svg {
      margin: 0 5px;
      padding: 0;
    }
    button {
      background-color: transparent;
      margin: 0 5px;
    }
  }

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
          font-size: 1em;
          padding: 2px 10px;
        }

        input {
          border: 1px solid ${({theme}) => theme.primaryBackground};
          border-radius: 10px;
          padding: 10px;
          font-size: 1em;
          position: relative;
          width: 100%;
        }

        button.display-password {
          background: transparent;
          border: none;
          position: absolute;
          right: 0px;
          bottom: 50%;
          top: 50%;
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
        font-size: 1em;
        padding: 15px 0;
        margin-top: 20px;
        margin-left: 15px;
        width: 90%;
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    section {
      width: 95%;

      form {
        margin: 0;
        width: 95%;

        label {
          width: 95%;
          
              input {
                width: 100%;
              }
        }

      }
    }



    button.display-password {
      bottom: 50%!important;
      top: 50%!important;
    }

    header {
      img.logo-datax {
        width: 20%;
      }
    }
  }
`;