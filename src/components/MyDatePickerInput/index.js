import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const MyDatePickerInput = ({
  containerStyle,
  label,
  required,
  onChangeValue,
  placeholder,
  errorMessage,
  mode,
  value
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (value) {
      setDate(moment(value).toDate());
      setText(moment(value).format('DD MMM YYYY'));
    } else {
      setText();
    }
  }, [value])

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setText(moment(selectedDate).format('DD MMM YYYY'));
      onChangeValue(moment(selectedDate).format('YYYY-MM-DD'));
      setDate(selectedDate);
    }
  };

  const onChangeOnIOS = (value) => {
    setText(value);
    const selectedDate = moment(value, 'DD MMM YYYY');
    onChangeValue(selectedDate.format('YYYY-MM-DD'));
    setDate(selectedDate.toDate());
  };

  return (
    <View style={[styles.mb20, containerStyle]}>
      <View style={styles.row}>
        { label && <Text style={[style.textInputLabel, errorMessage ? styles.textRed : { color: 'black' }]}>{label}</Text> }
        { required && <Text style={[style.label, styles.textRed]}>{' *'}</Text> }
      </View>
      {
        Platform.OS === 'android' && (
          <>
            <View style={[style.textInputContainer, label ? styles.mt5 : {}, errorMessage ? { borderColor: colors.red } : {}]}>
              <View style={[styles.rowBetweenInCenter]}>
                <TextInput
                    style={style.textInput}
                    placeholder={placeholder}
                    placeholderTextColor="#C8C7CC"
                    value={text}
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShow(true)}
                  >
                    <CalendarIcon />
                  </TouchableOpacity>
              </View>
            </View>
          </>
        )
      }
      {
        Platform.OS === 'ios' && (
          <DatePicker
            format="DD MMM YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder={placeholder}
            onDateChange={onChangeOnIOS}
            date={value ? date : null}
            iconComponent={(
              <View style={{ position: 'absolute', right: 10 }}>
                <CalendarIcon />
              </View>
            )}
            style={style.datePickerIOS}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-start',
                paddingLeft: 10,
              },
              btnTextConfirm: {
                color: '#1A7AFF'
              },
              dateText: {
                fontFamily: 'OpenSans-Regular',
                fontSize: 16,
                color: '#272727',
              },
              placeholderText: {
                fontFamily: 'OpenSans-Regular',
                fontSize: 16,
                color: '#aabbc6'
              }
            }}
          />
        )
      }
      { errorMessage && <Text style={[style.errorMessage]}>{errorMessage}</Text> }
      {
        show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )
      }
    </View>
  );
};

const style = StyleSheet.create({
  textInputContainer: {
    borderColor: '#C4C4C4',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: Platform.OS == 'ios' ? 15 : 0
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    color: '#000'
  },
  textInputLabel: {
    fontFamily: 'OpenSans-Regular'
  },
  passwordVisibility: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: colors.primary
  },
  errorMessage: {
    color: colors.red,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10
  },
  datePickerIOS: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#C4C4C4',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: Platform.OS === 'ios' ? 55 : null,
    marginTop: 10,
    justifyContent: 'center'
  }
});

MyDatePickerInput.defaultProps = {
  mode: 'date'
};

export default MyDatePickerInput;