import API from '.';

export const get = async (query = '') => {
  try {
    const { data } = await API.get(`/dashboards?${query}`);

    return data;
  } catch (e) {
    throw e;
  }
};

export const create = async (body) => {
  try {
    const { data } = await API.post('/dashboards', body);

    return data;
  } catch (e) {
    throw e;
  }
};

export const update = async (id, body) => {
  try {
    const { data } = await API.put(`/dashboards/${id}`, body);

    return data;
  } catch (e) {
    throw e;
  }
};

export const remove = async (id) => {
  try {
    const { data } = await API.delete(`/dashboards/${id}`);

    return data;
  } catch (e) {
    throw e;
  }
};