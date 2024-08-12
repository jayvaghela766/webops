import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../../styles/styles';

const IntroLoginScreen = ({ navigation }) => {

  return (
    <View style={style.container}>
      <View style={[styles.flex1, styles.alignItemsCenter]}>
        <Image source={require('../../../assets/images/logo.png')} style={style.logo} />
        <Image source={require('../../../assets/images/onboarding-2.png')} />
      </View>
      <View style={style.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.bgWhite]} activeOpacity={0.9} onPress={() => navigation.navigate('LoginScreen') }>
          <Text style={[styles.buttonLabel, styles.textPrimary]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.bgPrimary]} activeOpacity={0.9} onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={[styles.buttonLabel, styles.textWhite]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 80,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  }
});

export default IntroLoginScreen;