import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../config/colors';
import styles from "../../styles/styles";

const Checkbox = ({ label, onPress, checked }) => (
  <TouchableOpacity
    style={[styles.row, styles.alignItemsCenter]}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <View style={[style.checkbox, checked ? style.checked : style.unchecked]}>
      { checked && <Feather name="check" color="#fff" /> }
    </View>
    <Text style={[styles.normal, styles.f16, styles.textWhite]}>{label}</Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10
  },
  checked: {
    backgroundColor: colors.primary
  },
  unchecked: {
    borderColor: '#C4C4C4',
    borderWidth: 1,
    backgroundColor: '#fff'
  }
});

export default Checkbox;