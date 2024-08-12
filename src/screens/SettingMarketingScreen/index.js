import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from '../../styles/styles';
import AuthContext from '../../context/AuthContext';
import Features from '../../helper/Features';
import SettingToggle from '../../components/SettingToggle';
import Setting from '../../models/Setting';

const SettingMarketingScreen = ({ navigation }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [smsMarketing, setSmsMarketing] = useState(auth.user.marketing_email == '1');
  const [emailmarketing, setEmailMarketing] = useState(auth.user.marketing_sms == '1');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSmsMarketing(auth.user.marketing_sms == '1');
    setEmailMarketing(auth.user.marketing_email == '1');
  }, []);

  useEffect(() => {
    updateSetting();
  }, [smsMarketing, emailmarketing]);

  const updateSetting = async () => {
    const data = {
      marketing_sms: smsMarketing,
      marketing_email: emailmarketing
    };

    setIsLoading(true);
    const response = await Setting.updateMarketing(data);
    setIsLoading(false);
    if (response.success) {
      const updatedAuth = { ...auth };
      updatedAuth.user.marketing_sms = smsMarketing;
      updatedAuth.user.marketing_email = emailmarketing;
      setAuth(updatedAuth);
    } else {
      Features.toast(response.message, 'error');
    }
  };

  return (
    <View style={[styles.flex1]}>
      <Text style={[styles.heading, styles.mt5]}>Marketing Communications</Text>
      <View style={[styles.ph15]}>
        <Text style={style.subtitle}>I would like to receive marketing communications for:</Text>
        <SettingToggle
          label="SMS Marketing"
          enable={smsMarketing}
          onChange={setSmsMarketing}
          containerStyle={{
            borderTopColor: '#D5D8DD',
            borderTopWidth: StyleSheet.hairlineWidth
          }}
        />
        <SettingToggle
          label="Email Marketing"
          enable={emailmarketing}
          onChange={setEmailMarketing}
        />
      </View>
      <Text style={[styles.heading, styles.mt5]}>Contact Us</Text>
      <View style={[styles.ph15, styles.pv15]}>
        <Text style={[styles.normal, styles.f16, styles.dark, styles.mb10]}>
          {'Have a general question regarding order, shipping, exchange or returns? Try searching for your answers on our '}
          <Text style={[styles.bold, styles.f16, styles.dark, styles.underline]} onPress={() => navigation.navigate('FaqScreen')}>Frequently Asked Questions.</Text>
        </Text>
        <Text style={[styles.normal, styles.f16, styles.dark]}>
          {'If you are unable to locate your answers, do feel free to reach us through our '}
          <Text style={[styles.bold, styles.f16, styles.dark, styles.underline]} onPress={() => navigation.navigate('ContactUsScreen')}>contact form</Text>
          {'.We will respond to your enquiry or feedback as soon as we can.'}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  subtitle: {
    fontFamily: 'OpenSans-Italic',
    fontWeight: '400',
    paddingVertical: 10
  }
})

export default SettingMarketingScreen;