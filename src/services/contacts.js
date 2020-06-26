import { ajax } from './ajax';

export const createContact = async ({ userId, accessToken, fields }) => {
  return await ajax({
    url: '/contacts',
    ajaxParams: {
      json: { userId, ...fields },
      accessToken,
    },
    requestParams:{
      method: 'POST',
    },
  });
};

export const getContacts = async ({ userId, accessToken, page }) => {
  return await ajax({
    url: '/contacts',
    ajaxParams: {
      query: { userId, _limit: 150 },
      accessToken,
    },
    requestParams: {
      method: 'GET',
    },
  });
};

export const updateContact = async ({ accessToken, userId, contactId, fields = {} }) => {
  return await ajax({
    url: `/contacts/${contactId}`,
    ajaxParams: {
      json: { ...fields, userId },
      accessToken,
    },
    requestParams: {
      method: 'PATCH',
    },
  });
};


export const deleteContact = async ({ accessToken, userId, contactId }) => {
  return await ajax({
    url: `/contacts/${contactId}`,
    ajaxParams: {
      json: { userId },
      accessToken,
    },
    requestParams: {
      method: 'DELETE',
    },
  });
};
