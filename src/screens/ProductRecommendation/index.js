import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Questionnaire from '../../models/Questionnaire';
import styles from '../../styles/styles';
import ProductCard from './components/ProductCard';

const ProductRecommendation = ({ navigation, route }) => {
  const products = route.params?.products || [];

  const onPress = (item) => {
    const response = Questionnaire.storeUserQuestionnaire({
      product_recommendation_id: item.product_recommendation_id
    });

    navigation.navigate('ProductDetailScreen', { product: item.product })
  };

  return (
    <SafeAreaView style={[styles.flex1]}>
      <View style={style.container}>
        <Text style={[style.heading]}>Here is what we recommend for you</Text>
        <View style={style.cardContainer}>
          {
            products.map((item) => (
              <ProductCard
                key={`ProductCard-${item.product_recommendation_id}`}
                title={item.product.name}
                thumbnail={item.product.thumbnail_url}
                content={item.product.content}
                price={item.product.product_prices.length ? `SGD $${Number(item.product.product_prices[0].price).toFixed(2)}` : 'No Information'}
                onPress={() => onPress(item)}
              />
            ))
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});

export default ProductRecommendation;