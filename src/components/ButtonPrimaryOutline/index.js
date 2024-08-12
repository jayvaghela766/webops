import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const ButtonPrimaryOutline = ({ text, onPress, containerStyle }) => (
  <TouchableOpacity style={[style.button, containerStyle]} activeOpacity={0.9} onPress={onPress}>
    <Text style={[styles.textPrimary, styles.buttonLabel, styles.textCenter]}>{text}</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1
  }
})

export default ButtonPrimaryOutline;