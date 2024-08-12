import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const AddressInformationCard = ({ name, address, phoneNumber, containerStyle }) => (
  <View style={[style.container, containerStyle]}>
    <View style={[styles.mb10]}>
      <Text style={style.label}>Full Name</Text>
      <Text style={style.value}>{name}</Text>
    </View>
    <View style={[styles.mb10]}>
      <Text style={style.label}>Address</Text>
      <Text style={style.value}>{address}</Text>
    </View>
    <View style={[styles.mb10]}>
      <Text style={style.label}>Mobile Number</Text>
      <Text style={style.value}>{phoneNumber}</Text>
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    padding: 20
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    color: colors.dark,
    fontSize: 14,
    marginBottom: 5
  },
  value: {
    fontFamily: 'OpenSans-Bold',
    color: colors.dark,
    fontSize: 14,
    marginLeft: 10
  }
});

AddressInformationCard.defaultProps = {
  data: []
};

export default AddressInformationCard;
