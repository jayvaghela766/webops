import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MainNavigationHeader = ({ navigation }) => (
  <View style={[style.headerContainer]}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Icon name="menu-outline" size={24} />
    </TouchableOpacity>
    <Image source={require('../../../assets/images/logo.png')} style={style.logo} />
    <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
      <Icon name="cart-outline" size={24} />
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 8,
    paddingVertical: 12
  },
  logo: {
    width: 40,
    height: 40
  },
});

export default MainNavigationHeader;