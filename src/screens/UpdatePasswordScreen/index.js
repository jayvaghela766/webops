import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { validate } from 'validate.js';
import MyTextInput from '../../components/MyTextInput';
import AuthContext from '../../context/AuthContext';
import User from '../../models/User';
import styles from '../../styles/styles';
import Features from '../../helper/Features';
import validation from './validation.json';
import Spinner from '../../hoc/Spinner';

const UpdatePasswordScreen = ({ navigation }) => {
  const { auth } = useContext(AuthContext);
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
      const data = {
        current_password: form.currentPassword,
        new_password: form.newPassword,
        confirm_password: form.confirmNewPassword
      };

      const response = await User.updatePassword(data);
      console.log(response);
      setIsLoading(false);
      Features.toast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        navigation.pop();
      }
      setErros({});
    }
  };

  return (
    <Spinner isLoading={isLoading} containerStyle={[styles.p20]}>
      <Text style={style.heading}>Change Password</Text>
      <MyTextInput
        label="Current Password"
        value={form.currentPassword}
        onChangeText={(value) => onChange('currentPassword', value)}
        errorMessage={errors.currentPassword}
        password
        togglePasswordVisibility
      />
      <MyTextInput
        label="New Password"
        value={form.newPassword}
        onChangeText={(value) => onChange('newPassword', value)}
        errorMessage={errors.newPassword}
        password
        togglePasswordVisibility
      />
      <MyTextInput
        label="Confirm New Password"
        value={form.confirmNewPassword}
        onChangeText={(value) => onChange('confirmNewPassword', value)}
        errorMessage={errors.confirmNewPassword}
        password
        togglePasswordVisibility
      />
      <TouchableOpacity style={[styles.mt10]} activeOpacity={0.9} onPress={() => navigation.pop()}>
        <Text style={[styles.btnPrimaryOutline, { fontFamily: 'OpenSans-Bold' }]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.mt10]} activeOpacity={0.9} onPress={save}>
        <Text style={[styles.btnPrimary, { fontFamily: 'OpenSans-Bold' }]}>Save</Text>
      </TouchableOpacity>
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

export default UpdatePasswordScreen;
