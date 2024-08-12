import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../../config/colors';
import styles from '../../../styles/styles';

const Header = ({ stepNumber, logoContainer, headerContainer }) => (
  <View style={[style.header, headerContainer]}>
    <View style={[style.logoContainer, logoContainer]}>
      <Image source={require('../../../../assets/images/logo.png')} style={style.logo} />
    </View>
    {/* <View style={[style.stepContainer]}>
      <View style={[style.stepNumber, stepNumber >= 1 ? style.stepActive : {}, styles.mh20]}>
        <Text style={[styles.bold, styles.f12, styles.textWhite]}>1</Text>
      </View>
      <View style={[style.stepNumber, stepNumber >= 2 ? style.stepActive : {}, styles.mr20]}>
        <Text style={[styles.bold, styles.f12, styles.textWhite]}>2</Text>
      </View>
      <View style={[style.stepNumber, stepNumber >= 3 ? style.stepActive : {}, styles.mr20]}>
        <Text style={[styles.bold, styles.f12, styles.textWhite]}>3</Text>
      </View>
    </View> */}
  </View>
);


const style = StyleSheet.create({
  logoContainer: {
    width: 100,
    height: 100,
  },
  logo: {
    width: null,
    height: null,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    marginBottom: 20
  },
  stepContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8'
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
})


export default Header;
