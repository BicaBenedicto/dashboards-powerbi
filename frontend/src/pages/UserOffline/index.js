const { Container } = require('./style');

export default function UserOff() {
  return (
    <Container>
      <h1 id="title-login">DataX - BI</h1>
      <section>
        <h3>Usuário se encontra com o status inativo.</h3>
        <span>Favor entrar em contato com o suporte.</span>
        <div className="linhas">
          <hr className="active"/>
          <hr className="active"/>
        </div>
      </section>
    </Container>
  );
}
