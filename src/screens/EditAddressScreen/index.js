import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { validate } from 'validate.js';
import MyTextInput from '../../components/MyTextInput';
import Spinner from '../../hoc/Spinner';
import Address from '../../models/Address';
import AuthContext from '../../context/AuthContext';
import Features from '../../helper/Features';
import styles from '../../styles/styles';
import validations from './validations.json';

const EditAddressScreen = ({ navigation, route }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.9} onPress={onDelete}>
          <Text style={[styles.headerRightBtnText, styles.textRed]}>Delete</Text>
        </TouchableOpacity>
      ),
    });
  }, [])

  useEffect(() => {
    if (route.params?.address) {
      setForm(route.params?.address);
    }
  }, [route.params?.address]);

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const onDelete = () => {
    Alert.alert('Confirmation', 'Delete this address?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: deleteAddress
      },
    ])
  };

  const deleteAddress = async () => {
    const response = await Address.destroy(route.params?.address.id);
    if (response.success) {
      navigation.pop();
    }
  }

  const save = async () => {
    const errors = validate(form, validations);
    if (errors !== undefined) {
      setErrors(errors);
    } else {
      setIsLoading(true);
      const response = await Address.update(form.id, form);
      Features.toast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        const addresses = response.data;
        setAuth({
          ...auth,
          addresses
        });

        navigation.pop();
      }
      setIsLoading(false);
      setErrors({})
    }
  };

  return (
    <Spinner isLoading={isLoading} containerStyle={styles.p20}>
      <Text style={style.heading}>Edit New Address</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyTextInput
          label="First Name"
          value={form.first_name}
          onChangeText={(value) => onChange('first_name', value)}
          errorMessage={errors.first_name}
        />
        <MyTextInput
          label="Last Name"
          value={form.last_name}
          onChangeText={(value) => onChange('last_name', value)}
          errorMessage={errors.last_name}
        />
        <MyTextInput
          label="Phone"
          value={form.phone}
          onChangeText={(value) => onChange('phone', value)}
          errorMessage={errors.phone}
          keyboardType="number-pad"
        />
        <MyTextInput
          label="Address"
          value={form.address}
          onChangeText={(value) => onChange('address', value)}
          errorMessage={errors.address}
        />
        <MyTextInput
          label="Postal Code"
          value={form.postal_code}
          onChangeText={(value) => onChange('postal_code', value)}
          errorMessage={errors.postal_code}
          keyboardType="number-pad"
        />
        <TouchableOpacity style={[styles.mt10]} activeOpacity={0.9} onPress={() => navigation.pop()}>
          <Text style={[styles.btnPrimaryOutline, { fontFamily: 'OpenSans-Bold' }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.mt10]} activeOpacity={0.9} onPress={save}>
          <Text style={[styles.btnPrimary, { fontFamily: 'OpenSans-Bold' }]}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </Spinner>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginBottom: 20
  },
});

export default EditAddressScreen;