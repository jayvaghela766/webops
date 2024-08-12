import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const TrackCircle = ({ label, number, date, selected, containerStyle }) => (
  <View style={[styles.row, styles.alignItemsCenter, containerStyle]}>
    <View style={[styles.row, styles.flex1]}>
      <View style={style.circle(selected)}>
        <Text style={style.circleText(selected)}>{number}</Text>
      </View>
      <Text style={style.statusText(selected)}>{label}</Text>
    </View>
    <View style={[styles.flex1]}>
      <Text style={[style.labelSemiBold, styles.textRight]}>{date}</Text>
    </View>
  </View>
);

const style = StyleSheet.create({
  labelSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
    color: colors.dark,
    fontSize: 16
  },
  circle: (selected) => ({
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: selected ? colors.primary : '#cacaca',
    marginRight: 15
  }),
  circleText: (selected) => ({
    fontFamily: 'OpenSans-Bold',
    fontSize: 26,
    color: selected ? colors.primary : '#cacaca'
  }),
  statusText: (selected) => ({
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: selected ? colors.primary : '#cacaca'
  })
});


export default TrackCircle;