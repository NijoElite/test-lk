import { ajax } from './ajax';

export const getAccessToken = async ({ email, password }) => {
  return await ajax({
    url: '/login',
    ajaxParams: {
      body: { email, password },
    },
    requestParams: {
      method: 'POST',
    },
  });
};
