import React from 'react';
import moment from 'moment';
import {View, Text, ScrollView, Alert} from 'react-native';
import styles from '../../styles/styles';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonPrimaryOutline from '../../components/ButtonPrimaryOutline';
import Appointment from '../../models/Appointment';

const AppointmentDetailScreen = ({navigation, route}) => {
  const onCancelAppointment = () => {
    Alert.alert('Confirmation', 'Do you want to cancel this appointment?', [
      {
        text: 'Yes',
        onPress: async () => {
          const response = await Appointment.updateStatus(
            route.params?.appointment.id,
            Appointment.STATUS.CANCELLED,
          );
          if (response.success) {
            navigation.navigate('MyAppointmentScreen');
          }
        },
      },
      {
        text: 'Close',
        style: 'cancel',
      },
    ]);
  };

  const reschedule = () => {
    const form = {
      ...route.params.appointment,
      isReschedule: true,
    };
    navigation.navigate('MyAppointmentScreen', {
      form,
      screen: 'AddAppointmentScreen',
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.flex1]}>
        <View style={[styles.p20]}>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>
              Name of Patient
            </Text>
            <Text
              style={[styles.semiBold, styles.f16, styles.dark, styles.ml10]}>
              {route.params?.appointment.name}
            </Text>
          </View>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>
              Appointment
            </Text>
            <Text
              style={[styles.semiBold, styles.f16, styles.dark, styles.ml10]}>
              {route.params?.appointment.appointment_type.name}
            </Text>
          </View>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>
              Appointment Status
            </Text>
            <Text
              style={[
                styles.semiBold,
                styles.f16,
                styles.ml10,
                [
                  Appointment.STATUS.PENDING,
                  Appointment.STATUS.CANCELLED,
                ].indexOf(
                  parseInt(route.params?.appointment.appointment_status_id),
                ) !== -1
                  ? styles.textRed
                  : styles.textPrimary,
              ]}>
              {route.params?.appointment.appointment_status.name}
            </Text>
          </View>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>Preferred Store</Text>
            <Text style={[styles.semiBold, styles.f16, styles.dark, styles.ml10]}>{route.params?.appointment?.appointment_type_time?.store.name}</Text>
          </View>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>Preferred Date</Text>
            <Text style={[styles.semiBold, styles.f16, styles.dark, styles.ml10]}>{moment(route.params?.appointment?.preferred_date).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>Preferred Time</Text>
            <Text style={[styles.semiBold, styles.f16, styles.dark, styles.ml10]}>
              {`${moment(route.params?.appointment?.appointment_type_time?.start_at, 'HH:mm:ss').format('hh:mm A')} - ${moment(route.params?.appointment?.appointment_type_time?.end_at, 'HH:mm:ss').format('hh:mm A')}`}
            </Text>
          </View>
          <View style={[styles.mb15]}>
            <Text style={[styles.normal, styles.f16, styles.dark]}>Remark</Text>
            <Text
              style={[styles.semiBold, styles.f16, styles.dark, styles.ml10]}>
              {route.params?.appointment.remarks || '-'}
            </Text>
          </View>
          {parseInt(route.params?.appointment.appointment_status_id) ===
            Appointment.STATUS.PENDING && (
            <ButtonPrimary
              text="Change My Appointment"
              containerStyle={[styles.mt10]}
              onPress={reschedule}
            />
          )}
          {parseInt(route.params?.appointment.appointment_status_id) !==
            Appointment.STATUS.CANCELLED &&
            parseInt(route.params?.appointment.appointment_status_id) !==
              Appointment.STATUS.REJECTED &&
            parseInt(route.params?.appointment.appointment_status_id) !==
              Appointment.STATUS.CONFIRMED && (
              <ButtonPrimaryOutline
                text="Cancel Appointment"
                containerStyle={[styles.mv10]}
                onPress={onCancelAppointment}
              />
            )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AppointmentDetailScreen;
