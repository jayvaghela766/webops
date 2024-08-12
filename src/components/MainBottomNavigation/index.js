import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import HomeIcon from '../../../assets/icons/home.svg';
import ShopIcon from '../../../assets/icons/shop.svg';
import MyWalletIcon from '../../../assets/icons/my-wallet.svg';
import MyAppointment from '../../../assets/icons/my-appointments.svg';
import { scale } from '../../helper/Utils';

const MainBottomNavigation = ({ navigation }) => (
  <View style={[style.container, Platform.OS === 'ios' ? { paddingBottom: 20, paddingVertical: 15 } : {}]}>
    <TouchableOpacity style={style.link} onPress={() => navigation.navigate('HomeScreen')}>
      <HomeIcon width={24} />
      <Text style={style.label}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.link} onPress={() => navigation.navigate('ShopScreen')}>
      <ShopIcon width={24} />
      <Text style={style.label}>E-Shop</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.link} onPress={() => navigation.navigate('MyAppointmentScreen')}>
      <MyAppointment width={24} />
      <Text style={style.label}>Appointments</Text>
    </TouchableOpacity>
    <TouchableOpacity style={style.link} onPress={() => navigation.navigate('PromotionWalletScreen')}>
      <MyWalletIcon width={24} />
      <Text style={style.label}>E-Wallet</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 5,
    elevation: 8,
    borderTopColor: '#cfcfcf',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  link: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5
  },
  label: {
    fontSize: scale(9),
    marginTop: 5,
    fontFamily: 'OpenSans-Regular'
  }
});

export default MainBottomNavigation;
