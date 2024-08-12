import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import colors from '../../config/colors';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';

const AboutScreen = ({ navigation }) => {
  const [overlayText, setOverlayText] = useState();

  const onPressSquareImage = (selected) => {
    if (overlayText != selected) {
      setOverlayText(selected);
    } else {
      setOverlayText();
    }
  };

  return (
    <NavigationHOC navigation={navigation} containerStyle={styles.p0}>
      <Text style={[styles.bold, styles.f16, styles.ph15, styles.mb10, Platform.OS === 'android' ? styles.pt15 : {}]}>About Us</Text>
      <Image source={require('../../../assets/images/about-1.png')} style={style.banner} />
      <View style={[styles.ph20, styles.mb10]}>
        <Text style={[styles.bold, styles.f16, styles.mb10]}>Why W OPTICS</Text>
        <Text style={[styles.normal, styles.f16]}>At W OPTICS, we believe in offering tailored vision care services to cater to the specific needs of customers, making every visit a distinguished and exclusive experience. We are committed to changing the approach to vision care, by optical solutions and products at the forefront of the industry.</Text>
      </View>
      <Image source={require('../../../assets/images/about-2.png')} style={style.banner} />
      <View style={[styles.ph20]}>
        <Text style={[styles.bold, styles.f16, styles.mb10]}>Largest Vision Care Flagship Store in Singapore</Text>
        <Text style={[styles.normal, styles.f16]}>The first store opened in July 2013 at Suntec City and this flagship is the largest vision care store – covering 5,000 sq ft – in Singapore. the first-of-its kind retail concept is committed to changing the approach to vision care in Singapore. Offering optical solutions at the forefront of the industry.</Text>
      </View>
      <View style={{ backgroundColor: '#116680', paddingVertical: 5, marginVertical: 10 }}>
        <Image source={require('../../../assets/images/about-3.png')} style={{ width: '100%', height: 80 }} />
        <Image source={require('../../../assets/images/about-4.png')} style={{ width: '100%', height: 80 }} />
      </View>
      <View style={[styles.p20]}>
        <TouchableOpacity style={[style.square, styles.mb20]} onPress={() => onPressSquareImage('experienced')} activeOpacity={0.9}>
          {
            overlayText === 'experienced' && (
              <View style={[style.overlay]}>
                <Text style={style.infoOverlayTitle}>Highly Experienced Optometrists</Text>
                <Text style={style.infoOverlayDesc}>Our Optometrists have more than 20 years of experience in practice and Ortho-K fitting program for both children and adult.</Text>
              </View>
            )
          }
          <Image source={require('../../../assets/images/about-6.png')} style={style.imgSquare} />
          {/* <Text style={[styles.bold, styles.f16, styles.mv10, styles.textCenter]}>Highly Experienced Optometrists</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={[style.square, styles.mb20]} onPress={() => onPressSquareImage('kid')} activeOpacity={0.9}>
          {
            overlayText === 'kid' && (
              <View style={[style.overlay]}>
                <Text style={style.infoOverlayTitle}>Dedicated Kid's Corner</Text>
                <Text style={style.infoOverlayDesc}>Our Kid’s corner is a playground where the little ones can engage with interactive wall displays or drawing while getting themselves ‘framed’. The full selection of over 150 eyewear choices, comes in different color, fitting, hypoallergic material to cater for all kids. There are also optical frames for infant, sunglasses & sports goggles in the children area.</Text>
              </View>
            )
          }
          <Image source={require('../../../assets/images/about-5.png')} style={style.imgSquare} />
          {/* <Text style={[styles.bold, styles.f16, styles.mv10, styles.textCenter]}>Dedicated Kid's Corner</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={[style.square, styles.mb20]} onPress={() => onPressSquareImage('equipments')} activeOpacity={0.9}>
          {
            overlayText === 'equipments' && (
              <View style={[style.overlay]}>
                <Text style={style.infoOverlayTitle}>Advanced Medical Equipments</Text>
                <Text style={style.infoOverlayDesc}>We pride ourselves to be equipped with the latest equipments for eye examination, eye disease screening, myopia control and more.</Text>
              </View>
            )
          }
          <Image source={require('../../../assets/images/about-7.png')} style={style.imgSquare} />
          {/* <Text style={[styles.bold, styles.f16, styles.mv10, styles.textCenter]}>Advanced Medical Equipments</Text> */}
        </TouchableOpacity>
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  banner: {
    width: null,
    height: 160,
    marginBottom: 10
  },
  imgSquare: {
    width: null,
    height: null,
    flex: 1,
  },
  square: {
    width: null,
    height: 320,
  },
  overlay: {
    backgroundColor: 'rgba(48, 111, 140, 0.9)',
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  infos: {
    backgroundColor: '#306F8C',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10
  },
  info: {
    alignItems: 'center',
    flex: 1,
  },
  infoOverlayTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 20,
    color: '#fff',
    marginBottom: 25
  },
  infoOverlayDesc: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
});

export default AboutScreen;