import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CreditCardType from 'credit-card-type';
import validate from 'validate.js';
import MyTextInput from '../../components/MyTextInput';
import Payment from '../../models/Payment';
import Features from '../../helper/Features';
import Spinner from '../../hoc/Spinner';
import styles from '../../styles/styles';
import validation from './validation.json';
import moment from 'moment';

const AddPaymentScreen = ({ navigation }) => {
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (key, value) => {
    const input = { ...form };
    if (key == 'cardNumber') {
      const cardType = CreditCardType(value);
      if (cardType.length === 1) {
        input.cardType = cardType[0].type;
      } else {
        input.cardType = undefined;
      }
    }
    input[key] = value;
    setForm(input);
  };

  const save = async () => {
    const errors = validate(form, validation);
    if (errors !== undefined) {
      setErros(errors);
    } else {
      setIsLoading(true);666
      const data = {
        card_type: form.cardType,
        card_no: form.cardNumber.replace(/\s/g, ''),
        exp_date: moment(form.expiryDate, 'MM/YY').format('MMYYYY'),
        cvv2: form.cvv,
        name: form.owner
      };

      const response = await Payment.store(data);
      setIsLoading(false);
      Features.toast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        navigation.navigate('PaymentScreen', {
          fetchPayments: true
        })
      }
      setErros({});
    }
  };
  return (
    <Spinner containerStyle={[styles.p20]} isLoading={isLoading}>
      <MyTextInput
        label="Name on Card"
        onChangeText={(value) => onChange('owner', value)}
        value={form.owner}
        errorMessage={errors.owner}
      />
      <View style={[styles.rowAllCenter]}>
        <MyTextInput
          maskedType="credit-card"
          label="Credit Card Number"
          onChangeText={(value) => onChange('cardNumber', value)}
          value={form.cardNumber}
          errorMessage={errors.cardNumber}
          containerStyle={[styles.flex1, styles.mr10]}
          keyboardType="number-pad"
        />
        { form.cardType ? Payment.getLogo(form.cardType) : null }
      </View>
      <View style={[styles.row]}>
        <MyTextInput
          maskedType="datetime"
          maskOptions={{ format: 'MM/YY' }}
          label="Expiry/Date"
          onChangeText={(value) => onChange('expiryDate', value)}
          value={form.expiryDate}
          errorMessage={errors.expiryDate}
          containerStyle={[styles.flex1, styles.mr5]}
          placeholder="MM/YY"
          keyboardType="number-pad"
        />
        <MyTextInput
          maskedType="custom"
          maskOptions={{ mask: '999' }}
          label="CVV"
          onChangeText={(value) => onChange('cvv', value)}
          value={form.cvv}
          errorMessage={errors.cvv}
          containerStyle={[styles.flex1, styles.ml5]}
          keyboardType="number-pad"
        />
      </View>
      <TouchableOpacity style={[styles.mt10]} activeOpacity={0.9} onPress={save}>
        <Text style={styles.btnPrimary}>Save</Text>
      </TouchableOpacity>
    </Spinner>
  );
};

export default AddPaymentScreen;