export const maskCnpj = (cnpj) => {
  //retira os caracteres indesejados...
  cnpj = cnpj.replace(/[^\d]/g, "");
  console.log(cnpj, cnpj.length)

  //realizar a formatação...

  if (cnpj.length < 6) {
      return cnpj.replace(/(\d{2})(\d)/, "$1.$2");
  }
  if (cnpj.length < 9) {
    return cnpj.replace(/(\d{2})(\d{3})(\d)/, "$1.$2.$3");
  }
  if (cnpj.length < 13) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d)/, "$1.$2.$3/$4");
  }

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
};

export function convertTel(cpf){
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  if (cpf.length > 10) {
      return cpf.replace(/(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2.$3-$4");
  }
  if (cpf.length > 6) {
      return cpf.replace(/(\d{2})(\d{4})(\d)/, "($1) $2-$3");
  }
  if (cpf.length > 2) {
      return cpf.replace(/(\d{2})(\d)/, "($1) $2");
  }
  return cpf.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2.$3-$4");
}
