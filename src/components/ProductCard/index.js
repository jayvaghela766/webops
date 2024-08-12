import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {verticalScale} from '../../helper/Utils';

const {width} = Dimensions.get('window');

const ProductCard = ({
  name,
  unit,
  packageName,
  amountPerPackage,
  price,
  onPress,
  imageUrl,
  containerStyle,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[style.card, containerStyle]}
    onPress={onPress}>
    <View style={style.imageContainer}>
      <Image source={{uri: imageUrl}} style={style.image} />
    </View>
    <View style={style.titleContainer}>
      <Text style={[style.title]}  numberOfLines={2} numColumns={2}>{name}</Text>
    </View>
    {unit && packageName && amountPerPackage ? (
      <Text
        style={[
          style.content,
        ]}>{`${amountPerPackage} ${unit} per ${packageName}`}</Text>
    ) : (
      <Text>{`-`}</Text>
    )}
    <TouchableOpacity activeOpacity={0.9}>
      <Text style={[style.price]}>{price}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  card: {
    // alignItems: 'flex-start',
    // width: 150,
    marginBottom: 10,
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: 'white',
    elevation: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.65,
  },
  image: {
    width: width / 4,
    height: width / 4,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  content: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
    color: '#000',
    fontSize: 12,
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 12,
  },
  titleContainer: {
    minHeight: Platform.OS === 'ios' ? verticalScale(42) : verticalScale(37),
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'hidden',
    flexDirection: 'row',
  },
});

export default ProductCard;
