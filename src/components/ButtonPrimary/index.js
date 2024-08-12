import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../../styles/styles';

const ButtonPrimary = ({ text, onPress, containerStyle }) => (
  <TouchableOpacity style={[style.button, styles.bgPrimary, containerStyle]} activeOpacity={0.9} onPress={onPress}>
    <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>{text}</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 5
  }
})

export default ButtonPrimary;