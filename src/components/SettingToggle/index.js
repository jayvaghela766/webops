import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import colors from '../../config/colors';

const SettingToggle = ({ label, enable, onChange, containerStyle }) => (
  <View style={[style.setting, containerStyle]}>
    <Text style={style.label}>{label}</Text>
    <ToggleSwitch
      isOn={enable}
      onColor={colors.primary}
      offColor={colors.grey}
      size="small"
      onToggle={onChange}
    />
  </View>
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

export default SettingToggle;
