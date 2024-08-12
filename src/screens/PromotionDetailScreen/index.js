import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from '../../styles/styles';
import Storage from '../../helper/Storage';
import colors from '../../config/colors';
import Features from '../../helper/Features';
import Promotion from '../../models/Promotion';
import { async } from 'validate.js';

const PromotionDetailScreen = ({navigation, route}) => {
  const [promotion, setPromotion] = useState({});
  const [voucher, seVoucher] = useState();
  const [confirmDioalog, setConfirmDioalog] = useState(false);

  useEffect(() => {
    if (route.params?.promotion) {
      setPromotion(route.params.promotion);
    }
    if (route.params?.voucher) {
      seVoucher(route.params.voucher);
    } else {
      seVoucher(route.params.voucher);
    }
  }, [route.params]);

  const viewDilaog = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[style.arrowBack]}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="#fff" size={22} />
        </TouchableOpacity>
        <View style={style.logoContainer}>
          <Image
            source={require('../../../assets/images/logo-a.png')}
            style={style.logo}
          />
        </View>
        <View style={[styles.flex2, styles.alignItemsCenter]}>
          <Text style={[style.text, styles.mb10]}>
            Ready to redeem this eDeal at store now?
          </Text>
          <Text
            style={[
              style.text,
            ]}>{`This eDeal will be uterlise after tapping Yes. If not, please tap back and use this later.`}</Text>
        </View>
        <View style={[styles.flex1, styles.justifyCenter]}>
          <TouchableOpacity onPress={handleVoucher} activeOpacity={0.9}>
            <Text style={style.button}>Yes, I am ready!</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const handleVoucher = async() => {
    // $one_time_discount = DiscountInStore::where('id','=',$discount_store_id)->where('is_one_time','=',1)->first();
    if (promotion.is_one_time === 1 &&  promotion.is_used) {
      Features.toast(
        'You have used this voucher. You can only use this voucher once.',
      );
    } else {
      const param = {
        discount_store_id:promotion.id
      }
      const data = await Promotion.storeVoucher(param);
      navigation.navigate('PromotionalWalletScreen');
    }
  };

  const copyCode = async () => {
    if (voucher) {
      setConfirmDioalog(true);
    } else {
      Clipboard.setString(promotion.code);
      await Storage.set('promotionCode', promotion.code);
      navigation.navigate('ShopScreen');
    }
  };

  return (
    <View style={style.containerStyle}>
      {confirmDioalog ? (
        viewDilaog()
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[style.arrowBack]}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" color="#fff" size={22} />
          </TouchableOpacity>
          <View style={style.logoContainer}>
            <Image
              source={require('../../../assets/images/logo-a.png')}
              style={style.logo}
            />
          </View>
          <View style={[styles.flex2, styles.alignItemsCenter]}>
            <Text style={[style.text, styles.mb30]}>
              {promotion.description}
            </Text>
            {voucher ? (
              <>
                <Text
                  style={[
                    style.text,
                  ]}>{`By using this code you are agreeing to our terms and conditions.`}</Text>
              </>
            ) : (
              <>
                <Text style={[style.text, styles.mb10]}>
                  Here is your voucher code!
                </Text>
                <Text style={[style.code, styles.mb30]}>{promotion.code}</Text>
                <Text
                  style={[
                    style.text,
                  ]}>{`Go to our shop and paste the code at the checkout.\n\nBy using this code you are agreeing to our terms and conditions.`}</Text>
              </>
            )}
          </View>
          <View style={[styles.flex1, styles.justifyCenter]}>
            <TouchableOpacity onPress={copyCode} activeOpacity={0.9}>
              <Text style={style.button}>
                {voucher
                  ? 'Redeem eDeal at Store'
                  : 'Copy Code and Go to Store'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  arrowBack: {
    alignSelf: 'flex-start',
  },
  containerStyle: {
    backgroundColor: colors.primary,
    flex: 1,
    padding: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
  },
  text: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
  },
  code: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    color: colors.primary,
    backgroundColor: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default PromotionDetailScreen;
