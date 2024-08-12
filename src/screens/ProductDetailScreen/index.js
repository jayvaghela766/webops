import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import ImageView from "react-native-image-viewing";
import RenderHtml from 'react-native-render-html';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import MyPickerInput from '../../components/MyPickerInput';
import Product from '../../models/Product';
import Cart from '../../models/Cart';
import Features from '../../helper/Features';
import MyCheckboxInput from '../../components/MyChecboxInput';
import colors from '../../config/colors';
import HeaderTab from '../../components/HeaderTab';
import PromotionCard from '../../components/PromotionCard';

const quantites = Array.from(Array(12).keys()).map((val, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString()
}));

const appointmentOptions = [
  {
    value: '1',
    label: 'Yes, schedule an appointment'
  },
  {
    value: '0',
    label: 'No'
  }
];

const TABS = [
  {
    label: 'Promotion',
    value: 'promotion'
  },
  {
    label: 'Product Details',
    value: 'description'
  },
  {
    label: 'Colours Available',
    value: 'color'
  },
];

const ProductDetailScreen = ({ navigation, route }) => {
  const { width } = useWindowDimensions();

  const [product, setProduct] = useState({
    category_product: {},
    product_colors: [],
    product_prices: [],
    product_options: [],
    lens_powers: [],
    lens_axes: [],
    lens_cylinders: [],
    promotions: [],
    product_multifocals: [],
  });

  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [appointment, setAppointment] = useState('');
  const [power, setPower] = useState('');
  const [leftPower, setLeftPower] = useState('');
  const [rightPower, setRightPower] = useState('');
  const [multifocal, setMultifocal] = useState('');
  const [option, setOption] = useState('');
  const [productColor, setProductColor] = useState('');
  const [axis, setAxis] = useState('');
  const [cylinder, setCylinder] = useState('');
  const [agreeDocument, setAgreeDocument] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [tab, setTab] = useState(TABS[1].value);

  useEffect(() => {
    if (route.params?.product) {
      fetchProduct();
    }
  }, [route.params]);

  useEffect(() => {
    setPrice(Product.getProductPrice(product, quantity, option).perItem)
  }, [quantity, option]);

  const fetchProduct = async () => {
    setIsLoading(true);
    let product = await Product.get(route.params.product.id);

    product.lens_powers = product.lens_powers.map((item) => ({
      label: item.power_sign.toString(),
      value: item.id.toString()
    }));

    product.product_colors = product.product_colors.map((item) => ({
      label: item.name,
      value: item.id.toString()
    }));

    product.product_options = product.product_options.map((item) => ({
      label: item.description,
      value: item.id.toString()
    }));

    product.lens_axes = product.lens_axes.map((item) => ({
      label: item.axis.toString(),
      value: item.id.toString()
    }));

    product.lens_cylinders = product.lens_cylinders.map((item) => ({
      label: item.power_sign.toString(),
      value: item.id.toString()
    }));

    product.product_multifocals = product.product_multifocals.map((item) => ({
      label: item.name,
      value: item.id.toString()
    }));

    const price = product.product_prices.length ? product.product_prices[0].price : null;
    setProduct(product);
    setPrice(price);
    setIsLoading(false);
  };

  const addToCart = async () => {
    if (product.lens_powers.length && product.category_product.is_frame) {
      if (!leftPower || !rightPower) {
        Features.toast('Please select lens power', 'warning');
        return;
      }
    } else {
      if (product.lens_powers.length && !power) {
        Features.toast('Please select lens power', 'warning');
        return;
      }
    }

    if (product.product_colors.length && !productColor) {
      Features.toast('Please select a color', 'warning');
      return;
    }

    if (product.product_options.length && !option) {
      Features.toast('Please select an option', 'warning');
      return;
    }

    if (product.lens_axes.length && !axis) {
      Features.toast('Please select an axis', 'warning');
      return;
    }

    if (product.lens_cylinders.length && !cylinder) {
      Features.toast('Please select a cylinder', 'warning');
      return;
    }

    if (product.product_multifocals.length && !multifocal) {
      Features.toast('Please select a multifocal', 'warning');
      return;
    }

    if (!quantity) {
      Features.toast('Please select quantity', 'warning');
      return;
    }

    if (!appointment) {
      Features.toast('Please confirm if you need an appointment', 'warning');
      return;
    } else {
      if (!agreeDocument && appointment === '1') {
        Features.toast('Please check our remarks below', 'warning');
        return;
      } else if (!agreePolicy && appointment === '0') {
        Features.toast('Please check our remarks below', 'warning');
        return;
      }
    }

    setIsLoading(true);

    const response = await Cart.store({
      product_id: product.id,
      quantity: quantity || 1,
      lens_power_id: power,
      lens_power_right_id: rightPower,
      lens_power_left_id: leftPower,
      product_color_id: productColor,
      lens_axis_id: axis,
      lens_cylinder_id: cylinder,
      product_multifocal_id: multifocal,
      is_request_appointment: appointment || null,
      product_option_id: option
    });

    setIsLoading(false);

    if (response.success) {
      navigation.navigate('CartScreen', { cart: response.data });
    } else {
      if (response.message) {
        Features.toast(response.message, 'error');
      } else {
        Features.toast('Error while adding to your cart', 'error');
      }
    }
  }

  return (
    <NavigationHOC navigation={navigation} isLoading={isLoading} disableheader>
      <ImageView
        images={[{ uri: product.thumbnail_url }]}
        imageIndex={0}
        visible={imagePreview}
        onRequestClose={() => setImagePreview(false)}
      />
      <TouchableOpacity activeOpacity={0.9} onPress={() => setImagePreview(true)}>
        <Image
          source={{ uri: product.thumbnail_url }}
          style={style.image}
        />
      </TouchableOpacity>
      <View style={[styles.mb20]}>
        <Text style={style.productName}>{product.name}</Text>
        <Text style={style.productPrice}>{price ? `SGD $${price}` : 'No Information'}</Text>
      </View>
      {
        product.lens_powers.length > 0 && (
          <View style={[styles.mb20]}>
            <Text style={[style.productPrice, styles.f14]}>Enter your lens prescription:</Text>
            <Text style={style.description}>You can find your prescription on your contact lens boxes.</Text>
          </View>
        )
      }
      <View style={[styles.row, styles.mb10]}>
        {
          (product.lens_powers.length > 0 && product.category_product.is_frame) && (
            <>
              <MyPickerInput
                label="Power (Left)"
                containerStyle={[styles.flex1, styles.mr5]}
                data={product.lens_powers}
                value={leftPower}
                onValueChange={setLeftPower}
              />
              <MyPickerInput
                label="Power (Right)"
                containerStyle={[styles.flex1, styles.mr5]}
                data={product.lens_powers}
                value={rightPower}
                onValueChange={setRightPower}
              />
            </>
          )
        }
        {
          product.lens_powers.length > 0 && (
            <MyPickerInput
              label="Power"
              containerStyle={[styles.flex1, styles.mr5]}
              data={product.lens_powers}
              value={power}
              onValueChange={setPower}
            />
          )
        }
        {
          product.product_multifocals.length > 0 && (
            <MyPickerInput
              label="ADD"
              containerStyle={[styles.flex1, styles.mr5]}
              data={product.product_multifocals}
              value={multifocal}
              onValueChange={setMultifocal}
            />
          )
        }
        {
          product.product_colors.length > 0 && (
            <MyPickerInput
              label="Color"
              containerStyle={[styles.flex1, styles.ml5]}
              data={product.product_colors}
              value={productColor}
              onValueChange={(value) => setProductColor(value)}
            />
          )
        }
        {
          product.lens_cylinders.length > 0 && (
            <MyPickerInput
              label="CLY"
              containerStyle={[styles.flex1, styles.ml5]}
              data={product.lens_cylinders}
              value={cylinder}
              onValueChange={setCylinder}
            />
          )
        }
        {
          product.lens_axes.length > 0 && (
            <MyPickerInput
              label="Axis"
              containerStyle={[styles.flex1, styles.ml5]}
              data={product.lens_axes}
              value={axis}
              onValueChange={setAxis}
            />
          )
        }
      </View>
      {
        product.product_options.length > 0 && (
          <MyPickerInput
            label="Options"
            containerStyle={[styles.flex1, styles.mb10]}
            data={product.product_options}
            value={option}
            onValueChange={(value) => setOption(value)}
          />
        )
      }
      <View style={[styles.row, styles.mb10]}>
        <MyPickerInput
          label="Quantity"
          containerStyle={[styles.flex1, styles.mr5]}
          data={quantites}
          value={quantity}
          onValueChange={(value) => setQuantity(value)}
        />
        <View style={styles.flex1} />
      </View>
      <View style={[styles.mb10]}>
        <MyPickerInput
          label="Eye Check Appointment"
          containerStyle={[styles.flex1, styles.mr5]}
          data={appointmentOptions}
          value={appointment}
          onValueChange={(value) => setAppointment(value)}
          required
        />
        <Text style={[style.note, styles.mt10]}>{'* Disclaimer: Contact lenses are categorised as a medical devices in Singapore and wearers are subjected to an eye examination.'}</Text>
      </View>
      {
        appointment === '1' && (
          <MyCheckboxInput
            label={
              <View style={[style.policyContainer,  Platform.OS === 'ios' ? styles.ml10: {}]}>
                <Text style={[style.label]}>
                  {'By clicking \'Add to Cart\', you have acknowledge to that you have read and agree to be bound by our '}
                  <Text style={[style.label, style.textLink]} onPress={() => navigation.navigate('TermsAndConditionScreen')}>{'Terms & Conditions'}</Text>
                  <Text style={[style.label]}>{', '}</Text>
                  <Text style={[style.label, style.textLink]} onPress={() => navigation.navigate('ReturnPolicyScreen')}>{'Return Policy'}</Text>
                  <Text style={[style.label]}>{', '}</Text>
                  <Text style={[style.label, style.textLink]} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>{'Privacy Policy'}</Text>
                  <Text style={[style.label]}>{' and hereby consent to the collection, use and/or disclosure by us of your personal data to fulfil your order.'}</Text>
                </Text>
              </View>
            }
            containerStyle={[styles.mv10, { alignItems: 'flex-start', }]}
            onValueChange={setAgreeDocument}
            value={agreeDocument}
          />
        )
      }
      {
        appointment === '0' && (
          (
            <MyCheckboxInput
              label={
                <View style={[style.policyContainer,  Platform.OS === 'ios' ? styles.ml10: {}]}>
                  <Text style={[style.label]}>
                    {'By clicking \'Add to Cart\', you have acknowledge to that '}
                    <Text style={[style.label, styles.textPrimary]}>{'you have input an up to date prescription (12 months)'}</Text>
                    <Text style={[style.label]}>{' and agree to be bound by our '}</Text>
                    <Text style={[style.label, style.textLink]} onPress={() => navigation.navigate('TermsAndConditionScreen')}>{'Terms & Conditions'}</Text>
                    <Text style={[style.label]}>{', '}</Text>
                    <Text style={[style.label, style.textLink]} onPress={() => navigation.navigate('ReturnPolicyScreen')}>{'Return Policy'}</Text>
                    <Text style={[style.label]}>{', '}</Text>
                    <Text style={[style.label, style.textLink]} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>{'Privacy Policy'}</Text>
                    <Text style={[style.label]}>{' and hereby consent to the collection, use and/or disclosure by us of your personal data to fulfil your order.'}</Text>
                  </Text>
                </View>
              }
              containerStyle={[styles.mv10, { alignItems: 'flex-start', }]}
              onValueChange={setAgreePolicy}
              value={agreePolicy}
            />
          )
        )
      }
      <View style={[styles.mt10, styles.mb30]}>
        <TouchableOpacity style={[style.button, styles.bgPrimary]} activeOpacity={0.9} onPress={addToCart}>
          <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <HeaderTab tabs={TABS} onPress={setTab} selected={tab} scrollable />
      {
        tab === TABS[0].value && (
          <View style={[styles.mb20]}>
            {
              product.promotions.map((promotion, index) => (
                <PromotionCard
                  key={`promotion-${promotion.discount_id}`}
                  title={promotion.discount.title}
                  imageUrl={promotion.discount.thumbnail_url}
                  description={promotion.discount.description}
                  isLast={index === product.promotions.length - 1}
                  onPress={() => navigation.navigate('PromotionDetailScreen', { promotion: promotion.discount })}
                />
              ))
            }
          </View>
        )
      }
      {
        tab === TABS[1].value && (
          <RenderHtml
            contentWidth={width}
            source={{ html: product.description }}
          />
        )
      }
      {
        tab === TABS[2].value && (
          <View style={[styles.mb20]}>
            { product.product_colors.map((color) => <Text key={color.label} style={[style.colorText]}>{color.label}</Text>) }
          </View>
        )
      }
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'center',
    marginBottom: 10
  },
  productName: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16
  },
  productPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16
  },
  description: {
    fontFamily: 'OpenSans-Regular'
  },
  note: {
    fontFamily: 'OpenSans-Italic',
    color: '#333333',
    fontWeight: '400'
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
  },
  policyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  textLink: {
    color: colors.primary,
    textDecorationLine: 'underline'
  },
  colorText: {
    fontFamily: 'OpenSans-Regular',
    color: colors.dark,
    fontSize: 14
  }
});

export default ProductDetailScreen;