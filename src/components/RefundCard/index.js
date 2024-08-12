import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MyFilePicker from '../../components/MyPickerInput';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const RefundCard = ({ order, items, setRefundQuantity: onChangeQuantity }) => {
  const [refundQuantity, setRefundQuantity] = useState({});
  const [refundAmount, setRefundAmount] = useState({});
  const [refundTotal, setRefundTotal] = useState();

  useEffect(() => {
    calculateRefundTotal();
  }, [refundAmount]);

  const onChange = (quantity, item) => {
    const quantities = {...refundQuantity};
    const amount = {...refundAmount};

    if (quantity) {
      const price = Number(item.total);
      const pricePerPiece = price / Number(item.quantity);
      const refundAmount = pricePerPiece * Number(quantity);

      quantities[item.id] = quantity;
      amount[item.id] = refundAmount
    } else {
      delete quantities[item.id];
      delete amount[item.id];
    }

    onChangeQuantity(quantities);
    setRefundQuantity(quantities);
    setRefundAmount(amount);
  };

  const calculateRefundTotal = () => {
    let total = 0;
    Object.keys(refundAmount).forEach((item) => {
      total += refundAmount[item];
    });
    setRefundTotal(total);
  };

  return (
    <View style={style.container}>
      <Text style={[style.labelSemiBold, styles.mb5]}>Order Number: {order.code}</Text>
      <View style={style.innerContainer}>
        <Text style={[style.labelSemiBold, styles.mb15]}>Item</Text>
        {
          items.map((item) => (
            <View style={[styles.mb20]} key={order.code + item.product.name}>
              <View style={[styles.row]}>
                <View style={style.imageContainer}>
                  <Image source={{ uri: item.product.thumbnail_url }} style={style.image} />
                </View>
                <View style={[styles.flex1, styles.justifySpaceBetween]}>
                  <Text style={[style.labelSemiBold, styles.mb15]}>{item.product.name + ' ' + item.quantity}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.alignItemsCenter]}>
                <Text style={[style.labelNormal, styles.flex1, styles.textRight, styles.mr20]}>QTY</Text>
                <MyFilePicker
                  data={Array.from(Array(Number(item.quantity)).keys()).map((item) => ({ label: (item + 1).toString(), value: (item + 1).toString() }))}
                  placeholder="Keep"
                  containerStyle={[styles.flex1, styles.ml20]}
                  onValueChange={(val) => onChange(val, item)}
                  value={refundQuantity[item.id]}
                />
              </View>
              <View style={[styles.row, styles.mb5]}>
                <Text style={[style.labelNormal, styles.flex1, styles.textRight]}>Refund Amount:</Text>
                <Text style={[style.labelSemiBold, styles.flex1, styles.textRight]}>{refundAmount[item.id] ? '$' + refundAmount[item.id].toFixed(2) : '-'}</Text>
              </View>
            </View>
          ))
        }
        <View style={style.line} />
        <View style={[styles.row, styles.mb5]}>
          <Text style={[style.labelNormal, styles.flex1, styles.textRight, styles.bold]}>Refund Total:</Text>
          <Text style={[style.labelSemiBold, styles.flex1, styles.textRight, styles.bold]}>{refundTotal ? '$ ' + refundTotal.toFixed(2) : '-'}</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
  },
  innerContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    marginRight: 10
  },
  image: {
    width: null,
    height: null,
    flex: 1,
  },
  labelSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
    color: colors.dark,
    fontSize: 16
  },
  labelNormal: {
    fontFamily: 'OpenSans-Regular',
    color: colors.dark,
    fontSize: 16
  },
  status: {
    fontFamily: 'OpenSans-SemiBoldItalic',
    color: colors.dark,
    fontSize: 16
  },
  line: {
    width: 75,
    height: 1,
    backgroundColor: colors.dark,
    alignSelf: 'flex-end',
    marginVertical: 10
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5
  },
  buttonOutline: {
    borderColor: colors.primary,
    borderWidth: 1,
  }
});

export default RefundCard;