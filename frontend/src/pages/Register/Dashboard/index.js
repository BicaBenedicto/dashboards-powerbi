import { Switch } from "@mui/material";

export default function RegisterDashboard() {
  return (
    <div>
      <h1>Cadastro de Dashboard</h1>
      <div>
        <span>Status do dashboard</span>
        <Switch />
      </div>
      <form>
        <div>
          <label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome do dashboard"
            />
          </label>
          <label>
            <span>URL</span>
            <input
              type="text"
              placeholder="https://powerbi.com/dashboard"
            />
          </label>
          <label>
            <span>Empresa</span>
            <select
              placeholder="Empresa"
            />
          </label>
          <h3>Data do Cadastro: {new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>

          <label>
            <span>Descrição</span>
            <textarea
              placeholder="Descrição sobre o proposito do dashboard"
            />    
          </label>
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
