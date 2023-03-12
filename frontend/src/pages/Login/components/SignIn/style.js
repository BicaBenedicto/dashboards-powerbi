import styled from 'styled-components';

export const Form = styled.form`
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
    color: ${({theme}) => theme.secondaryBackground};
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
`;