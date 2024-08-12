import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const InformationCard = ({ data, containerStyle }) => (
  <View style={[style.container, containerStyle]}>
    {
      data.map((item) => (
        <View style={[styles.mb10]} key={item.label + item.value}>
          <Text style={style.label}>{item.label}</Text>
          <Text style={style.value}>{item.value}</Text>
        </View>
      ))
    }
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

InformationCard.defaultProps = {
  data: []
};

export default InformationCard;
