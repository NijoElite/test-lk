import { BASE_URL } from './config';

/*

{
    url:
    ajaxParams: {
        // используем чтоб понять как модифицировать запрос
    },

    requestParams: {
        // мерджим к параметрам fetch
    }
}

*/

const createErrorObject = message => {
  return {
    error: {
      message,
    },
  };
};

export const ajax = async ({ url: handler, ajaxParams = {}, requestParams = {} }) => {
  const fetchParams = { ...requestParams };
  const url = new URL(`${BASE_URL}${handler}`);

  fetchParams.headers = { ...fetchParams.headers };

  if (ajaxParams.query) {
    url.search = new URLSearchParams(ajaxParams.query);
  }

  if (ajaxParams.accessToken) {
    fetchParams.withCredentials = true;
    fetchParams.headers['Authorization'] = `Bearer ${ajaxParams.accessToken}`;
  }

  if (ajaxParams.body) {
    fetchParams.body = new URLSearchParams(ajaxParams.body);
  }

  if (ajaxParams.json) {
    fetchParams.body = JSON.stringify(ajaxParams.json);
    fetchParams.headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, fetchParams);
    const json = await response.json();

    if (!response.ok) {
      if (json === 'jwt expired') {
        // Нужно обновить токен, но json-server не умеет, поэтому выходим
        document.dispatchEvent(new Event('jwt:expired'));
      }

      return createErrorObject(json);
    }

    return {
      data: json,
    };
  } catch (err) {
    return createErrorObject('Network Error');
  }
};

