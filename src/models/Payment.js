import React from 'react';
import Request from '../helper/Request';
import api from '../config/api';
import AmexIcon from '../../assets/icons/amex.svg';
import JcbIcon from '../../assets/icons/jcb.svg';
import MasterCardIcon from '../../assets/icons/mastercard.svg';
import UnionPayIcon from '../../assets/icons/unionpay.svg';
import VisaIcon from '../../assets/icons/visa.svg';

const cardTypes = [
  {
    name: "American Express",
    alias: "amex",
    icon: AmexIcon
  },
  {
    name: "JCB",
    alias: "jcb",
    icon: JcbIcon
  },
  {
    name: "MasterCard",
    alias: "mastercard",
    icon: MasterCardIcon
  },
  {
    name: "UnionPay",
    alias: "unionpay",
    icon: UnionPayIcon
  },
  {
    name: "Visa",
    alias: "visa",
    icon: VisaIcon
  }
];

const get = async (data) => {
  try {
    const { data } =  await Request.backend('GET', `${api.USER_PAYMENTS}`, data);
    return data;
  } catch (err) {
    console.log('error UserPayment@get', err);
    return [];
  }
};

const store = async (data) => {
  try {
    return await Request.backend('POST', `${api.USER_PAYMENTS}`, data);
  } catch (err) {
    console.log('error UserPayment@store', err);
    return [];
  }
};

const update = async (id, data) => {
  try {
    return await Request.backend('PATCH', `${api.USER_PAYMENTS}/${id}`, data);
  } catch (err) {
    console.log('error UserPayment@update', err);
    return [];
  }
};

const destroy = async (id) => {
  try {
    return await Request.backend('DELETE', `${api.USER_PAYMENTS}/${id}`);
  } catch (err) {
    console.log('error UserPayment@destroy', err);
    return [];
  }
};

const getLogo = (name) => {
  const cardType = cardTypes.filter(({ alias }) => alias === name);
  if (cardType.length) {
    const Logo = cardType[0].icon;
    return <Logo />
  }

  return;
};


export default {
  cardTypes,
  get,
  store,
  update,
  destroy,
  getLogo
};
