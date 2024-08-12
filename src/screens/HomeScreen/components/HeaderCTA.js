import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../config/api';
import colors from '../../../config/colors';
import Features from '../../../helper/Features';
import Request from '../../../helper/Request';
import styles from '../../../styles/styles';

const HeaderCTA = ({ title, content }) => {
  const [sections, setSections] = useState([]);

  const onSubscribe = async () => {
    const response = await Request.backend('POST', api.SUBSCRIBE);
    if (response.message) {
      Features.toast(response.message);
    }
  };

  return (
    <Accordion
      sections={[{title, content}]}
      activeSections={sections}
      renderHeader={(section, index, isActive) => (
        <View style={[style.container]}>
          <Text style={[styles.textWhite, styles.normal]}>{section.title}</Text>
          <Icon name={isActive ? 'minus' : 'plus-thick'} color="#fff" size={18} />
        </View>
      )}
      renderContent={(section) => (
        <View style={[style.content, styles.row]}>
          <Text style={[styles.textWhite, styles.normal]}>{section.content}</Text>
          <Text style={[styles.textWhite, styles.normal]} onPress={onSubscribe}>{' | Subscribe Now'}</Text>
        </View>
      )}
      onChange={setSections}
      underlayColor="#f5f5f5"
    />
  )
}
// const HeaderCTA = ({ title, content }) => (
//   <TouchableOpacity style={style.container} activeOpacity={0.8}>
//     <Text style={[styles.textWhite, styles.normal]}>{title}</Text>
//     <Icon name="plus-thick" color="#fff" size={18} />
//   </TouchableOpacity>
// )

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    backgroundColor: colors.dark,
    paddingBottom: 16,
    paddingHorizontal: 12,

  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
});

export default HeaderCTA;