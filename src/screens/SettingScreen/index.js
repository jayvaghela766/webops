import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import SettingToggle from '../../components/SettingToggle';
import SettingArrow from '../../components/SettingArrow';
import AuthContext from '../../context/AuthContext';
import Request from '../../helper/Request';
import api from '../../config/api';
import { useFocusEffect } from '@react-navigation/native';
import Storage from '../../helper/Storage';
import colors from '../../config/colors';
import { version } from '../../../package.json';
import moment from 'moment';

const SettingScreen = ({ navigation }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [notifications, setNotifications] = useState({
    appointment: true,
    eWallet: true,
    order: true,
  });

  useFocusEffect(useCallback(() => {
    setNotifications({
      appointment: auth.user.notification_appointment == '1',
      eWallet: auth.user.notification_promotion == '1',
      order: auth.user.notification_order == '1',
    });
  }, []))

  const onChangeNotification = async (key, value) => {
    const input = {...notifications};
    input[key] = value;
    setNotifications(input);

    const data = {
      notification_appointment: input.appointment,
      notification_promotion: input.eWallet,
      notification_order: input.order
    };

    const response = await Request.backend('POST', api.UPDATE_NOTIFICATION, data);
    if (response.success) {
      const updatedAuth = { ...auth };
      updatedAuth.user.notification_appointment = input.appointment;
      updatedAuth.user.notification_promotion = input.eWallet;
      updatedAuth.user.notification_order = input.order;
      setAuth(updatedAuth);
      await Storage.set('user', updatedAuth);
    } else {
      Features.toast(response.message, 'error');
    }
  };

  return (
    <NavigationHOC navigation={navigation} containerStyle={styles.p0}>
      <Text style={[styles.bold, styles.f20, styles.dark, styles.ph15, styles.mb5, Platform.OS === 'android' ? styles.pt15 : {}]}>Settings</Text>
      <Text style={[styles.heading, styles.mt5]}>Notifications</Text>
      <View style={[styles.ph15]}>
        <SettingToggle
          label="My Appointment"
          enable={notifications.appointment}
          onChange={(value) => onChangeNotification('appointment', value)}
        />
        <SettingToggle
          label="E-Wallet"
          enable={notifications.eWallet}
          onChange={(value) => onChangeNotification('eWallet', value)}
        />
        <SettingToggle
          label="Orders"
          enable={notifications.order}
          onChange={(value) => onChangeNotification('order', value)}
        />
      </View>
      <Text style={[styles.heading]}>Communication Preferences</Text>
      <View style={[styles.ph15]}>
        <SettingArrow
          label="Marketing Communications"
          onPress={() => navigation.navigate('SettingMarketingScreen')}
        />
      </View>
      <Text style={[styles.heading]}>About W OPTICS App</Text>
      <View style={[styles.ph15]}>
        <SettingArrow
          label="Terms and Conditions"
          onPress={() => navigation.navigate('TermsAndConditionScreen')}
        />
        <SettingArrow
          label="Data Protection Policy"
          onPress={() => navigation.navigate('DataProtectionPolicyScreen')}
        />
        <SettingArrow
          label="Return Policy"
          onPress={() => navigation.navigate('ReturnPolicyScreen')}
        />
      </View>
      <Text style={[style.version, styles.mb30]}>{`© W OPTICS ${moment().format('YYYY')}. All rights reserved. App Version ${version}`}</Text>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  version: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 10,
    color: colors.dark,
    textAlign: 'center',
    width: '50%',
    alignSelf: 'center',
    marginTop: 20
  }
});

export default SettingScreen;