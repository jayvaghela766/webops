import api from '../config/api';
import Request from '../helper/Request';

const getQuestions = async () => {
  try {
    return await Request.backend('GET', api.GET_QUESTIONNAIRE);
  } catch (err) {
    console.log('error questionnaire@getQuestions', err);
    return [];
  }
};

const getProductRecommendation = async (params = null) => {
  try {
    return await Request.backend('GET', api.GET_PRODUCT_RECOMMENDATION, null, params);
  } catch (err) {
    console.log('error questionnaire@getProductRecommendation', err);
    return [];
  }
};

const storeUserQuestionnaire = async (data) => {
  try {
    return await Request.backend('POST', api.STORE_USER_QUESTIONNAIRE, data);
  } catch (err) {
    console.log('error questionnaire@storeUserQuestionnaire', err);
    return {}
  }
};

export default {
  getQuestions,
  getProductRecommendation,
  storeUserQuestionnaire,
};