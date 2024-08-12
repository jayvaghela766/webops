import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import {navigate} from '../../navigations/RootNavigation';
import styles from '../../styles/styles';

const ModalOfferAppoinment = ({show, onClose, orderCode}) => (
  <Modal
    isVisible={show}
    animationIn="fadeIn"
    animationOut="fadeOut"
    animationOutTiming={500}
    backdropColor={colors.primary}
    backdropOpacity={1}>
    <View style={[styles.flex1, styles.bgPrimary, styles.justifyCenter]}>
      <View style={[style.appointmentContainer]}>
        <Image
          source={require('../../../assets/images/post-checkout.png')}
          style={[style.image]}
        />
        <Text style={[style.thanks, styles.mb30]}>
          Thank you for shopping with W OPTICS
        </Text>
        <Text style={[style.thanks, styles.mb30]}>
          You have purchased lens products but have you scheduled your eye
          check?
        </Text>
        <Text style={style.thanksNote}>
          For accuracy of the product you are purchasing, please schedule an eye
          check at any of our W OPTICS outlet.
        </Text>
        <View style={[styles.mt30]}>
          <TouchableOpacity
            style={[style.button, styles.bgWhite]}
            activeOpacity={0.9}
            onPress={() => {
              onClose();
              navigation.navigate('MyAppointmentScreen', {
                orderCode,
                screen: 'AddAppointmentScreen',
              });
            }}>
            <Text
              style={[
                styles.textPrimary,
                styles.buttonLabel,
                styles.textCenter,
              ]}>
              Book An Appointment Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mt10]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              onClose();
              navigate('HomeScreen');
            }}>
            <Text
              style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>
              Book Later
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const style = StyleSheet.create({
  appointmentBg: {
    width: null,
    height: 400,
  },
  thanks: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    textAlign: 'center',
  },
  thanksNote: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  appointmentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  image: {
    marginBottom: 40,
  },
});

ModalOfferAppoinment.defaultProps = {
  orderCode: null,
};

export default ModalOfferAppoinment;
