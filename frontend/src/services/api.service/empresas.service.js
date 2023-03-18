import API from '.';

export const get = async (query = '') => {
  try {
    const { data } = await API.get(`/empresas?${query}`);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const create = async (body) => {
  try {
    const { data } = await API.post('/empresas', body);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const update = async (id, body) => {
  try {
    const { data } = await API.put(`/empresas/${id}`, body);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const remove = async (id) => {
  try {
    const { data } = await API.delete(`/empresas/${id}`);

    return data;
  } catch (e) {
    console.error(e);
  }
};