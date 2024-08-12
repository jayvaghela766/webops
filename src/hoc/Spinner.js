import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Spinkit from 'react-native-spinkit';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import styles from '../styles/styles';

const Spinner = ({
  isLoading,
  children,
  containerStyle,
  loadingText
}) => {
  if (isLoading) {
    return (
      <View style={[style.spinnerContainer, containerStyle]}>
        { children }
        <Modal
          isVisible={isLoading}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={600}
        >
          <View style={[style.modalCard]}>
            <Spinkit
              isVisible={isLoading}
              size={70}
              type="Circle"
              color={colors.primary}
              style={Platform.OS === 'ios' ? { marginTop: 16 } : {}}
            />
            <Text style={[styles.loadingText, styles.textCenter]}>{loadingText}</Text>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={[styles.flex1, containerStyle]}>
      { children }
    </View>
  );
};

const style = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
  },
  spinner: {
    ...styles.h6Light,
    ...styles.f14,
    ...styles.textPrimary
  },
  responseMessage: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 14,
    textAlign: 'center',
    color: '#757575',
    marginTop: 10
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
});

Spinner.defaultProps = {
  loadingText: 'Loading...'
};

export default Spinner;
