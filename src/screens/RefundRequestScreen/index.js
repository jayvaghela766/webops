import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Refund from '../../models/Refund';
import MyTextareaInput from '../../components/MyTextareaInput';
import MyPickerInput from '../../components/MyPickerInput';
import Spinner from '../../hoc/Spinner';
import styles from '../../styles/styles';
import Features from '../../helper/Features';
import colors from '../../config/colors';
import RefundCard from '../../components/RefundCard';

const refundOptions = [
  {
    label: 'Purchased wrong item',
    value: 'Purchased wrong item',
  },
  {
    label: 'Wrong item delivered',
    value: 'Wrong item delivered',
  },
  {
    label: 'Bad condition of item received',
    value: 'Bad condition of item received',
  }
];

const RefundRequestScreen = ({ navigation, route }) => {
  const [order, setOrder] = useState({
    order_address_shipping: {},
    order_details: []
  });

  const [refundQuantity, setRefundQuantity] = useState({});
  const [reason, setReason] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    if (route.params?.order) {
      setOrder(route.params.order);
    }
  }, [route.params]);

  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });

      console.log(res);
      if (res.length) {
        setAttachment(res[0]);
      }
    } catch (err) {
      console.log('openFilePicker', err);
    }
  }

  const refundRequest = async () => {
    let items = Object.keys(refundQuantity);
    if (!items.length) {
      Features.toast('Please select at least one item to refund', 'error');
      return;
    }

    if (!reason) {
      Features.toast('Please select your reason to refund', 'error');
      return;
    }

    const formData = new FormData;
    formData.append('code', order.code);
    formData.append('reason', reason);
    formData.append('attachment', attachment);

    Object.keys(refundQuantity).forEach((orderDetailId, index) => {
      formData.append(`items[${index}][order_detail_id]`, orderDetailId);
      formData.append(`items[${index}][quantity]`, refundQuantity[orderDetailId]);
    });

    setIsLoading(true);
    const response = await Refund.store(formData);
    if (response.errors) {
      const keys = Object.keys(response.errors);
      Features.toast(response.errors[keys[0]].join(','), 'error');
    } else {
      Features.toast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        navigation.navigate('MyOrderScreen', {
          fetchDetail: true
        })
      }
    }
    setIsLoading(false);
  };

  return (
    <Spinner style={[styles.flex1]} isLoading={isLoading}>
      <View style={[styles.row, styles.alignItemsCenter, styles.ph10]}>
        <Text style={[style.heading, styles.flex2]}>Refund Order</Text>
        <TouchableOpacity style={[styles.flex1]} activeOpacity={0.9} onPress={() => navigation.navigate('ContactUsScreen')}>
          <Text style={style.contactUs}>Contact Us</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[style.section, styles.mt10]}>
            <RefundCard
              order={order}
              items={order.order_details}
              setRefundQuantity={setRefundQuantity}
            />
          </View>
          <View style={[style.section]}>
            <View>
              <Text style={[styles.bold, styles.f16, styles.dark, styles.mb10]}>Reason of Refund Request</Text>
              <MyPickerInput
                data={refundOptions}
                onValueChange={setReason}
                value={reason}
                placeholder="Select reason"
                containerStyle={styles.mb20}
              />
              {/* <MyTextareaInput
                placeholder="Describe your reason here"
                onChangeText={setReason}
                value={reason}
              /> */}
            </View>
            <View>
              <Text style={[styles.bold, styles.f16, styles.dark]}>{'Attach Image (if any)'}</Text>
              <Text style={[styles.italic, styles.f14, styles.ml10, styles.fw400]}>You may choose to attach an image of your received item.</Text>
              <TouchableOpacity style={[styles.mt10]} activeOpacity={0.9} onPress={openFilePicker}>
                <Text style={style.btnAttachment}>{'Choose File'}</Text>
              </TouchableOpacity>
            </View>
            {
              attachment && (
                <View style={[styles.mt10]} >
                  <TouchableOpacity style={[styles.mb5]} activeOpacity={0.9} onPress={() => setAttachment()}>
                    <Text style={style.btnRefund}>{attachment.name.length > 50 ? attachment.name.substr(0, 50) : attachment.name}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.normal, styles.f10]}>Tap to remove attachment</Text>
                </View>
              )
            }
            <View style={[styles.row, styles.mt40]}>
              <TouchableOpacity style={[styles.flex1]} activeOpacity={0.9} onPress={refundRequest}>
                <Text style={[styles.btnPrimaryOutline, styles.mr10, styles.bold]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.flex1]} activeOpacity={0.9} onPress={refundRequest}>
                <Text style={[styles.btnPrimary, styles.ml10, styles.bold]}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Spinner>
  )
};

const style = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  btnRefund: {
    alignSelf: 'flex-start',
    color: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary
  },
  btnAttachment: {
    alignSelf: 'flex-start',
    color: colors.dark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.dark,
    fontFamily: 'OpenSans-Bold'
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 10
  },
  contactUs: {
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold'
  },
});

export default RefundRequestScreen;