const TYPES = {
  wrongLogin: {
    code: 401,
    message: 'Email and/or password incorrect, try again with the correct',
  },
  notFound: {
    code: 404,
    message: 'Not Found',
  },
  alreadyExists: {
    code: 409,
    message: 'Already exists with this name',
  },
};

const handdleGenericErrors = (error, _request, response, _next) => {
  console.log(error, "ERRO");
  if (TYPES[error]) {
    const { code, message } = TYPES[error];
    return response.status(code).json({ message });
  }
  if (error.details) {

    const [details] = error.details;
    return response.status(400).json({ message: details.message });
  }

  if (error.statusCode) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: 'Internal error' });
};

module.exports = handdleGenericErrors;
