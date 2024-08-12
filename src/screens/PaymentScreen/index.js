import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Payment from '../../models/Payment';
import Spinner from '../../hoc/Spinner';
import Features from '../../helper/Features';
import styles from '../../styles/styles';
import PaymentCard from '../../components/PaymentCard';

const PaymentScreen = ({ navigation, route }) => {
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AddPaymentScreen')}>
          <Text style={styles.headerRightBtnText}>Add Payment</Text>
        </TouchableOpacity>
      ),
    });

    fetchPayments();
  }, []);

  useEffect(() => {
    if (route.params?.fetchPayments) {
      fetchPayments();
    }
  }, [route.params])

  const fetchPayments = async () => {
    setIsLoading(true);
    const payments = await Payment.get();
    setPayments(payments);
    setIsLoading(false);
  };

  const onDelete = (payment) => {
    Alert.alert('Confirmation', 'Do you want to delete this payment account?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => deletePayment(payment)
      }
    ])
  };

  const deletePayment = async (payment) => {
    setIsLoading(true);
    const response = await Payment.destroy(payment.id);
    setIsLoading(false);
    if (response.success) {
      await fetchPayments();
    }

    Features.toast(response.message, response.success ? 'success' : 'error');
  };

  return (
    <Spinner isLoading={isLoading} containerStyle={[styles.p20]}>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.payer_id}
        renderItem={({ item }) => (
          <PaymentCard
            name={item.name}
            number={`${item.first_6}xxxxx${item.last_4}`}
            cardType={item.card_type.slug}
            onDelete={() => onDelete(item)}
          />
        )}
      />
    </Spinner>
  );
};

const style = StyleSheet.create({

});

export default PaymentScreen;