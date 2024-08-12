import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinkit from 'react-native-spinkit';
import Modal from 'react-native-modal';
import MainBottomNavigation from '../components/MainBottomNavigation';
import MainNavigationHeader from '../components/MainNavigationHeader';
import colors from '../config/colors';
import styles from '../styles/styles';

const Wrapper = ({ safeArea, children }) => {
  if (safeArea) {
    return (
      <SafeAreaView style={styles.flex1}>
        { children }
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.flex1}>
        { children }
      </View>
    );
  }
};

const NavigationHOC = ({
  children,
  navigation,
  disableScrollView,
  safeArea,
  containerStyle,
  isLoading,
  loadingText,
  onRefresh,
  disableheader
}) => (
  <Wrapper safeArea={safeArea}>
    { !disableheader && <MainNavigationHeader navigation={navigation} /> }
    {
      disableScrollView ? children : (
        <ScrollView
          style={[styles.bgWhite, styles.mb30]}
          contentContainerStyle={[style.container, containerStyle]}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isLoading}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          { children }
        </ScrollView>
      )
    }
    <MainBottomNavigation navigation={navigation} />
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
        />
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>
    </Modal>
  </Wrapper>
);

const style = StyleSheet.create({
  container: {
    padding: 20,
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

NavigationHOC.defaultProps = {
  loadingText: 'Loading',
  onRefresh: () => null,
  isLoading: false,
  safeArea: true
};

export default NavigationHOC;