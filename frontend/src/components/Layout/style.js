import styled from 'styled-components';

export const Container = styled.section`
display: flex;
flex-direction: column;
background-color: ${({theme}) => theme.background};
color: ${({theme}) => theme.text};
min-height: 100vh;
width: 100%;

h1 {
  margin: 10px 0;
}

header.header-layout {
  align-items: center;
  background-color: white;
  display: flex;
  padding: 20px 0;
  justify-content: space-between;

  h1 {
    margin-left: 5%;
  }
  div {
    margin-right: 5%;
    
    h4 {
      margin: 0;
    }
    span {
      margin: 0;
    }
  }

  button.menu-button {
    background-color: transparent;
    display: none;
    margin-left: 10px;
  }
}

section.section-layout {
  align-items: start;
  display: flex;
  margin-top: 5px;
  justify-content: stretch;
  height: 100%;
  width: 100%;

  aside.aside-layout {
    align-items: start;
    background-color: white;
    display: flex;
    transition: 0.2s;
    min-height: 80vh;
    width: 5%;

    nav {
      width: 100%;

      ul {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        width: 100%;

        li {
          list-style: none;
          width: 100%;

          button {
            align-items: center;
            background-color: transparent;
            display: flex;
            justify-content: start;
            margin: 10px auto;
            width: 90%;

            &:hover {
              svg {
                transition: 0.5s;
                background-color: ${({theme}) => theme.primaryBackground};
                color: white;
                border-radius: 5px;
                padding: 5px;
              }
              span {
                color: ${({theme}) => theme.text};
                font-weight: 600;
                transition: 0.5s;
                transform: scale(1.1);
              }
            }

            svg {
              color: ${({theme}) => theme.secondaryText};
              transition: 0.5s;
              width: 100%;
            }

            span {
              color: ${({theme}) => theme.secondaryText};
              margin-left: 5px;
              transition: 0.1s;
              transform: scale(0, 1) translateX(-2vw);
            }

          }
        }
      }
    }

    &:hover {
      transition: 0.2s;
      width: 20%;

      nav ul li button {
        svg {
          width: 15%;
        }
        span {
          transition: 0.5s;
          transform: scale(1)  translateX(0);;
        }
      }
    }
  }
  main.main-layout {
    padding: 0 20px;
    min-height: 80vh;
    height: 100%;
    width: 100%;
  }
}

@media only screen and (max-width: 1000px) {
  header.header-layout {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 200;
  
    button.menu-button {
      display: block;
    }
  }

  section.section-layout {
    margin-top: 100px;

    aside.aside-layout {
      display: none;

      &.active {
        display: flex;
        transition: 5s;
        position: absolute;
        width: 100%;
        z-index: 250;

        nav {
          width: 100%;
  
          ul {
            li {
              button {
                svg {
                  color: ${({theme}) => theme.secondaryText};
                  width: 20%;
                }
  
                span {
                  color: ${({theme}) => theme.secondaryText};
                  margin-left: 5px;
                  transition: 0.1s;
                  transform: scale(1) translateX(0);
                }
  
              }
            }
          }
        }
      }
    }
  }
}
`;