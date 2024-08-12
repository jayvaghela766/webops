import React from 'react';
import { View, Platform } from 'react-native';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import SettingArrow from '../../components/SettingArrow';

const MyAccountScreen = ({ navigation }) => {

  return (
    <NavigationHOC navigation={navigation} containerStyle={styles.p0}>
      <View style={[styles.ph15, Platform.OS === 'android' ? styles.pt15 : {}]}>
        <SettingArrow
          label="Personal Details"
          onPress={() => navigation.navigate('PersonalDetailScreen')}
          containerStyle={{ paddingTop: 0 }}
        />
        <SettingArrow
          label="Address Book"
          onPress={() => navigation.navigate('AddressScreen')}
        />
        <SettingArrow
          label="Payment Detail"
          onPress={() => navigation.navigate('PaymentScreen')}
        />
      </View>
    </NavigationHOC>
  );
};

export default MyAccountScreen;