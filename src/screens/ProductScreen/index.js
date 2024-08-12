import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatGrid } from 'react-native-super-grid';
import Modal from 'react-native-modal';
import FilterIcon from '../../../assets/icons/filter.svg';
import ProductCard from '../../components/ProductCard';
import Checkbox from '../../components/Checkbox';
import ButtonPrimary from '../../components/ButtonPrimary';
import NavigationHOC from '../../hoc/NavigationHOC';
import Product from '../../models/Product';
import styles from '../../styles/styles';
import FilterButton from '../../components/FilterButton';
import Brand from '../../models/Brand';
import LensType from '../../models/LensType';
import LensUsage from '../../models/LensUsage';
import colors from '../../config/colors';

const FILTERS = {
  RECENT: 'total_viewed=desc',
  PROMOTION: 'promotion=true',
  PRICE_ASC: 'price=asc',
  PRICE_DESC: 'price=desc'
};

const ProductScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filters, setFilters] = useState([]);
  const [brands, setBrands] = useState([]);
  const [lensTypes, setLensTypes] = useState([]);
  const [lensUsages, setLensUsages] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedLensTypes, setSelectedLensTypes] = useState([]);
  const [selectedLensUsages, setSelectedLensUsages] = useState([]);
  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchBrands();
    fetchLensTypes();
    fetchLensUsages();
  }, []);

  // handle infinite scroll
  // the first page will handled by filters below. so we dont have redundant api call that cause issue
  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  useEffect(() => {
    fetchProducts(1)
  }, [filters, searchTerm]);

  useEffect(() => {
    if (!searchBar) {
      setSearchTerm();
    }
  }, [searchBar]);

  // will handle fetch data between product category navigation
  useFocusEffect(
    useCallback(() => {
      if (route.params?.category) {
        setCategoryName(route.params?.category.name.toLowerCase());
        fetchProducts(1);
      }
    }, [route.params])
  );

  const fetchBrands = async () => {
    const data = await Brand.get();
    setBrands(data);
  };

  const fetchLensTypes = async () => {
    const data = await LensType.get();
    setLensTypes(data);
  };

  const fetchLensUsages = async () => {
    const data = await LensUsage.get();
    setLensUsages(data);
  };

  const fetchProducts = async (preferredPage) => {
    const params = {
      category_product_id: route.params?.category.id || null,
      brand_ids: selectedBrands.map(({ id }) => id).join(','),
      lens_type_ids: selectedLensTypes.map(({ id }) => id).join(','),
      lens_usage_ids: selectedLensUsages.map(({ id }) => id).join(','),
      search: searchTerm || null,
      per_page: 30,
    };

    filters.forEach(item => {
      const split = item.split('=');
      const field = split[0];
      const value = split[1];
      params[field] = value;
    });

    console.log('preferredPage || page', preferredPage || page);
    console.log('params', params);

    const response = await Product.all(preferredPage || page, params);
    if (response.data.length) {
      if (response.current_page === 1) {
        setProducts(response.data);
      } else {
        setProducts([...products, ...response.data]);
      }
      setPage(response.current_page);
      setHasNextPage(response.next_page_url !== null)
    } else {
      setProducts([]);
    }
  };

  const onChangeFilter = (value) => {
    const data = [...filters];
    const selectedIndex = data.indexOf(value);

    if (selectedIndex !== -1) {
      data.splice(selectedIndex, 1);
    } else {
      data.push(value);
    }

    if (value === FILTERS.PRICE_ASC) {
      const filterDescIndex = data.indexOf(FILTERS.PRICE_DESC);
      if (filterDescIndex !== -1) {
        data.splice(filterDescIndex, 1);
      }
    } else if (value === FILTERS.PRICE_DESC) {
      const filterAscIndex = data.indexOf(FILTERS.PRICE_ASC);
      if (filterAscIndex !== -1) {
        data.splice(filterAscIndex, 1);
      }
    }

    setFilters(data);
  };

  const onChangeFilterBrand = (value) => {
    const filter = selectedBrands.filter((item) => item.id === value.id);
    if (filter.length) {
      const data = [...selectedBrands];
      const index = selectedBrands.indexOf(filter[0]);
      data.splice(index, 1);
      setSelectedBrands(data);
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const onChangeFilterLensType = (value) => {
    const filter = selectedLensTypes.filter((item) => item.id === value.id);
    if (filter.length) {
      const data = [...selectedLensTypes];
      const index = selectedLensTypes.indexOf(filter[0]);
      data.splice(index, 1);
      setSelectedLensTypes(data);
    } else {
      setSelectedLensTypes([...selectedLensTypes, value]);
    }
  };

  const onChangeFilterLensUsage = (value) => {
    const filter = selectedLensUsages.filter((item) => item.id === value.id);
    if (filter.length) {
      const data = [...selectedLensUsages];
      const index = selectedLensUsages.indexOf(filter[0]);
      data.splice(index, 1);
      setSelectedLensUsages(data);
    } else {
      setSelectedLensUsages([...selectedLensUsages, value]);
    }
  };

  const onEndReached = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const onApplyFilter = () => {
    setShowAdvanceFilter(false);
    fetchProducts(1);
  };

  const resetFilter = () => {
    setFilters([]);
    setSelectedBrands([]);
    setSelectedLensTypes([]);
    setSelectedLensUsages([]);
    fetchProducts(1);
  };

  const productDetail = (product) => {
    navigation.navigate('ProductDetailScreen', { product });
  };

  return (
    <NavigationHOC navigation={navigation} disableScrollView>
      <View style={[styles.p10, { marginBottom: 200 }]}>
        <View style={[styles.rowBetweenInCenter, styles.alignItemsCenter, styles.mh10, styles.mb15]}>
          <Text style={style.heading}>{route.params?.category.name || 'Products'}</Text>
          <View style={[styles.row, styles.alignItemsCenter, styles.justifyCenter, styles.ml20]}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => setSearchBar((prev) => !prev)}>
              <Icon name="magnify" size={20} color={colors.dark} />
            </TouchableOpacity>
            {
              searchBar && (
                <TextInput
                  style={style.search}
                  placeholder="Search..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              )
            }
          </View>
        </View>
        <View style={[styles.mb10]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10, alignItems: 'center' }}>
            <FilterButton
              label={<FilterIcon width={16} height={16} />}
              containerStyle={[styles.mr5]}
              onPress={() => setShowAdvanceFilter(true)}
              selected={selectedBrands.length > 0 || selectedLensTypes.length > 0 || selectedLensUsages.length > 0}
            />
            <FilterButton
              label="Recent"
              containerStyle={[styles.mr5]}
              onPress={() => onChangeFilter(FILTERS.RECENT)}
              selected={filters.indexOf(FILTERS.RECENT) !== -1}
            />
            <FilterButton
              label="Promotions"
              containerStyle={[styles.mr5]}
              onPress={() => onChangeFilter(FILTERS.PROMOTION)}
              selected={filters.indexOf(FILTERS.PROMOTION) !== -1}
            />
            <FilterButton
              label="Price - Low to High"
              containerStyle={[styles.mr5]}
              onPress={() => onChangeFilter(FILTERS.PRICE_ASC)}
              selected={filters.indexOf(FILTERS.PRICE_ASC) !== -1}
            />
            <FilterButton
              label="Price - High to Low"
              onPress={() => onChangeFilter(FILTERS.PRICE_DESC)}
              selected={filters.indexOf(FILTERS.PRICE_DESC) !== -1}
              containerStyle={[styles.mr10]}
            />
            <Text style={[styles.bold, styles.textPrimary]} onPress={resetFilter}>Reset</Text>
          </ScrollView>
        </View>
        <FlatGrid
          data={products}
          keyExtractor={(item) => item.slug + item.id}
          renderItem={({ item }) => (
            <ProductCard
              onPress={() => productDetail(item)}
              name={item.name}
              price={item.product_prices.length ? `S$${Number(item.product_prices[0].price).toFixed(2)}` : 'No Information'}
              unit={item.unit?.name}
              packageName={item.package?.name}
              amountPerPackage={item.amount_per_package}
              imageUrl={item.thumbnail_url}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
        />
      </View>
      <Modal
        isVisible={showAdvanceFilter}
        backdropColor="#fff"
        backdropOpacity={1}
      >
        <View style={[styles.bgWhite]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => setShowAdvanceFilter(false)}
              activeOpacity={0.9}
              style={{ alignSelf: 'flex-end', marginTop: Platform.OS === 'ios' ? 20 : 0 }}
            >
              <Icon name="close" size={24} color="#5F5F5F" />
            </TouchableOpacity>
            <Text style={[styles.bold, styles.f16, styles.f16, styles.mv20]}>Brands</Text>
            {
              brands.map((brand) => (
                <View style={[styles.row, styles.alignItemsCenter, styles.justifySpaceBetween, styles.mb20]} key={`brand-${brand.id}`}>
                  <Text style={[styles.normal, styles.f16, styles.dark]}>{brand.name}</Text>
                  <Checkbox
                    onPress={() => onChangeFilterBrand(brand)}
                    checked={selectedBrands.indexOf(brand) !== -1}
                  />
                </View>
              ))
            }
            {
              (categoryName.includes('lens') && !categoryName.includes('frame')) && (
                <>
                  <Text style={[styles.bold, styles.f16, styles.f16, styles.mv20]}>Lens Type</Text>
                  {
                    lensTypes.map((lensType) => (
                      <View style={[styles.row, styles.alignItemsCenter, styles.justifySpaceBetween, styles.mb20]} key={`lens-${lensType.id}`}>
                        <Text style={[styles.normal, styles.f16, styles.dark]}>{lensType.name}</Text>
                        <Checkbox
                          onPress={() => onChangeFilterLensType(lensType)}
                          checked={selectedLensTypes.indexOf(lensType) !== -1}
                        />
                      </View>
                    ))
                  }
                  <Text style={[styles.bold, styles.f16, styles.f16, styles.mv20]}>Usage</Text>
                  {
                    lensUsages.map((lensUsage) => (
                      <View style={[styles.row, styles.alignItemsCenter, styles.justifySpaceBetween, styles.mb20]} key={`lens-${lensUsage.id}`}>
                        <Text style={[styles.normal, styles.f16, styles.dark]}>{lensUsage.name}</Text>
                        <Checkbox
                          onPress={() => onChangeFilterLensUsage(lensUsage)}
                          checked={selectedLensUsages.indexOf(lensUsage) !== -1}
                        />
                      </View>
                    ))
                  }
                </>
              )
            }
            <ButtonPrimary
              text="Apply"
              onPress={onApplyFilter}
              containerStyle={[styles.mt10]}
            />
          </ScrollView>
        </View>
      </Modal>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  search: {
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default ProductScreen;