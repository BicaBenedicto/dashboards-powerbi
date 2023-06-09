import API from '.';

export const get = async (query = '') => {
  try {
    const { data } = await API.get(`/permissoes?${query}`);

    return data;
  } catch (e) {
    throw e?.response?.data?.message || 'Erro tente novamente mais tarde';
  }
};

export const create = async (body) => {
  try {
    const { data } = await API.post('/permissoes', body);

    return data;
  } catch (e) {
    throw e?.response?.data?.message || 'Erro tente novamente mais tarde';
  }
};

export const update = async (id, body) => {
  try {
    const { data } = await API.put(`/permissoes/${id}`, body);

    return data;
  } catch (e) {
    throw e?.response?.data?.message || 'Erro tente novamente mais tarde';
  }
};

export const remove = async (id) => {
  try {
    const { data } = await API.delete(`/permissoes/${id}`);

    return data;
  } catch (e) {
    throw e?.response?.data?.message || 'Erro tente novamente mais tarde';
  }
};