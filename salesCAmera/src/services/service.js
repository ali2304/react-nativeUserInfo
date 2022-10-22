import axios, {create} from 'axios';
import {HTTP_METHODS, ERROR_MESG} from './api_constants';

/**
 * axios object
 */
//const API = require('axios');
const API = axios.create({
  timeout: 60000,
});

/***
 * Get common request headers object
 */
const getReqHeaders = async () => {
  return {
    Accept: 'application/json',
  };
};
/**
 * To perform api from class where this function/method is imported,
 * and send back completion in resolve or reject based on api response.
 */
export const request = (url, httpMethod, params) =>
  new Promise(async (resolve, reject) => {
    //the token is a variable which holds the token
    try {
      const commonHeaders = await getReqHeaders();
      const configObj = {
        headers: {
          ...commonHeaders,
        },
      };

      console.log('<><><><><> API <><><><><>', API);
      console.log('<><><><><> url <><><><><>', url);
      console.log('<><><><><> httpMethod <><><><><>', httpMethod);
      console.log('<><><><><> params <><><><><>', JSON.stringify(params));
      console.log(
        '<><><><><> headers <><><><><>',
        JSON.stringify(configObj.headers),
      );

      switch (httpMethod) {
        // GET
        case HTTP_METHODS.GET:
          doGet(url, resolve, reject, configObj);
          break;

        // POST
        case HTTP_METHODS.POST:
          doPost(url, params, resolve, reject, configObj);
          break;
      }
    } catch (error) {
      reject(error);
    }
  });

/**
 *  This function is used to parse response and send completion to handle resolve and reject value for parent Promise.
 * We can consider it as a child promise
 * @param {*} response
 */
export const parseResponse = response =>
  new Promise(parsedResponse => {
    const isSuccess = response.status === 200 ? true : false;
    if (isSuccess) {
      parsedResponse({isSuccess: true, response: response});
    } else {
      let message = ERROR_MESG.SOMETHING_WENT_WRONG;
      if (response.data != null && response.data.message) {
        message = response.data.message;
      }
      parsedResponse({isSuccess: false, message: message});
    }
  });

/***
 * This function is used for service request with GET as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doGet = (url, resolve, reject, config = {}) => {
  API.get(url, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        // console.log(`url ${url} response => ${JSON.stringify(response)}`);
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log('Errorurl:UD', error);
      reject(error);
    });
};

/***
 * This function is used for service request with POST as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPost = (url, params, resolve, reject, config = {}) => {
  API.post(url, params, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      reject(error);
    });
};
