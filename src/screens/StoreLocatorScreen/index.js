import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import styles from '../../styles/styles';
import Store from '../../models/Store';
import MyPickerInput from '../../components/MyPickerInput';
import StoreCard from '../../components/StoreCard';
import NavigationHOC from '../../hoc/NavigationHOC';

const StoreLocatorScreen = ({ navigation }) => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [area, setArea] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchStores();
  }, [page]);

  useEffect(() => {
    onSearch();
  }, [area]);

  const fetchStores = async () => {
    const response = await Store.all(page, {
      per_page: 30
    });

    if (response.data.length) {
      const newStoreList = [...stores, ...response.data];
      setStores(newStoreList);
      setFilteredStores(newStoreList);
      setPage(response.current_page);
    }
  };

  const onSearch = () => {
    let filteredStores = [...stores];
    if (area) {
      filteredStores = filteredStores.filter(({ area_store_id }) => parseInt(area_store_id) === parseInt(area));
    }

    setFilteredStores(filteredStores);
  };

  return (
    <NavigationHOC navigation={navigation} containerStyle={[styles.p0]} disableScrollView>
      <View style={[styles.flex1, styles.bgWhite, styles.ph15, Platform.OS === 'android' ? styles.pt15 : {}, styles.mb30]}>
        <MyPickerInput
          data={Store.AREAS}
          onValueChange={setArea}
          value={area}
          placeholder="All Stores"
        />
        <Text style={style.pageTitle}>Store Locator</Text>
        <FlatList
          data={filteredStores}
          keyExtractor={(item) => item.name + item.id}
          renderItem={({ item }) => (
            <StoreCard
              name={item.name}
              address={item.address}
              contactNumber={item.contact_number}
              email={item.email}
              opens={item.store_times}
              latitude={item.latitude}
              longitude={item.longitude}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    borderBottomColor: '#7f7f7f',
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    marginVertical: 15
  }
})

export default StoreLocatorScreen;