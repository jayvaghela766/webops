import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainBottomNavigation from '../../components/MainBottomNavigation';
import colors from '../../config/colors';
import NavigationHOC from '../../hoc/NavigationHOC';
import Spinner from '../../hoc/Spinner';
import Faq from '../../models/Faq';
import styles from '../../styles/styles';

const FaqScreen = ({ navigation }) => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sectionOpened, setSectionOpened] = useState([]);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    const response = await Faq.get();
    setFaqs(response);
    setIsLoading(false);
    console.log(response);
  };

  return (
    <NavigationHOC navigation={navigation} containerStyle={[styles.p20]} isLoading={isLoading}>
      {
        Faq.NOTICE.map((item) => (
          <View key={item.title}>
            <Text style={style.noticeHeading}>{item.title}</Text>
            <Text style={[styles.normal, styles.f12]}>{item.description}</Text>
          </View>
        ))
      }
      {
        faqs.map((faq, index) => (
          <View style={[styles.mt10]} key={`faq-${faq.id}`}>
            <Text style={[styles.bold, styles.mb10]}>{`${String.fromCharCode(index + 65)}. ${faq.name}`}</Text>
            <Accordion
              sections={faq.faqs}
              activeSections={sectionOpened}
              keyExtractor={(item) => item.id}
              renderHeader={(section, index, isActive) => (
                <View style={[style.accordionHeader]}>
                  <Text style={style.sectionTitle}>{section.question}</Text>
                  <View style={style.accordionHeaderIcon}>
                    <Icon name={isActive ? 'minus' : 'plus-thick'} color="white" />
                  </View>
                </View>
              )}
              renderContent={(section) => (
                <View>
                  <Text style={style.sectionDescription}>{section.answer}</Text>
                </View>
              )}
              onChange={setSectionOpened}
              underlayColor="#f5f5f5"
            />
          </View>
        ))
      }
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  noticeHeading: {
    fontFamily: 'OpenSans-Bold',
    borderBottomColor: '#7f7f7f',
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    marginVertical: 15
  },
  accordionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 7
  },
  accordionHeaderIcon: {
    backgroundColor: colors.primary,
    padding: 3,
    borderRadius: 10,
    marginLeft: 20
  },
  sectionTitle: {
    flex: 1,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: '#333',
  },
  sectionDescription: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    marginBottom: 20
  },
  description: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20
  },
});

export default FaqScreen;