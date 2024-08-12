import api from '../config/api';
import Request from '../helper/Request';

const all = async (page = 1, params = null) => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_PRODUCTS}?page=${page}`, null, params);
    return data;
  } catch (err) {
    console.log('error Product@all', err);
    return [];
  }
};

const get = async (id = null) => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_PRODUCTS}/${id}`);
    return data;
  } catch (err) {
    console.log('error Product@get', err);
    return [];
  }
};

const getProductPrice = (product, quantity, optionId = null) => {
  const prices = product.product_prices.filter((price) => {
    const byQuantity = Number(quantity) >= Number(price.min_quantity) && (Number(quantity) <= Number(price.max_quantity) || price.max_quantity == null)
    if (optionId) {
      return byQuantity && parseInt(price.product_option_id) === parseInt(optionId)
    }

    return byQuantity;
  });

  if (prices.length) {
    const price = Number(prices[0].price);
    return {
      perItem: price,
      total: price
    };
  }

  return {
    perItem: 0,
    total: 0
  }
};

const categories = async () => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_CATEGORY_PRODUCTS}`);
    return data;
  } catch (err) {
    console.log('error Product@categories', err);
    return [];
  }
};


export default {
  all,
  get,
  getProductPrice,
  categories
};
