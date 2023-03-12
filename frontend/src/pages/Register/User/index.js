import { Switch } from "@mui/material";

export default function RegisterUser() {
  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <div>
        <span>Status da colaborador</span>
        <Switch />
      </div>
      <form>
        <div>
          <label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome"
            />
          </label>
          <div>
            <label>
              <span>E-mail</span>
              <input
                type="email"
                placeholder="colaborador@email.com"
              />
            </label>
            <label>
              <span>Telefone</span>
              <input
                type="text"
                placeholder="(11) 9.5555-5555"
              />
            </label>
          </div>
          <h3>Data do Cadastro: {new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>

          Tabela dos dashs
        </div>
        <button>
          Salvar
        </button>
        <button>
          Cancelar
        </button>
      </form>
    </div>
  );
}
