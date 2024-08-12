import React, { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validate from 'validate.js';
import NavigationHOC from '../../hoc/NavigationHOC';
import MyPickerInput from '../../components/MyPickerInput';
import MyDatePickerInput from '../../components/MyDatePickerInput';
import MyTextareaInput from '../../components/MyTextareaInput';
import Appointment from '../../models/Appointment';
import AuthContext from '../../context/AuthContext';
import Features from '../../helper/Features';
import styles from '../../styles/styles';
import style from '../../styles/appointment';
import validation from './validation.json';
import moment from 'moment';

const { height: windowHeight } = Dimensions.get('window');

const AddAppointmentScreen = ({ navigation, route }) => {
  const { auth } = useContext(AuthContext);
  const [enquiries, setEnquiries] = useState([]);
  const [stores, setStores] = useState([]);
  const [times, setTimes] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [response, setResponse] = useState({});
  const [isReschedule, setIsReschedule] = useState(false);

  useEffect(() => {
    fetchEnquiry();
  }, []);

  useEffect(() => {
    if (route.params?.orderCode) {
      setOrderCode(route.params.orderCode);
    }
  }, [route.params]);

  useEffect(() => {
    if (route.params?.form && enquiries.length) {
      setIsReschedule(route.params.form.isReschedule);

      // not sure why picker on ios is not pre-selected (in this case the store data)
      const form = {
        id: route.params.form.id,
        enquiry: Platform.OS === 'android' ? route.params.form.appointment_type_id : '',
        store: Platform.OS === 'android' ? route.params.form.appointment_type_time.store.id.toString() : '',
        preferredDate: moment(route.params.form.preferred_date).format('YYYY-MM-DD'),
        time: route.params.form.appointment_type_time_id,
        saluation: route.params.form.saluation,
        remarks: route.params.form.remarks
      };

      setForm(form);
    }
  }, [route.params, enquiries]);

  useEffect(() => {
    if (form.enquiry) {
      fetchStores();
    }
  }, [form.enquiry]);

  useEffect(() => {
    fetchTimes();
  }, [form.preferredDate]);

  const fetchEnquiry = async () => {
    setIsLoading(true);
    const data = await Appointment.getEnquiryList();
    setIsLoading(false);
    const enquiries = data.map((enquiry) => ({
      ...enquiry,
      label: enquiry.name,
      value: enquiry.id.toString()
    }));
    setEnquiries(enquiries);
  };

  const fetchStores = async () => {
    setIsLoading(true);
    const data = await Appointment.getEnquiryList({ appointment_type_id: form.enquiry });
    if (data.length) {
      const stores = data[0]
        .stores
        .filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i) // remove duplicate store
        .map((store) => ({
          ...store,
          label: store.name,
          value: store.id.toString()
      }));
      setStores(stores);
    } else {
      setStores([]);
    }
    setIsLoading(false);
  };

  const fetchTimes = async () => {
    if (!form.enquiry) {
      // Features.toast('Please select enquiry first', 'error');
      return;
    }

    if (!form.store) {
      // Features.toast('Please select enquiry first', 'error');
      return;
    }

    const data = {
      date: form.preferredDate,
      appointment_type_id: form.enquiry
    };

    setIsLoading(true);
    const response = await Appointment.getAvailability(data);
    setIsLoading(false);

    if (!response.success || !response?.data.available) {
      setTimes([]);
      Features.toast(response.message);
      return;
    }

    if (response?.data.times.length) {
      let times = response.data.times;
      times = times
        .filter(({ store_id }) => parseInt(store_id) === parseInt(form.store))
        .map((time) => {
          const start = moment(time.start_at, 'HH:mm:ss').format('HH:mm');
          const end = moment(time.end_at, 'HH:mm:ss').format('HH:mm');
          return {
            ...time,
            value: time.id.toString(),
            label: `${start} - ${end}`
          }
        });
      setTimes(times);
    } else {
      setTimes([]);
    }
  };

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;

    if (key === 'enquiry') {
      setStores([]);
      setTimes([]);
      input.store = '';
      input.preferredDate = null;
      input.time = '';
    } else if (key === 'store') {
      setTimes([]);
      input.preferredDate = null;
      input.time = '';

      let store = stores.filter(({ id }) => parseInt(id) === parseInt(value));
      if (store.length) {
        input.storeName = store[0].name;
        input.storeAddress = store[0].address;
      }
    } else if (key === 'time') {
      let time = times.filter(({ id }) => parseInt(id) === parseInt(value));
      if (time.length) {
        input.timeRange = time[0].start_at + ' - ' + time[0].end_at;
      }
    }

    setForm(input);
  };

  const onSubmit = async () => {
    const data = {
      appointment_type_id: form.enquiry,
      appointment_type_time_id: form.time,
      preferred_date: form.preferredDate,
      saluation: null,
      name: auth.user.name,
      email: auth.user.email,
      contact_number: auth.user.contact_number || '',
      order_code: orderCode,
      remarks: form.remarks
    };

    const errors = validate(form, validation);
    if (errors !== undefined) {
      setErrors(errors);
    } else {
      setErrors({});
      setIsLoading(true);

      let response;
      if (isReschedule) {
        response = await Appointment.update(form.id, data);
      } else {
        response = await Appointment.store(data);
      }

      setIsLoading(false);

      if (response.success) {
        setResponse(response);
      } else {
        Features.toast(response.message, 'error');
      }
    }
  };

  const bookForOtherPerson = () => {
    navigation.navigate('AddAppointmentForOtherScreen', { form: route.params?.form });
  }

  if (response.success) {
    return (
      <View style={[styles.flex1]}>
        <View style={[style.modal, styles.bgPrimary, styles.justifyCenter]}>
          <View style={[styles.alignItemsCenter, styles.mb30, { paddingHorizontal: 40 }]}>
            <Image source={require('../../../assets/images/appointment-submission.png')} style={[styles.mb20]} />
            <View style={[]}>
              <Text style={[style.confirmText, styles.mb20]}>Hi, {auth.user.name}, we've got you</Text>
              <Text style={[style.confirmText, styles.mb30]}>A confirmation email will be sent to you within 1 working day</Text>
            </View>
            <Text style={[style.bookDate]}>{form.preferredDate ? moment(form.preferredDate).format('dddd, DD MMMM YYYY') : ''}</Text>
            <Text style={[style.bookDate, styles.mb30]}>{form.timeRange}</Text>
            <Text style={[style.bookDate, styles.f16]}>{form.storeName}</Text>
            <Text style={[style.confirmText]}>{form.storeAddress}</Text>
          </View>
          <TouchableOpacity
            style={[style.button, styles.bgWhite, styles.mh20]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('MyAppointmentScreen')}
          >
            <Text style={[styles.textPrimary, styles.buttonLabel, styles.textCenter, styles.f16]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mt20} activeOpacity={0.9} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={[styles.textWhite, styles.bold, styles.f16, styles.textCenter]}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <NavigationHOC navigation={navigation} containerStyle={[styles.p0]} isLoading={isLoading}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.ph20, styles.pv10]}>
          <Text style={[style.title, styles.mb5]}>Make an Appointment</Text>
          <Text style={style.subtitle}>Book a consultation today with our Eyecare Practitioner at W OPTICS.</Text>
        </View>
        <View style={style.buttonSection}>
          <Text style={style.label}>Booking for someone else? Please fill up another form here.</Text>
          <TouchableOpacity style={style.bookForOtherBtn} activeOpacity={0.9} onPress={bookForOtherPerson}>
            <Text style={[style.bookForOtherLabel]}>Book For Others</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.p20]}>
          <MyPickerInput
            data={enquiries}
            label="Appointment"
            value={form.enquiry}
            onValueChange={(value) => onChange('enquiry', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.enquiry}
          />
          <MyPickerInput
            data={stores}
            label="Preferred Store"
            placeholder="Select an outlet nearest to you"
            value={form.store}
            onValueChange={(value) => onChange('store', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.store}
          />
          <MyDatePickerInput
            label="Preferred Date"
            required
            containerStyle={[styles.mb20]}
            onChangeValue={(value) => onChange('preferredDate', value)}
            errorMessage={errors.preferredDate}
            placeholder="Select date"
            value={form.preferredDate}
          />
          <MyPickerInput
            data={times}
            label="Preferred Time"
            value={form.time}
            onValueChange={(value) => onChange('time', value)}
            required
            containerStyle={[styles.mb20]}
            errorMessage={errors.time}
          />
          <MyTextareaInput
            label="Remarks"
            containerStyle={[styles.mb20]}
            onChangeText={(value) => onChange('remarks', value)}
            value={form.remarks}
            errorMessage={errors.remarks}
          />
          <View style={[styles.mb30]}>
            <TouchableOpacity style={[style.button, styles.bgPrimary, styles.ml0]} activeOpacity={0.9} onPress={onSubmit}>
              <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter, styles.f16]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </NavigationHOC>
  );
};

export default AddAppointmentScreen;
