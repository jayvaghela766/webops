import React from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeIcon from '../../assets/icons/home.svg';
import FaqIcon from '../../assets/icons/faq.svg';
import MyAppointmentIcon from '../../assets/icons/my-appointments.svg';
import Eshop from '../../assets/icons/shop.svg'
import AboutScreen from '../screens/AboutScreen';
import MyAppointmentScreen from '../screens/MyAppointmentScreen';
import FaqScreen from '../screens/FaqScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MyAccountIcon from '../../assets/icons/my-account.svg';
import MyOrdersIcon from '../../assets/icons/my-orders.svg';
import MyWalletIcon from '../../assets/icons/my-wallet.svg';
import OurServicesIcon from '../../assets/icons/our-services.svg';
import AlconIcon from '../../assets/icons/alcon.svg';
import StoreLocatorIcon from '../../assets/icons/store-locator.svg';
import PromotionIcon from '../../assets/icons/promotions.svg';
import AboutIcon from '../../assets/icons/about.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import ContactUsIcon from '../../assets/icons/contact.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import styles from '../styles/styles';
import HomeNavigation from './HomeNavigation';
import PromotionNavigation from './PromotionNavigation';
import MyOrderNavigation from './MyOrderNavigation';
import SettingNavigation from './SettingNavigation';
import ServiceScreen from '../screens/ServiceScreen';
import HappeningScreen from '../screens/HappeningScreen';
import MyAccountNavigation from './MyAccountNavigation';
import ContactUsScreen from '../screens/ContactUsScreen';
import StoreLocatorScreen from '../screens/StoreLocatorScreen';
import Storage from '../helper/Storage';
import LiveChatScreen from '../screens/LiveChatScreen';
import PromotionWalletNavigation from './PromotionWalletNavigation';
import EshopStackNavigation from './EshopStackNavigation';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const {state, ...rest} = props;
  const newState = {...state};
  const hiddenRoute = [
    // 'HomeScreen',
    // 'ShopScreen',
    // 'MyAppointmentScreen',
  ];

  newState.routes = newState.routes.filter(
    item => !hiddenRoute.includes(item.name),
  );

  const openLink = async key => {
    const siteSettings = await Storage.get('siteSettings');
    try {
      if (siteSettings[key]) {
        Linking.openURL(siteSettings[key]);
      }
    } catch (error) {
      console.log('openLink', error);
    }
  };

  return (
    <View style={[styles.flex1]}>
      <DrawerContentScrollView {...props}>
        <View style={style.headerDrawer}>
          <Image
            source={require('../../assets/images/drawer-bg.png')}
            style={{...StyleSheet.absoluteFillObject}}
          />
          <Text style={style.headerUsername}>
            Hi, {props?.auth?.user?.name}
          </Text>
        </View>
        <DrawerItemList
          {...rest}
          state={newState}
          activeBackgroundColor="#D9F7ED"
          activeTintColor="#333"
          inactiveTintColor="#333"
          labelStyle={{
            fontFamily: 'OpenSans-Regular',
          }}
        />
        <View style={[styles.alignItemsCenter, styles.mb30, styles.mt20]}>
          <Text style={[styles.bold, styles.f12, styles.dark]}>
            Follow Us On
          </Text>
          <View style={[styles.row, styles.mt10]}>
            <TouchableOpacity
              style={style.socialIconContainer}
              activeOpacity={0.9}
              onPress={() => openLink('facebook')}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={style.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.socialIconContainer, styles.mh10]}
              activeOpacity={0.9}
              onPress={() => openLink('youtube')}>
              <Image
                source={require('../../assets/images/youtube.png')}
                style={style.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.socialIconContainer}
              activeOpacity={0.9}
              onPress={() => openLink('instagram')}>
              <Image
                source={require('../../assets/images/instagram.png')}
                style={style.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const MainDrawerNavigation = ({ auth}) => (


  <Drawer.Navigator
    initialRouteName="HomeScreen"
    drawerContent={props => <CustomDrawer auth={auth} {...props} />}>
    <Drawer.Screen
      name="HomeScreen"
      component={HomeNavigation}
      options={{
        title: 'Home',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <HomeIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="ShopScreen"
      component={EshopStackNavigation}
      options={{
        title: 'E-Shop',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <Eshop />
          </View>
        )
      }}
    />
    <Drawer.Screen
      name="LiveChatScreen"
      component={LiveChatScreen}
      options={{
        title: 'Live Chat',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <Icon name="chatbubbles-outline" size={24} />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="MyAccountScreen"
      component={MyAccountNavigation}
      options={{
        title: 'Account',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <MyAccountIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="MyAppointmentScreen"
      component={AppointmentNavigation}
      options={{
        title: 'Appointments',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <MyAppointmentIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="MyOrderScreen"
      component={MyOrderNavigation}
      options={{
        title: 'Orders',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <MyOrdersIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="PromotionScreen"
      component={PromotionNavigation}
      options={{
        title: 'Promotions',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <PromotionIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="PromotionWalletScreen"
      component={PromotionWalletNavigation}
      options={{
        title: 'E-Wallet',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <MyWalletIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="ServiceScreen"
      component={ServiceScreen}
      options={{
        title: 'Our Services',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <OurServicesIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="HappeningScreen"
      component={HappeningScreen}
      options={{
        title: 'Happenings',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <OurServicesIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="QuestionnaireScreen"
      component={QuestionnaireNavigation}
      options={{
        title: 'Alcon Questionnaire',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <AlconIcon />
          </View>
        )
      }}
    />
    <Drawer.Screen
      name="QuestionnaireScreen"
      component={QuestionnaireNavigation}
      options={{
        title: 'Alcon Questionnaire',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <OurServicesIcon />
          </View>
        )
      }}
    />
    <Drawer.Screen
      name="StoreLocatorScreen"
      component={StoreLocatorScreen}
      options={{
        title: 'Store Locator',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <StoreLocatorIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="AboutScreen"
      component={AboutScreen}
      options={{
        title: 'About W OPTICS',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <AboutIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="FaqScreen"
      component={FaqScreen}
      options={{
        title: 'FAQ',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <FaqIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="SettingScreen"
      component={SettingNavigation}
      options={{
        title: 'Settings',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <SettingsIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="ContactUsScreen"
      component={ContactUsScreen}
      options={{
        title: 'Contact Us',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <ContactUsIcon />
          </View>
        ),
      }}
    />
    <Drawer.Screen
      name="LogoutScreen"
      component={LogoutScreen}
      options={{
        title: 'Logout',
        drawerIcon: () => (
          <View style={style.iconContainer}>
            <LogoutIcon />
          </View>
        ),
      }}
    />
  </Drawer.Navigator>
);

const style = StyleSheet.create({
  headerDrawer: {
    // backgroundColor: colors.primary,
    height: 100,
    justifyContent: 'flex-end',
    padding: 15,
    marginBottom: 10,
  },
  headerUsername: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
  },
  socialIcon: {
    flex: 1,
    width: null,
    height: null,
  },
  socialIconContainer: {
    width: 28,
    height: 28,
  },
  iconContainer: {
    width: 25,
    height: 25,
  },
});

export default MainDrawerNavigation;
