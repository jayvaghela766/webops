import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml from 'react-native-render-html';
import colors from '../../config/colors';
import styles from '../../styles/styles';
import ServiceBanner from './components/ServiceBanner';

const ServiceDetailScreen = ({navigation, route}) => {
  const {width} = useWindowDimensions();

  const [sectionOpened, setSectionOpened] = useState([]);
  const [service, setService] = useState({
    description: '',
    faqs: [],
  });

  useEffect(() => {
    if (route.params?.service) {
      setService(route.params.service);
    }
  }, [route.params]);

  const idsStyles = {
    contactLensMain1: {
      flexWrap: 'wrap',
    },
    lensOrderFirst1: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '2px',
    },
    lensImage1: {
      objectFit: 'cover',
      width: '350px',
      height: '350px',
    },
    mainDiv2: {
      width: width - 35,
      margin: '0 auto',
    },

    // contactLensMain2: {
    //   display: 'flex',
    //   flexDirection: 'column-reverse',
    //   flexWrap: 'wrap',
    //   padding: '30px',
    //   marginBottom: '10px',
    // },
    lensOrderFirst2: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '2px',
    },
    lensImage2: {
      objectFit: 'cover',
      width: '100%',
      maxWidth: '100%',
      height: '340px',
      margin: '0 auto',
    },
    contactLensMain3: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    lensImage3: {
      objectFit: 'cover',
      width: '350px',
      height: '350px',
    },
    myopiaMain: {
      display: 'flex',
      flexDirection: 'column-reverse',
      padding: '10px 10px',
      margin: '10px 0',
    },
    lensImage4: {
      width: '350px',
    },
    EyeDivMain: {
      width: width - 35,
    },
  };

  const tagsStyles = {
    a: {
      backgroundColor: '#306F8C',
      borderRadius: '5px',
      borderColor: 'transparent',
      color: '#fff',
      width: '120px',
      paddingTop: '0.9rem',
      paddingBottom: '0.9rem',
      marginBottom: '0.5rem',
      fontWeight: '700',
      lineHeight: '1.8',
      border: '1px solid transparent',
      fontSize: '1.2rem',
      textDecorationLine: 'none',
      textAlign: 'center',
    },
  };

  const classStyle = {
    customLensMain: {
      display: 'flex',
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#F5F5F5',
    },
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ServiceBanner
        title={service.title}
        subtitle={service.subtitle}
        imageUrl={service.banner_url}
        navigation={navigation}
      />
      <View style={[styles.p20]}>
        <RenderHtml
          contentWidth={width}
          source={{html: service.description}}
          idsStyles={idsStyles}
          tagsStyles={tagsStyles}
          classesStyles={classStyle}
        />
        <Accordion
          sections={service.faqs}
          activeSections={sectionOpened}
          renderHeader={section => (
            <View style={[style.accordionHeader]}>
              <Text style={style.sectionTitle}>{section.title}</Text>
              <View style={style.accordionHeaderIcon}>
                <Icon name="plus-thick" color="white" />
              </View>
            </View>
          )}
          renderContent={section => (
            <View>
              <Text style={style.sectionDescription}>
                {section.description}
              </Text>
            </View>
          )}
          onChange={setSectionOpened}
          underlayColor="#f5f5f5"
        />
        <View style={[styles.mb30, styles.mt20]}>
          <TouchableOpacity
            style={[style.button, styles.bgPrimary]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AddAppointmentScreen')}>
            <Text
              style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>
              Book A Consultation Today
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  accordionHeader: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bababa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionHeaderIcon: {
    backgroundColor: colors.primary,
    padding: 3,
    borderRadius: 10,
    marginLeft: 20,
  },
  sectionTitle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
    color: colors.primary,
    flex: 1,
  },
  sectionDescription: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  description: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
  },
});

export default ServiceDetailScreen;
