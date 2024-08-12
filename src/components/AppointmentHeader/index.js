import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const AppointmentHeader = ({
  name,
  email,
  relationship,
  store,
  storeAddress,
  date,
  remarks,
  startAt,
  endAt,
  status,
  onBook,
  onShowAll,
  disableHeaderTitle,
  disableButtons
}) => (
  <>
    {
      !disableHeaderTitle && (
        <View style={[style.appointmentHeader]}>
          <Text style={style.appointmentHeadeText}>Appointments</Text>
        </View>
      )
    }
    <View style={style.bookInfo}>
      <View style={style.address}>
        <Image source={require('../../../assets/images/logo-bg-white.png')} style={style.logo} />
        <View style={styles.ml10}>
          <Text style={[style.addressTextBold]}>{store}</Text>
          <Text style={[style.addressText]}>{storeAddress}</Text>
        </View>
      </View>
      <View style={[styles.alignSelfEnd, styles.mt10]}>
        <Text style={style.bookInfoTextBold}>{date}</Text>
        <Text style={style.bookInfoText}>{`${startAt} - ${endAt}`}</Text>
        <Text style={style.bookInfoTextSemiBold}>{status}</Text>
      </View>
    </View>
    <View style={[style.bookUser]}>
      <View style={[styles.flex1]}>
        <View style={styles.mb10}>
          <Text style={style.bookLabel}>Name</Text>
          <Text style={style.bookValue}>{name}</Text>
        </View>
        <View>
          <Text style={style.bookLabel}>Relationship</Text>
          <Text style={style.bookValue}>{relationship}</Text>
        </View>
      </View>
      <View style={[styles.flex1]}>
        <View style={styles.mb10}>
          <Text style={style.bookLabel}>Email Address</Text>
          <Text style={style.bookValue}>{email}</Text>
        </View>
        <View>
          <Text style={style.bookLabel}>Remarks</Text>
          <Text style={style.bookValue}>{remarks}</Text>
        </View>
      </View>
    </View>
    {
      !disableButtons && (
        <View style={[styles.m15, styles.mb0]}>
          <TouchableOpacity style={[style.bookButton, styles.bgPrimary]} activeOpacity={0.9} onPress={onBook}>
            <Text style={style.bookText}>Book An Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={onShowAll}>
            <Text style={styles.allLink}>{'See more Appointments >>'}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  </>
);

AppointmentHeader.defaultProps = {
  name: '',
  relationship: '',
  email: '',
  remarks: '',
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
  addressText: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    width: '65%'
  },
  addressTextBold: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    fontSize: 16
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center'
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

export default AppointmentHeader;