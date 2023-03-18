import styled from 'styled-components';

export const Container = styled.section`
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.text};
padding: 20px 0;
min-height 80vh;
height: 100%;
width: 100%;

h1 {
  font-size: 2em;
  margin-left: 2%;
}

ul {
  background-color: white;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;

  li {
    align-items: center;
    display: flex;
    justify-content: center;
    list-style: none;
    height: 15vh;
    padding: 5%;
    margin: 1%;
    width: 15vh;

    button {
      align-items: center;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: 0.4s;
      min-padding: 50px;
      padding: 10vh;
      height: 100%;
      width: 100%;

      &:hover {
        transform: scale(1.1);
        transition: 0.4s;
        background-color: ${({theme}) => theme.primaryBackground};

        svg, span {
          color: ${({theme}) => theme.background};
          transform: scale(1.1);
          transition: 0.4s;
        }
      }
    }
  }
}
`;