import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import validate from 'validate.js';
import NavigationHOC from '../../hoc/NavigationHOC';
import MyTextInput from '../../components/MyTextInput';
import styles from '../../styles/styles';
import MyCheckboxInput from '../../components/MyChecboxInput';
import TextInputValue from '../../components/TextInputValue';
import MyPickerInput from '../../components/MyPickerInput';
import AuthContext from '../../context/AuthContext';
import Features from '../../helper/Features';
import validation from './validation.json';
import Order from '../../models/Order';
import Store from '../../models/Store';

const ShippingScreen = ({ navigation, route }) => {
  const { auth } = useContext(AuthContext);
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [shippingAddressErrors, setShippingAddressErrors] = useState({});
  const [billingAddressErrors, setBillingAddressErrors] = useState({});
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState();
  const [isSelfCollection, setIsSelfCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    billing_address: {},
    shipping_address: {}
  });

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    setStore();
  }, [isSelfCollection]);

  useEffect(() => {
    const input = { ...form };

    if (shippingSameAsBilling) {
      input.shipping_address = input.billing_address;
    } else {
      if (auth.billing_address) {
        input.billing_address = auth.billing_address;
      }

      if (auth.shipping_address) {
        input.shipping_address = auth.shipping_address;
      }
    }

    setForm(input);
  }, [shippingSameAsBilling]);

  const fetchStores = async () => {
    const response = await Store.all(1, { list_only: true });
    const stores = response.map((item) => ({ label: item.name, value: item.id.toString() }));
    setStores(stores);
  };

  const onChange = (parent, key, value) => {
    const input = { ...form };
    if (parent) {
      input[parent][key] = value;
    } else {
      input[key] = value;
    }
    setForm(input);
  };

  const onCheckOut = async () => {
    const shippingAddressErrors = !isSelfCollection ? validate(form.shipping_address, validation) : undefined;
    const billingAddressErrors = validate(form.billing_address, validation);

    if (isSelfCollection && !store) {
      Features.toast('Please select store');
      return;
    }

    if (shippingAddressErrors !== undefined) {
      setShippingAddressErrors(shippingAddressErrors);
    } else {
      setShippingAddressErrors({})
    }

    if (billingAddressErrors !== undefined) {
      setBillingAddressErrors(billingAddressErrors);
    } else {
      setBillingAddressErrors({});
    }

    if (!shippingAddressErrors && !billingAddressErrors) {
      setIsLoading(true);
      const { cart, promoCode } = route.params;
      const products = cart.map((item) => ({ ...item, cart_id: item.id }));
      const carts = cart.map(({ id }) => ({ id }));

      const data = {...form};
      data.billing_address.contact_number = form.billing_address.phone;
      data.shipping_address.contact_number = form.shipping_address.phone;
      data.self_collection_at = store || null;
      data.carts = carts;
      data.products = products;
      data.promo_code = promoCode;

      const response = await Order.store(data);
      setIsLoading(false);

      if (response.success) {
        if (response.data?.payment) {
          navigation.navigate('PaymentProcessingScreen', {
            uri: response.data.payment.payment_url,
            data: response.data
          });
        }
      } else {
        Features.toast(response.message, 'error');
      }
    }
  };

  return (
    <NavigationHOC
      navigation={navigation}
      isLoading={isLoading}
      safeArea={false}
      disableheader
    >
      <Text style={style.headerText}>BILLING DETAILS</Text>
      <MyTextInput
        label="First Name"
        onChangeText={(val) => onChange('billing_address', 'first_name', val)}
        value={form.billing_address.first_name}
        errorMessage={billingAddressErrors.first_name}
        required
      />
      <MyTextInput
        label="Last Name"
        onChangeText={(val) => onChange('billing_address', 'last_name', val)}
        value={form.billing_address.last_name}
        errorMessage={billingAddressErrors.last_name}
        required
      />
      <MyTextInput
        label="Company Name"
        onChangeText={(val) => onChange('billing_address', 'company_name', val)}
        value={form.billing_address.company_name}
        errorMessage={billingAddressErrors.company_name}
        required={false}
      />
      <TextInputValue
        containerStyle={[styles.mb20]}
        label="Country"
        value="Singapore"
        required
      />
      <MyTextInput
        label="Street address"
        placeholder="House number and street name"
        containerStyle={[styles.mb10]}
        onChangeText={(val) => onChange('billing_address', 'address', val)}
        value={form.billing_address.address}
        errorMessage={billingAddressErrors.address}
        required
      />
      <MyTextInput
        placeholder="Apartment, suite, unit etc. (optional)"
        onChangeText={(val) => onChange('billing_address', 'address_detail', val)}
        value={form.billing_address.address_detail}
        errorMessage={billingAddressErrors.address_detail}
      />
      <MyTextInput
        label="Town/City"
        onChangeText={(val) => onChange('billing_address', 'city', val)}
        value={form.billing_address.city}
        errorMessage={billingAddressErrors.city}
        required
      />
      <MyTextInput
        label="Postcode/ZIP"
        onChangeText={(val) => onChange('billing_address', 'postal_code', val)}
        value={form.billing_address.postal_code}
        errorMessage={billingAddressErrors.postal_code}
        keyboardType="number-pad"
        required
      />
      <MyTextInput
        label="Contact Number"
        onChangeText={(val) => onChange('billing_address', 'phone', val)}
        value={form.billing_address.phone}
        errorMessage={billingAddressErrors.phone}
        keyboardType="phone-pad"
        required
      />
      <Text style={style.headerText}>SHIPPING DETAILS</Text>
      <Text style={[styles.normal, styles.dark, styles.f14, styles.mb10]}>Please pick either option.</Text>
      <MyCheckboxInput
        label="Self collection in store"
        containerStyle={[styles.mb10]}
        onValueChange={setIsSelfCollection}
        value={isSelfCollection}
      />
      {
        isSelfCollection ? (
          <MyPickerInput
            label="Select store"
            data={stores}
            containerStyle={[styles.mb20]}
            onValueChange={setStore}
            value={store}
          />
        ) : (
          <>
            <MyCheckboxInput
              label="Same as my Billing Address"
              containerStyle={[styles.mb10]}
              onValueChange={(val) => setShippingSameAsBilling(val)}
              value={shippingSameAsBilling}
            />
            <MyTextInput
              label="First Name"
              onChangeText={(val) => onChange('shipping_address', 'first_name', val)}
              value={form.shipping_address.first_name}
              errorMessage={shippingAddressErrors.first_name}
              required
            />
            <MyTextInput
              label="Last Name"
              onChangeText={(val) => onChange('shipping_address', 'last_name', val)}
              value={form.shipping_address.last_name}
              errorMessage={shippingAddressErrors.last_name}
              required
            />
            <MyTextInput
              label="Company Name"
              onChangeText={(val) => onChange('shipping_address', 'company_name', val)}
              value={form.shipping_address.company_name}
              errorMessage={shippingAddressErrors.company_name}
              required={false}
            />
            <TextInputValue
              containerStyle={[styles.mb20]}
              label="Country"
              value="Singapore"
              required
            />
            <MyTextInput
              label="Street address"
              placeholder="House number and street name"
              containerStyle={[styles.mb10]}
              onChangeText={(val) => onChange('shipping_address', 'address', val)}
              value={form.shipping_address.address}
              errorMessage={shippingAddressErrors.address}
              required
            />
            <MyTextInput
              placeholder="Apartment, suite, unit etc. (optional)"
              onChangeText={(val) => onChange('shipping_address', 'address_detail', val)}
              value={form.shipping_address.address_detail}
              errorMessage={shippingAddressErrors.address_detail}
            />
            <MyTextInput
              label="Town/City"
              onChangeText={(val) => onChange('shipping_address', 'city', val)}
              value={form.shipping_address.city}
              errorMessage={shippingAddressErrors.city}
              required
            />
            <MyTextInput
              label="Postcode/ZIP"
              onChangeText={(val) => onChange('shipping_address', 'postal_code', val)}
              value={form.shipping_address.postal_code}
              errorMessage={shippingAddressErrors.postal_code}
              keyboardType="number-pad"
              required
            />
            <MyTextInput
              label="Contact Number"
              onChangeText={(val) => onChange('shipping_address', 'phone', val)}
              value={form.shipping_address.phone}
              errorMessage={shippingAddressErrors.phone}
              keyboardType="phone-pad"
              required
            />
          </>
        )
      }
      <View style={[styles.mb30]}>
        <TouchableOpacity style={[style.button, styles.bgPrimary, styles.ml0]} activeOpacity={0.9} onPress={onCheckOut}>
          <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  headerText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D5D8DD',
    marginBottom: 10
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5
  },
  appointmentBg: {
    width: null,
    height: 400
  },
  thanks: {
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    textAlign: 'center'
  },
  thanksNote: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'white',
    textAlign: 'center'
  },
  appointmentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5
  }
});

export default ShippingScreen;