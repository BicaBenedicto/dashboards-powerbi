import API from '.';

export const get = async (query = '') => {
  try {
    const { data } = await API.get(`/usuarios?${query}`);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const create = async (body) => {
  try {
    const { data } = await API.post('/usuarios', body);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const login = async (body) => {
  try {
    const { data } = await API.post('/usuarios/login', body);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const forgetPassword = async (body) => {
  try {
    const { data } = await API.post('/usuarios/forget-password', body);

    return data;
  } catch (e) {
    console.error(e);
  }
};


export const update = async (id, body) => {
  try {
    const { data } = await API.put(`/usuarios/${id}`, body);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const remove = async (id) => {
  try {
    const { data } = await API.delete(`/usuarios/${id}`);

    return data;
  } catch (e) {
    console.error(e);
  }
};