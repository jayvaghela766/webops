import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { validate } from 'validate.js';
import MyDatePickerInput from '../../components/MyDatePickerInput';
import MyPickerInput from '../../components/MyPickerInput';
import MyTextInput from '../../components/MyTextInput';
import AuthContext from '../../context/AuthContext';
import User from '../../models/User';
import styles from '../../styles/styles';
import Features from '../../helper/Features';
import validation from './validation.json';
import Spinner from '../../hoc/Spinner';
import Storage from '../../helper/Storage';

const GENDER = [
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Female',
    value: 'female'
  }
]

const UpdatePersonalDetailsScreen = ({ navigation }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForm({ ...auth.user });
  }, []);

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const save = async () => {
    const errors = validate(form, validation);
    if (errors !== undefined) {
      setErros(errors);
    } else {
      setIsLoading(true);
      const data = {...form};
      data.birthday = moment(data.birthday).format('YYYY-MM-DD');
      const response = await User.update(auth.user.id, data);
      setIsLoading(false);
      Features.toast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        const currentAuth = { ...auth };
        currentAuth.user.name = form.name;
        currentAuth.user.email = form.email;
        currentAuth.user.phone = form.phone;
        currentAuth.user.birthday = form.birthday;
        currentAuth.user.gender = form.gender;

        setAuth(currentAuth);
        await Storage.set('user', currentAuth);
      }
      setErros({});
    }
  };

  return (
    <Spinner isLoading={isLoading} containerStyle={[styles.p20]}>
      <Text style={style.heading}>Edit Personal Details</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyTextInput
          label="Full Name"
          value={form.name}
          onChangeText={(value) => onChange('name', value)}
          errorMessage={errors.name}
        />
        <MyTextInput
          label="Email"
          value={form.email}
          onChangeText={(value) => onChange('email', value)}
          errorMessage={errors.email}
          keyboardType="email-address"
        />
        <MyTextInput
          label="Contact Number"
          value={form.phone}
          onChangeText={(value) => onChange('phone', value)}
          errorMessage={errors.phone}
          keyboardType="number-pad"
        />
        <MyPickerInput
          label="Gender"
          data={GENDER}
          value={form.gender}
          onValueChange={(value) => onChange('gender', value)}
          containerStyle={[styles.mb20]}
          errorMessage={errors.gender}
        />
        <MyDatePickerInput
          label="Birthday"
          value={form.birthday ? moment(form.birthday).toDate() : null}
          onChangeValue={(value) => onChange('birthday', value)}
          errorMessage={errors.birthday}
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

export default UpdatePersonalDetailsScreen;
