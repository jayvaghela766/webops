import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const EmptyAppointment = ({ name, email, onBook, onShowAll, disableShowAll }) => (
  <>
    <View style={[style.appointmentHeader]}>
      <Text style={style.appointmentHeadeText}>Appointments</Text>
    </View>
    <View style={[style.bookUser]}>
      <View style={[styles.flex1]}>
        <View style={styles.mb10}>
          <Text style={style.bookLabel}>Name</Text>
          <Text style={style.bookValue}>{name}</Text>
        </View>
      </View>
      <View style={[styles.flex1]}>
        <View style={styles.mb10}>
          <Text style={style.bookLabel}>Email Address</Text>
          <Text style={style.bookValue}>{email}</Text>
        </View>
      </View>
    </View>
    <View style={[styles.m15, styles.mb0]}>
      <TouchableOpacity style={[style.bookButton, styles.bgPrimary]} activeOpacity={0.9} onPress={onBook}>
        <Text style={style.bookText}>Book An Appointment</Text>
      </TouchableOpacity>
      {
        !disableShowAll && (
          <TouchableOpacity activeOpacity={0.9} onPress={onShowAll}>
            <Text style={styles.allLink}>{'See more Appointments >>'}</Text>
          </TouchableOpacity>
        )
      }
    </View>
  </>
);

EmptyAppointment.defaultProps = {
  name: '',
  email: '',
  onBook: () => null,
  onShowAll: () => null,
};

const style = StyleSheet.create({
  appointmentHeader: {
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  appointmentHeadeText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
  },
  bookText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center'
  },
  bookButton: {
    borderRadius: 5,
  },
  logo: {
    width: 50,
    height: 50
  },
  bookInfo: {
    backgroundColor: colors.primary,
    padding: 20
  },
  bookInfoText: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'OpenSans-Light',
    textAlign: 'right'
  },
  bookInfoTextSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#FA5E6c',
    fontSize: 10,
    textAlign: 'right'
  },
  bookInfoTextBold: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    textAlign: 'right'
  },
  bookLabel: {
    fontFamily: 'OpenSans-Bold',
  },
  bookValue: {
    fontFamily: 'OpenSans-Regular',
  },
  bookUser: {
    flexDirection: 'row',
    backgroundColor: '#DFF8FF',
    padding: 20,
  }
});

export default EmptyAppointment;