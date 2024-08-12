import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const HeaderTab = ({ tabs, selected, onPress, containerStyle, scrollable }) => {
  if (scrollable) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.row]}>
          {
            tabs.map((tab) => (
              <TouchableOpacity
                key={tab.value}
                style={tab.value === selected ? style.tabActive : style.tab}
                activeOpacity={0.9}
                onPress={() => onPress(tab.value)}
              >
                <Text style={tab.value === selected ? style.tabTextActive :style.tabText}>{tab.label}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    )
  } else {
    return (
      <View style={[style.tabs, containerStyle]}>
        {
          tabs.map((tab) => (
            <TouchableOpacity
              key={tab.value}
              style={tab.value === selected ? style.tabActive : style.tab}
              activeOpacity={0.9}
              onPress={() => onPress(tab.value)}
            >
              <Text style={tab.value === selected ? style.tabTextActive :style.tabText}>{tab.label}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
};

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
    fontSize: 14,
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
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular'
  }
});

HeaderTab.defaultProps = {
  tabs: [],
  onPress: () => null
};

export default HeaderTab;