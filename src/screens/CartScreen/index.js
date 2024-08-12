import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MainBottomNavigation from '../../components/MainBottomNavigation';
import MyTextInput from '../../components/MyTextInput';
import styles from '../../styles/styles';
import CartList from './components/CartList';
import Product from '../../models/Product';
import Cart from '../../models/Cart';
import Discount from '../../models/Discount';
import Features from '../../helper/Features';
import Storage from '../../helper/Storage';
import Request from '../../helper/Request';
import api from '../../config/api';
import Spinner from '../../hoc/Spinner';

const CartScreen = ({ navigation, route }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState();
  const [discount, setDiscount] = useState();
  const [isOnEditCart, setIsOnEditCart] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [remapProducts, setRemapCarts] = useState([]); // cart grouping by productId
  const [canCheckout, setCanCheckout] = useState(true);

  useEffect(() => {
    if (route.params?.cart) {
      const cart = route.params.cart;
      setCart(cart);
    } else {
      fetchCart();
    }
  }, [route.params?.cart]);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const fetchCart = async () => {
    setIsLoading(true);
    const cart = await Cart.get();
    setCart(cart);
    setIsLoading(false);
  };

  const saveUpdatedCart = async (items) => {
    const updatedCart = items.map((item) => ({ id: item.id, quantity: item.quantity }));
    const response = await Cart.update(updatedCart);
    if (response.success) {
      setCart(items);
    }
  };

  const onAddQuantity = (item) => {
    const items = [...cart];
    const index = items.indexOf(item);
    items[index].quantity = parseInt(items[index].quantity) + 1;
    saveUpdatedCart(items);
  };

  const onRemoveQuantity = (item) => {
    const items = [...cart];
    const index = items.indexOf(item);
    if (items[index].quantity > 1) {
      items[index].quantity = parseInt(items[index].quantity) - 1;
    } else {
      items.splice(index, 1);
    }
    saveUpdatedCart(items);
  };

  const getTotalOrigin = () => {
    return cart.map((item) => {
      return Product.getProductPrice(item.product, item.quantity, item.product_option_id).total
    }).reduce((a, b) => a + b, 0);
  }

  const calculateTotal = async () => {
    setIsLoading(true);
    // total before re calculation of the possibility get discount from quantity
    const totalOrigin = getTotalOrigin();

    // re calculate total since we have discount by quantity
    const calculateCart = await Request.backend('GET', api.CALCULATE_CART);
    setRemapCarts(calculateCart?.products || []);
    setCanCheckout(calculateCart.can_proceed);

    if (!calculateCart.can_proceed) {
      setIsLoading(false);
      Features.toast(calculateCart.message);
      return;
    }

    const total = calculateCart?.total || 0;
    const discountAmount = Number(totalOrigin) - Number(total);
    let shippingCost = 0;

    if (cart.length) {
      const shipping = await Request.backend('GET', api.GET_SHIPPING_COST, null, { total });
      shippingCost = shipping?.cost || 0;
      setShippingCost(shipping.cost);
    }

    if (discountAmount > 0) {
      const discount = {
        discount_amount: discountAmount,
        total_before_discount: Number(totalOrigin),
        shipping_cost: shippingCost,
        total
      };

      setDiscount(discount);
    }

    setSubtotal(totalOrigin);
    setTotal(totalOrigin + shippingCost);
    setGrandTotal(total + shippingCost);

    const promotionCode = await Storage.get('promotionCode');
    if (promotionCode) {
      setDiscountCode(promotionCode);
      await applyDiscountCode(promotionCode);
    }

    setIsLoading(false);
  };

  const applyDiscountCode = async (code) => {
    if (!cart.length) {
      Features.toast('Ups! There\'s no product here');
      return;
    }

    const data = {
      code,
      products: remapProducts
    };

    setIsLoading(true);
    const response = await Discount.apply(data);

    if (response.success) {
      setCanCheckout(response.data.can_proceed);
      setShippingCost(response.data.shipping_cost);

      setTotal(response.data.total_before_discount);
      setGrandTotal(response.data.total);
      setDiscount(response.data);

      if (response.data?.message) {
        Features.toast(response.data.message);
      } else {
        Features.toast(response.message);
      }
    } else {
      calculateTotal();
      Features.toast(response?.errors?.code.join(''), 'error');
    }

    setIsLoading(false);
  };

  const onContinue = () => {
    if (!cart.length) {
      Features.toast('Ups! Your cart is empty', 'warning');
      return;
    }

    navigation.navigate('ShippingScreen', {
      cart,
      promoCode: discountCode
    })
  };

  return (
    <Spinner containerStyle={[styles.flex1]} isLoading={isLoading}>
      <View style={[styles.p20]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <Text style={[styles.flex1, style.cartHeaderText]}>Product Summary</Text>
            <View style={[styles.flex1, styles.row, styles.alignItemsCenter]}>
              <Text style={[styles.flex1, style.cartHeaderText, styles.textCenter]}>Total</Text>
              {
                isOnEditCart
                ? (
                  <TouchableOpacity style={[styles.flex1]} activeOpacity={0.9} onPress={() => setIsOnEditCart(false)}>
                    <Text style={[styles.bold, styles.f12, styles.textPrimary, styles.textCenter]}>Update</Text>
                  </TouchableOpacity>
                )
                : (
                  <TouchableOpacity style={[styles.flex1]} activeOpacity={0.9} onPress={() => setIsOnEditCart(true)}>
                    <Text style={[styles.bold, styles.f12, styles.textPrimary, styles.textCenter]}>Edit</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          {
            cart.map((item) => (
              <CartList
                key={`CartList` + item.product.slug + item.id}
                productName={item.product.name}
                price={Product.getProductPrice(item.product, item.quantity, item.product_option_id).total}
                imageUrl={item.product.thumbnail_url}
                quantity={item.quantity}
                isOnEdit={isOnEditCart}
                onAdd={() => onAddQuantity(item)}
                onRemove={() => onRemoveQuantity(item)}
              />
            ))
          }
          <View style={style.promoContainer}>
            <Text style={style.promoLabel}>Have a discount code? Key in below.</Text>
            <View style={style.discountInput}>
              <MyTextInput
                containerStyle={[styles.flex2, styles.mb0]}
                placeholder="Discount code"
                onChangeText={setDiscountCode}
                value={discountCode}
              />
              <TouchableOpacity style={[style.button, styles.bgPrimary]} activeOpacity={0.9} onPress={() => applyDiscountCode(discountCode)}>
                <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>Apply code</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.orderInfo}>
            <Text style={style.cartInfoHeader}>YOUR ORDER</Text>
            <View style={[styles.row, style.cartInfoLine]}>
              <Text style={[styles.flex2, style.cartInfo, styles.pr5]}>Product</Text>
              <View style={[styles.row, styles.flex1]}>
                <Text style={[style.cartInfo, styles.pl10, styles.textCenter]}>Qty</Text>
                <Text style={[style.cartInfo, styles.pl10]}>Total</Text>
              </View>
            </View>
            {
              cart.map((item) => (
                <View key={`OrderList` + item.product.slug + item.id} style={[styles.row, style.cartInfoLine, { height: 100 }]}>
                  <Text style={[styles.flex2, style.cartInfo, styles.pr5]}>{item.product.name}</Text>
                  <View style={[styles.flex1, styles.row]}>
                    <Text style={[style.cartInfo, styles.pr5, styles.textCenter]}>{item.quantity}</Text>
                    <Text style={[style.cartInfo, styles.pl10]}>{`SGD $${Number(Product.getProductPrice(item.product, item.quantity, item.product_option_id).perItem).toFixed(2)}`}</Text>
                  </View>
                </View>
              ))
            }
            <View style={[styles.row, style.cartInfoLine]}>
              <Text style={[style.cartInfo, styles.flex2, styles.pr5]}>Subtotal</Text>
              <Text style={[style.cartInfo, styles.pl10]}>{`SGD $${Number(subtotal).toFixed(2)}`}</Text>
            </View>
            <View style={[styles.row, style.cartInfoLine]}>
              <Text style={[style.cartInfo, styles.flex2, styles.pr5]}>Shipping</Text>
              <Text style={[style.cartInfo, styles.pl10]}>{`SGD $${Number(shippingCost).toFixed(2)}`}</Text>
            </View>
            <View style={[styles.row, style.cartInfoLine]}>
              <Text style={[style.cartInfo, styles.flex2, style.cartInfoBold, styles.pr5]}>Total</Text>
              <Text style={[style.cartInfo, style.cartInfoBold, styles.pl10]}>{`SGD $${total.toFixed(2)}`}</Text>
            </View>
            {
              discount?.discount_amount != undefined && (
                <View style={[styles.row, style.cartInfoLine]}>
                  <Text style={[style.cartInfo, styles.flex2, style.cartInfoBold, styles.pr5]}>Discount</Text>
                  <Text style={[style.cartInfo, style.cartInfoBold, styles.pl10]}>{`SGD $${Number(discount.discount_amount).toFixed(2)}`}</Text>
                </View>
              )
            }
            {
              grandTotal != total && (
                <View style={[styles.row, style.cartInfoLine]}>
                  <Text style={[style.cartInfo, styles.flex2, style.cartInfoBold, styles.pr5]}>Grand Total</Text>
                  <Text style={[style.cartInfo, style.cartInfoBold, styles.pl10]}>{`SGD $${grandTotal.toFixed(2)}`}</Text>
                </View>
              )
            }
          </View>
          <View style={{ marginBottom: 80 }}>
            <TouchableOpacity
              style={[style.button, canCheckout ? styles.bgPrimary : styles.bgGrey , styles.ml0]}
              activeOpacity={0.9}
              onPress={onContinue}
              disabled={!canCheckout}
            >
              <Text style={[styles.textWhite, styles.buttonLabel, styles.textCenter]}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <MainBottomNavigation navigation={navigation} />
    </Spinner>
  );
};

const style = StyleSheet.create({
  cartHeaderText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16
  },
  discountInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 15,
    borderRadius: 5
  },
  promoLabel: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5
  },
  promoContainer: {
    padding: 15,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20
  },
  cartInfo: {
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    flexWrap: 'wrap',
    paddingBottom: 10
  },
  cartInfoBold: {
    fontFamily: 'OpenSans-Bold',
  },
  cartInfoHeader: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    paddingBottom: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D5D8DD'
  },
  cartInfoLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#D5D8DD',
    marginBottom: 10
  },
  orderInfo: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    marginVertical: 20,
    borderRadius: 5
  }
});

export default CartScreen;