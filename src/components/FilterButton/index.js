import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import styles from '../../styles/styles';
import colors from '../../config/colors';

const FilterButton = ({ label, onPress, selected, containerStyle }) => (
  <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[style.container, containerStyle, selected ? { borderColor: colors.primary } : {}]}>
    { selected && <View style={style.overlay} /> }
    <View style={[styles.row, styles.alignItemsCenter]}>
      {
        typeof label === 'string'
          ? <Text style={[style.label, selected ? { color: colors.primary } : {}]}>{label}</Text>
          : label
      }
    </View>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: colors.dark,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(195,238,250,0.2)',
    zIndex: 1,
    borderRadius: 5,
  }
});


export default FilterButton;