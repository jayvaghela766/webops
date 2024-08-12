import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomepageBanner from '../../components/HomepageBanner';
import ProductCategoryCard from '../../components/ProductCategoryCard';
import NavigationHOC from '../../hoc/NavigationHOC';
import Product from '../../models/Product';
import styles from '../../styles/styles';

const ShopScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const categories = await Product.categories();
    setCategories(categories)
    setIsLoading(false);
  }

  const showProducts = (category) => {
    navigation.navigate('ProductScreen', { category });
  };

  return (
    <NavigationHOC
      navigation={navigation}
      containerStyle={[styles.p0]}
      isLoading={isLoading}
      onRefresh={fetchCategories}
    >
      <HomepageBanner />
      <View style={[styles.p20]}>
        <Text style={style.title}>E-Shop</Text>
        {
          categories.map((category) => (
            <ProductCategoryCard
              key={category.slug}
              title={category.name}
              subtitle={category.subtitle}
              imageUrl={category.thumbnail_url}
              containerStyle={styles.mb15}
              onPress={() => showProducts(category)}
            />
          ))
        }
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 130
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginBottom: 10
  }
})

export default ShopScreen;