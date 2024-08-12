import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const MyOrderCard = ({ name, hiddenItem, price, option, color, lensPower, quantity, subtotal, invoice, imageUrl, onPress }) => (
  <TouchableOpacity style={style.card} activeOpacity={0.9} onPress={onPress}>
    <View style={styles.row}>
      <View style={style.imageContainer}>
        <Image source={{ uri: imageUrl }} style={style.image} />
      </View>
      <View>
        <Text style={style.name}>{name}</Text>
        <Text style={style.price}>{`S$${price}`}</Text>
        { lensPower != undefined && <Text style={style.option}>{`Lens Power: ${lensPower}`}</Text> }
        { color != undefined && <Text style={style.option}>{`Color: ${color}`}</Text> }
        { option != undefined && <Text style={style.option}>{`Option: ${option}`}</Text> }
      </View>
    </View>
    {
      hiddenItem > 0 && <Text style={style.moreItem}>{`You have ${hiddenItem} other items`}</Text>
    }
    <View style={styles.alignItemEnd}>
      <Text style={style.text}>{`Qty: ${quantity}`}</Text>
      <View style={styles.row}>
        <Text style={style.text}>{`Subtotal (${quantity} item)`}:</Text>
        <Text style={[style.price, styles.ml5]}>{`S$${subtotal}`}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={invoice}>
        <Text style={style.invoice}>Check Invoice</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D5D8DD',
    paddingBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 15
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    elevation: 7,
    marginRight: 10
  },
  image: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'center'
  },
  name: {
    fontFamily: 'OpenSans-Bold',
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12
  },
  option: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  invoice: {
    fontFamily: 'OpenSans-BoldItalic',
    fontSize: 12,
    color: colors.primary
  },
  moreItem: {
    textAlign: 'center',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D5D8DD',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D5D8DD',
    marginVertical: 10,
    fontSize: 12,
    color: colors.grey
  }
});

export default MyOrderCard;
