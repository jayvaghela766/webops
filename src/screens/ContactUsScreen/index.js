import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import validate from 'validate.js';
import NavigationHOC from '../../hoc/NavigationHOC';
import MyPickerInput from '../../components/MyPickerInput';
import MyTextInput from '../../components/MyTextInput';
import MyTextareaInput from '../../components/MyTextareaInput';
import Features from '../../helper/Features';
import Request from '../../helper/Request';
import styles from '../../styles/styles';
import style from '../../styles/appointment';
import validation from './validation.json';
import { objectsEmptyStringToUndefined } from '../../helper/Utils';
import api from '../../config/api';

const ContactUsScreen = ({ navigation, route }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGeneralEnquiry();
  }, []);

  const fetchGeneralEnquiry = async () => {
    const response = await Request.backend('GET', api.GET_GENERAL_ENQUIRY);
    const enquiries = response.map((item) => ({ label: item.name, value: item.id.toString() }));
    setEnquiries(enquiries);
  };

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const onSubmit = async () => {
    const errors = validate(objectsEmptyStringToUndefined(form), validation);
    if (errors !== undefined) {
      setErrors(errors);
    } else {
      setErrors({});
      const data = {
        general_enquiry_id: form.enquiry,
        name: form.name,
        email: form.email,
        phone_number: form.phoneNumber,
        remarks: form.remarks
      };

      setIsLoading(true);
      const response = await Request.backend('POST', api.STORE_MESSAGE, data);
      setIsLoading(false);
      if (response.success) {
        navigation.navigate('HomeScreen');
        Features.toast('Your message has been sent', 'success');
      } else {
        Features.toast('Internal server error', 'error');
      }
    }
  };

  return (
    <NavigationHOC navigation={navigation} containerStyle={[styles.p0]} isLoading={isLoading}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.ph15]}>
          <Text style={[styles.bold, styles.f20, styles.dark]}>Contact Us</Text>
          <Text style={[styles.italic, styles.f14, styles.fw400, styles.dark]}>For any enquiries, you may leave your contact details with us below.</Text>
        </View>
        <View style={[styles.p20]}>
          <MyPickerInput
            data={enquiries}
            label="General Enquiry"
            value={form.enquiry}
            onValueChange={(value) => onChange('enquiry', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.enquiry}
          />
          <MyTextInput
            label="Name"
            value={form.name}
            onChangeText={(value) => onChange('name', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.name}
          />
          <MyTextInput
            label="Email"
            value={form.email}
            onChangeText={(value) => onChange('email', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.email}
            keyboardType="email-address"
          />
          <MyTextInput
            label="Mobile Number"
            value={form.phoneNumber}
            onChangeText={(value) => onChange('phoneNumber', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.phoneNumber}
            keyboardType="phone-pad"
          />
          <MyTextareaInput
            label="Remarks"
            value={form.remarks}
            onChangeText={(value) => onChange('remarks', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.remarks}
          />
          <View style={[styles.mb30]}>
            <TouchableOpacity style={[style.button, styles.bgPrimary, styles.ml0]} activeOpacity={0.9} onPress={onSubmit}>
              <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter, styles.f16]}>Send Enquiry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </NavigationHOC>
  );
};

export default ContactUsScreen;