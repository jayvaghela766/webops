import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingArrow = ({ label, onPress, containerStyle }) => (
  <TouchableOpacity style={[style.setting, containerStyle]} onPress={onPress} activeOpacity={0.9}>
    <Text style={style.label}>{label}</Text>
    <Icon name="chevron-right" size={18} />
  </TouchableOpacity>
);

const style = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#D5D8DD',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    fontFamily: 'OpenSans-Regular'
  }
});

export default SettingArrow;
