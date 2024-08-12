import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';
import styles from '../../styles/styles';
import colors from '../../config/colors';

const { width: screenWidth } = Dimensions.get('window');

const AppointmentCard = ({ status, store, date, startAt, endAt, onPressDetail }) => (
  <View style={style.container}>
    { status === 'pending' && <View style={style.overlayPending} /> }
    { status === 'past' && <View style={style.overlayPast} /> }
    <Image
      source={require('../../../assets/images/appointment-bg-wide.png')}
      style={style.image}
    />
    <View style={[styles.row, { zIndex: 2 }]}>
      <View style={style.logoContainer}>
        <Image source={require('../../../assets/images/logo.png')} style={style.logo} />
      </View>
      <View style={[styles.flex3]}>
        <Text style={[style.store, status === 'pending' ? { color: colors.dark } : {}]}>{store}</Text>
        <Text style={[styles.textWhite, status === 'pending' ? { color: colors.dark } : {}, styles.normal]}>{moment(date).format('DD MMMM YYYY')}</Text>
        <Text style={[styles.textWhite, status === 'pending' ? { color: colors.dark } : {}, styles.normal]}>{`${moment(startAt, 'HH:mm:ss').format('hh:mm A')} - ${moment(endAt, 'HH:mm:ss').format('hh:mm A')}`}</Text>
        {/* <Text style={[styles.textWhite, styles.normal]}>Room 2A</Text> */}
      </View>
      <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end' }} onPress={onPressDetail} activeOpacity={0.9}>
        <Text style={[styles.textWhite, styles.bold, styles.f16, status === 'pending' ? { color: colors.dark } : {}]}>Details</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 130,
    padding: 15,
    justifyContent: 'center'
  },
  overlayPending: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(223, 248, 255, 0.8)',
    zIndex: 1
  },
  overlayPast: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(178, 178, 178, 0.5)',
    zIndex: 1
  },
  image: {
    width: screenWidth,
    height: 130,
    position: 'absolute',
    top: 0,
    left: 0
  },
  body: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  store: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#fff'
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoContainer: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 20
  }
});

export default AppointmentCard;