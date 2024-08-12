import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../../styles/styles';

const intro = {
  title: '',
  text: 'A new way to view, schedule and manage your eye care appointments',
  subtitle: 'Get reminded on upcoming payments. View all your spending, appointment bookings and promotions in one place.',
  logo: require('../../../assets/images/logo.png'),
  image: require('../../../assets/images/onboarding-1.png'),
  backgroundColor: '#fff',
};

const IntroScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={style.slide}>
        <Image source={intro.logo} style={style.logo} />
        <Image source={intro.image} style={styles.mb20} />
        <Text style={style.heading}>{intro.text}</Text>
        <Text style={style.subtitle}>{intro.subtitle}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('IntroLoginScreen') }>
          <Text style={styles.link}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 40
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 14,
  },
  subtitle: {
    color: '#8B8B8B',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
  }
});

export default IntroScreen;
