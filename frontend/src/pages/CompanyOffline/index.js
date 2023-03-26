const { Container } = require('./style');

export default function CompanyOff() {
  return (
    <Container>
      <h1 id="title-login">Dashboard de Power BI</h1>
      <section>
        <h3>Empresa se encontra com o status inativo.</h3>
        <span>Favor entrar em contato com o suporte.</span>
        <div className="linhas">
          <hr className="active"/>
          <hr className="active"/>
        </div>
      </section>
    </Container>
  );
}
