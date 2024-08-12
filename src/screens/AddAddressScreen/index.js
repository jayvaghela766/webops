import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { validate } from 'validate.js';
import MyTextInput from '../../components/MyTextInput';
import Spinner from '../../hoc/Spinner';
import Address from '../../models/Address';
import AuthContext from '../../context/AuthContext';
import Features from '../../helper/Features';
import styles from '../../styles/styles';
import validation from './validation.json';
import MyPickerInput from '../../components/MyPickerInput';

const AddAddressScreen = ({ navigation }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const save = async () => {
    const errors = validate(form, validation);
    if (errors !== undefined) {
      setErrors(errors);
    } else {
      setIsLoading(true);
      const response = await Address.store(form);
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
      <Text style={style.heading}>Add New Address</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyPickerInput
          label="Address Type"
          data={Address.ADDRESS_TYPES}
          onValueChange={(value) => onChange('address_type_id', value)}
          value={form.address_type_id}
          errorMessage={errors.address_type_id}
          containerStyle={[styles.mb20]}
        />
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

export default AddAddressScreen;