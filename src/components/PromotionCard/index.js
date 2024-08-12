import moment from 'moment';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const PromotionCard = ({ title, description, onPress, imageUrl, containerStyle, usedAt, isLast }) => (
  <View activeOpacity={0.9} style={[style.card, containerStyle, isLast ? { borderBottomWidth: 0, marginBottom: 150 } : {}]} onPress={onPress}>
    <View style={[styles.row, styles.mb20]}>
      <View style={[style.imageContainer]}>
        <Image source={{ uri: imageUrl }} style={style.image} />
      </View>
      <View style={[styles.ml20, styles.flex1]}>
        <Text style={[style.title]}>{title}</Text>
        <Text style={[style.description]}>{description.length <= 126 ? description : description.substr(0, 126) + '...'}</Text>
        { usedAt && <Text style={[style.title, styles.f16]}>{'Used on ' + moment(usedAt).utc().format('DD/MM/YYYY')}</Text> }
      </View>
    </View>
    {
      !usedAt && (
        <TouchableOpacity style={[style.button]} activeOpacity={0.9} onPress={onPress}>
          <Text style={[styles.bold, styles.f16, styles.textWhite]}>View This Voucher</Text>
        </TouchableOpacity>
      )
    }
  </View>
);

const style = StyleSheet.create({
  card: {
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 10
  },
  imageContainer: {
    elevation: 8,
    width: 100,
    height: 100
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: colors.dark
  },
  content: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
    fontWeight: '400',
    color: colors.dark
  },
  amount: {
    fontFamily: 'OpenSans-Bold',
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16
  },
  button: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10
  }
});

export default PromotionCard;