import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../../../styles/styles';

const Option = ({ text, active, onPress }) => (
  <TouchableOpacity
    style={[style.button, active ? style.active : {} ]}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <Text style={[styles.semiBold, styles.f20, styles.textMuted, active ? style.textDark : {}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    borderColor: '#83A9BA',
    borderWidth: 1,
    marginBottom: 15,
  },
  active: {
    borderColor: '#306F8C',
    backgroundColor: '#D3F1FF'
  },
  textDark: {
    color: '#000'
  }
});

export default Option;