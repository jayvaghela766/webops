import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import AppointmentCard from '../../components/AppointmentCard';
import EmptyAppointment from '../../components/EmptyAppointment';
import colors from '../../config/colors';
import AuthContext from '../../context/AuthContext';
import NavigationHOC from '../../hoc/NavigationHOC';
import Appointment from '../../models/Appointment';
import styles from '../../styles/styles';
import AppointmentStatusTab from '../../components/AppointmentStatusTab';
import AppointmentCTA from '../../components/AppointmentCTA';

const MyAppointmentScreen = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [status, setStatus] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMyAppointment();
  }, [status]);

  const fetchMyAppointment = async () => {
    setIsLoading(true);
    const response = await Appointment.mine(status);
    setIsLoading(false);
    setAppointments(response.data);
  };

  const createAppointment = () => {
    navigation.navigate('AddAppointmentScreen');
  };

  return (
    <NavigationHOC
      navigation={navigation}
      containerStyle={[styles.p0]}
      isLoading={isLoading}
      onRefresh={fetchMyAppointment}>
      <View style={[styles.ph20, styles.pt20]}>
        <AppointmentCTA onPressBook={createAppointment} />
        <AppointmentStatusTab status={status} setStatus={setStatus} />
      </View>
      <View style={[styles.mb20]}>
        {
          appointments.length > 0 && (
            appointments.map((appointment) => (
              <AppointmentCard
                key={`AppointmentHeader-${appointment.id}`}
                status={status}
                store={appointment?.appointment_type_time?.store.name}
                date={appointment?.preferred_date}
                startAt={appointment?.appointment_type_time?.start_at}
                endAt={appointment?.appointment_type_time?.end_at}
                onPressDetail={() => navigation.navigate('AppointmentDetailScreen', { appointment })}
              />
            ))
          )
        }
      </View>
    </NavigationHOC>
  );
};

export default MyAppointmentScreen;
