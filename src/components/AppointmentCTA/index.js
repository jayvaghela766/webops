import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const AppointmentCTA = ({ onPressBook, containerStyle }) => (
  <View style={[style.appointmentHeader, containerStyle]}>
    <Text style={style.appointmentHeadeText}>Appointments</Text>
    <TouchableOpacity style={style.bookButton} activeOpacity={0.9} onPress={onPressBook}>
      <Text style={[styles.textWhite, styles.bold, styles.bold]}>Book Now</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appointmentHeadeText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 5
  }
});

export default AppointmentCTA;