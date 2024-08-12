import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const AppointmentStatusTab = ({ status, setStatus, hidePast, containerStyle }) => (
  <View style={[style.tabs, containerStyle]}>
    <TouchableOpacity
      style={status === 'upcoming' ? style.tabActive : style.tab}
      activeOpacity={0.9}
      onPress={() => setStatus('upcoming')}
    >
      <Text style={status === 'upcoming' ? style.tabTextActive :style.tabText}>{'Upcoming\nAppointments'}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={status === 'pending' ? style.tabActive : style.tab}
      activeOpacity={0.9}
      onPress={() => setStatus('pending')}
    >
      <Text style={status === 'pending' ? style.tabTextActive :style.tabText}>{'Pending\nAppointments'}</Text>
    </TouchableOpacity>
    {
      !hidePast && (
        <TouchableOpacity
          style={status === 'past' ? style.tabActive : style.tab}
          activeOpacity={0.9}
          onPress={() => setStatus('past')}
        >
          <Text style={status === 'past' ? style.tabTextActive :style.tabText}>{'Past\nAppointments'}</Text>
        </TouchableOpacity>
      )
    }
  </View>
);

const style = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  tabActive: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 6
  },
  tabTextActive: {
    color: colors.dark,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold'
  },
  tab: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  tabText: {
    color: colors.dark,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular'
  }
});

AppointmentStatusTab.defaultProps = {
  hidePast: false
};

export default AppointmentStatusTab;