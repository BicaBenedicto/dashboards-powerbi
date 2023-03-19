const generateRandomPassword = async (passwordLength = 10) => {
  let password = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charsLength = chars.length;

  for (let i = 0; i < passwordLength; i++) {
    password += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return password;
};

module.exports = generateRandomPassword;
