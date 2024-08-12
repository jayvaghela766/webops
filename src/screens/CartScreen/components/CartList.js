import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../../styles/styles';

const CartList = ({ productName, quantity, price, imageUrl, isOnEdit, onAdd, onRemove }) => (
  <View style={style.cartList}>
    <View style={style.productList}>
      <Image
        source={{ uri: imageUrl }}
        style={style.image}
      />
      <Text style={style.productName}>{productName}</Text>
    </View>
    <View style={style.priceList}>
      {
        isOnEdit
         ? (
          <View style={style.quantityControl}>
            <TouchableOpacity activeOpacity={0.9} style={style.controlButton} onPress={onRemove}>
              <Icon color="#306F8C" size={10} name="remove" />
            </TouchableOpacity>
            <Text style={[styles.normal, styles.f12, styles.dark]}>{quantity}</Text>
            <TouchableOpacity activeOpacity={0.9} style={style.controlButton} onPress={onAdd}>
              <Icon color="#306F8C" size={10} name="add" />
            </TouchableOpacity>
          </View>
         )
         : <Text style={[styles.regular, styles.f12, styles.dark, styles.textCenter, styles.flex1]}>{quantity}</Text>
      }
      <Text style={[style.price, styles.flex1, styles.textCenter]}>{price ? `SGD $${price}` : 'No Information'}</Text>
    </View>
  </View>
);

const style = StyleSheet.create({
  image: {
    width: 60,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10
  },
  productList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  priceList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cartList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D5D8DD'
  },
  productName: {
    flex: 1,
    paddingRight: 20
  },
  price: {
    fontFamily: 'OpenSans-Bold'
  },
  quantityControl: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    borderColor: '#C4C4C4',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  controlButton: {
    paddingVertical: 5,
    paddingHorizontal: 2
  }
});

export default CartList;
