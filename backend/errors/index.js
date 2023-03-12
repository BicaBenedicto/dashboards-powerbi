const TYPES = {
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
  if (TYPES[error]) {
    const { code, message } = TYPES[error];
    return response.status(code).json({ message });
  }
  if (error.details) {
    const [details] = error.details;
    return response.status(400).json({ message: details.message });
  }
  console.log(error);
  return response.status(500).json({ message: 'Internal error' });
};

module.exports = handdleGenericErrors;
