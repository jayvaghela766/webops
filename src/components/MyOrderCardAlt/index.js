import moment from 'moment';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const MyOrderCardAlt = ({ order, items, onPressTrack, onPressRefund, onPressFeedback }) => (
  <View style={style.container}>
    <Text style={[style.labelSemiBold, styles.mb5]}>Order Number: {order.code}</Text>
    <View style={style.innerContainer}>
      <Text style={[style.labelSemiBold, styles.mb15]}>Item</Text>
      {
        items.map((item) => (
          <View style={[styles.row, styles.mb15]} key={order.code + item.id}>
            <View style={style.imageContainer}>
              <Image source={{ uri: item.product.thumbnail_url }} style={style.image} />
            </View>
            <View style={[styles.flex1]}>
              <Text style={[style.labelSemiBold, styles.mb10]} numberOfLines={2} >{item.product.name}</Text>
              <View style={[styles.mb10]}>
                {
                  item.lens_power && (
                    <Text>{`Lens Power: ${item.lens_power?.power}`}</Text>
                  )
                }
                {
                  item.lens_power_right && (
                    <Text>{`Lens Power (Right): ${item.lens_power_right?.power}`}</Text>
                  )
                }
                {
                  item.lens_power_left && (
                    <Text>{`Lens Power (Left): ${item.lens_power_left?.power}`}</Text>
                  )
                }
                {
                  item.product_color && (
                    <Text>{`Color: ${item.product_color?.name}`}</Text>
                  )
                }
                {
                  item.product_option && (
                    <Text>{`Option: ${item.product_option?.description}`}</Text>
                  )
                }
                {
                  item.lens_axis && (
                    <Text>{`Option: ${item.lens_axis?.axis}`}</Text>
                  )
                }
                {
                  item.lens_cylinder && (
                    <Text>{`CYL : ${item.lens_cylinder?.power}`}</Text>
                  )
                }
                {
                  item.product_multifocal && (
                    <Text>{`Multifocal : ${item.product_multifocal?.name}`}</Text>
                  )
                }
              </View>
              <View>
                <View style={[styles.row, styles.mb5]}>
                  <Text style={[style.labelSemiBold, styles.textRight, styles.flex1]}>Qty</Text>
                  <Text style={[style.labelSemiBold, styles.textRight, styles.flex1]}>Amount</Text>
                </View>
                <View style={[styles.row]}>
                  <Text style={[style.labelNormal, styles.textRight, styles.flex1]}>{item.quantity}</Text>
                  {
                    item.discount_id ? (
                      <View style={[styles.flex1]}>
                        <Text style={[style.labelNormal, styles.textRight, { textDecorationLine: 'line-through' }]}>{`$ ${item.product_price.price}`}</Text>
                        <Text style={[style.labelNormal, styles.textRight, styles.f10]}>{`Voucher: ${item.discount.title}`}</Text>
                        <Text style={[style.labelNormal, styles.textRight]}>{`$ ${Number(item.total).toFixed(2)}`}</Text>
                      </View>
                    ) : (
                      <Text style={[style.labelNormal, styles.textRight, styles.flex1]}>{`$ ${Number(item.product_price.price).toFixed(2)}`}</Text>
                    )
                  }
                </View>
              </View>
            </View>
          </View>
        ))
      }
      <View style={style.line} />
      <View style={[styles.row, styles.mb5]}>
        <Text style={[style.labelNormal, styles.flex1, styles.textRight]}>Shipping:</Text>
        <Text style={[style.labelSemiBold, styles.flex1, styles.textRight]}>{'$ ' + Number(order.total_shipping).toFixed(2)}</Text>
      </View>
      <View style={[styles.row, styles.mb5]}>
        <Text style={[style.labelNormal, styles.flex1, styles.textRight]}>Order Total:</Text>
        <Text style={[style.labelSemiBold, styles.flex1, styles.textRight]}>{'$ ' + Number(order.total).toFixed(2)}</Text>
      </View>
      <View style={[styles.row, styles.mb5]}>
        <Text style={[style.labelNormal, styles.flex1, styles.textRight]}>Status:</Text>
        <Text style={[style.status, styles.flex1, styles.textRight]}>{order.order_status}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[style.labelNormal, styles.flex1, styles.textRight]}>Order Date:</Text>
        <Text style={[style.labelSemiBold, styles.flex1, styles.textRight]}>{moment(order.created_at).format('DD MMM YYYY')}</Text>
      </View>
    </View>
    <View style={[styles.row, styles.mt15]}>
      {
        <TouchableOpacity style={[style.button, styles.bgPrimary, styles.mr10]} activeOpacity={0.9} onPress={onPressTrack}>
          <Text style={[styles.buttonLabel, styles.textCenter, styles.textWhite]}>Track</Text>
        </TouchableOpacity>
      }
      {
        order.is_past_order ? (
          <TouchableOpacity style={[style.button, style.buttonOutline, styles.ml10]} activeOpacity={0.9} onPress={onPressFeedback}>
            <Text style={[styles.buttonLabel, styles.textCenter, styles.textPrimary]}>Feedback</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[style.button, style.buttonOutline, styles.ml10]} activeOpacity={0.9} onPress={onPressRefund}>
            <Text style={[styles.buttonLabel, styles.textCenter, styles.textPrimary]}>Cancel Order</Text>
          </TouchableOpacity>
        )
      }
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  innerContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    marginRight: 10
  },
  image: {
    width: null,
    height: null,
    flex: 1,
  },
  labelSemiBold: {
    fontFamily: 'OpenSans-SemiBold',
    color: colors.dark,
    fontSize: 16
  },
  labelNormal: {
    fontFamily: 'OpenSans-Regular',
    color: colors.dark,
    fontSize: 16
  },
  status: {
    fontFamily: 'OpenSans-SemiBoldItalic',
    color: colors.dark,
    fontSize: 16
  },
  line: {
    width: 75,
    height: 1,
    backgroundColor: colors.dark,
    alignSelf: 'flex-end',
    marginVertical: 10
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5
  },
  buttonOutline: {
    borderColor: colors.primary,
    borderWidth: 1,
  }
});

export default MyOrderCardAlt;