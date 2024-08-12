import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const AddressCard = ({ addressType, name, phone, address, addressDetail, postalCode, isDefault, onEdit }) => (
  <View style={style.card}>
    <View style={styles.p10}>
      <View style={[styles.row, styles.alignItemsCenter, styles.mb10]}>
        <Text style={[styles.bold, styles.dark, styles.f12]}>{addressType}</Text>
        { isDefault && <Text style={style.primary}>Primary</Text> }
      </View>
      <Text style={[styles.bold, styles.dark, styles.mb5]}>{name}</Text>
      <Text style={[styles.normal, styles.dark, styles.f12]}>{phone}</Text>
      <Text style={[styles.normal, styles.dark, styles.f12]}>{address}</Text>
      {
        addressDetail != null && (
          <Text style={[styles.normal, styles.dark, styles.f12]}>{addressDetail}</Text>
        )
      }
      <Text style={[styles.normal, styles.dark, styles.f12]}>{postalCode}</Text>
    </View>
    <TouchableOpacity style={[styles.mt20]} activeOpacity={0.9} onPress={onEdit}>
      <Text style={style.editBtn}>Edit Address</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary
  },
  editBtn: {
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    backgroundColor: colors.primary,
  },
  primary: {
    fontSize: 8,
    color: 'white',
    backgroundColor: colors.primary,
    marginLeft: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 2
  }
});

export default AddressCard;
