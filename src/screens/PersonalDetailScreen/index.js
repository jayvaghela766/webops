import moment from 'moment';
import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InformationCard from '../../components/InfomationCard';
import NavigationHOC from '../../hoc/NavigationHOC';
import colors from '../../config/colors';
import AuthContext from '../../context/AuthContext';
import styles from '../../styles/styles';
import HeaderTab from '../../components/HeaderTab';
import { useFocusEffect } from '@react-navigation/native';
import Address from '../../models/Address';
import Storage from '../../helper/Storage';
import AddressInformationCard from '../../components/AddressInformationCard';
import User from '../../models/User';

const TABS = [
  {
    label: 'Personal Details',
    value: 'personal'
  },
  {
    label: 'Address Book',
    value: 'address'
  }
];

const PersonalDetailScreen = ({ navigation }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [tab, onTab] = useState(TABS[0].value);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchMyAddresses();

      console.log('aaa', auth.user);
    }, [])
  );

  const fetchMyAddresses = async () => {
    try {
      const addresses = await Address.mine();
      const currentAuth = {
        ...auth,
        ...addresses
      };

      const billing = currentAuth.addresses.filter((item) => parseInt(item.address_type_id) === 1);
      const shipping = currentAuth.addresses.filter((item) => parseInt(item.address_type_id) === 2);

      setBillingAddresses(billing);
      setShippingAddresses(shipping);

      setAuth(currentAuth);
      await Storage.set('user', currentAuth);
    } catch (error) {
      console.log('error fetchMyAddresses', error);
    }
  };

  const personalDetails = [
    {
      label: 'Full Name',
      value: auth.user.name
    },
    {
      label: 'Email Address',
      value: auth.user.email
    },
    {
      label: 'Mobile Number',
      value: auth.user.phone
    },
    {
      label: 'Gender',
      value: auth.user.gender
    },
    {
      label: 'Birthday',
      value: auth.user.birthday ? moment(auth.user.birthday).format('MMM DD YYYY') : 'No Information'
    },
  ];

  const onRequestAccountDeletion = () => {
    Alert.alert('Confirmation', 'Do you want to request for account deletion?', [
      {
        text: 'Yes',
        onPress: async () => {
          const response = await User.accountDeletion();
          if (response?.success) {
            Alert.alert('Requested', response.message);
          }
        },
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      }
    ]);
  }

  return (
    <NavigationHOC navigation={navigation}>
      <Text style={style.heading}>Account</Text>
      <HeaderTab tabs={TABS} onPress={onTab} selected={tab} containerStyle={styles.mb10} />
      {
        tab === 'personal' && (
          <>
            <View style={[styles.row]}>
              <InformationCard data={personalDetails} containerStyle={styles.flex3} />
              <TouchableOpacity
                style={[styles.ml10, styles.flex1]}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('UpdatePersonalDetailsScreen')}
              >
                <Text style={style.btnEdit}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.mt20]} activeOpacity={0.9} onPress={() => navigation.navigate('UpdatePasswordScreen')}>
              <Text style={style.changePassword}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mt10, { paddingBottom: 80 }]} activeOpacity={0.9} onPress={onRequestAccountDeletion}>
              <Text style={[style.changePassword, { color: colors.red, borderColor: colors.red }]}>Request for Account Deletion</Text>
            </TouchableOpacity>
          </>
        )
      }
      {
        tab === 'address' && (
          <View style={[styles.mb30]}>
            <Text style={[styles.semiBold, styles.f20, styles.mb10]}>Billing Address</Text>
            {
              billingAddresses.map((address) => (
                <View style={[styles.row, styles.mb10]} key={`billingAddresses-${address.id}`}>
                  <AddressInformationCard
                    name={`${address.first_name} ${address.last_name}`}
                    address={address.address}
                    phoneNumber={address.phone}
                    containerStyle={styles.flex3}
                  />
                  <TouchableOpacity
                    style={[styles.ml10, styles.flex1]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('EditAddressScreen', { address })}
                  >
                    <Text style={style.btnEdit}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
            <View style={[styles.row, styles.alignItemsCenter, styles.mt20, styles.mb20]}>
              <Text style={[styles.semiBold, styles.f20, styles.mb10, styles.flex1]}>Shipping Address</Text>
              <TouchableOpacity style={[styles.flex1]} activeOpacity={0.9} onPress={() => navigation.navigate('AddAddressScreen')}>
                <Text style={style.changePassword}>{'+ Add New Address'}</Text>
              </TouchableOpacity>
            </View>
            {
              shippingAddresses.map((address) => (
                <View style={[styles.row, styles.mb10]} key={`shippingAddresses-${address.id}`}>
                  <AddressInformationCard
                    name={`${address.first_name} ${address.last_name}`}
                    address={address.address}
                    phoneNumber={address.phone}
                    containerStyle={styles.flex3}
                  />
                  <TouchableOpacity
                    style={[styles.ml10, styles.flex1]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('EditAddressScreen', { address })}
                  >
                    <Text style={style.btnEdit}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        )
      }
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20
  },
  changePassword: {
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold'
  },
  btnEdit: {
    color: 'white',
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    overflow: 'hidden',
  }
});

export default PersonalDetailScreen;