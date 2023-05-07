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
  }

  button.submit {
    background-color: ${({theme}) => theme.primaryBackground};
    border: none;
    border-radius: 10px;
    color: ${({theme}) => theme.primaryText};
    font-size: 1em;
    padding: 15px 0;
    margin-top: 20px;
    width: 100%;
  }

  button.back {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    color: ${({theme}) => theme.SecondaryText};
    font-size: 1em; 
    padding: 15px 0;
    margin-top: 20px;
    width: 100%;
  }
`;