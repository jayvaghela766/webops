import React, { useCallback, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AddressCard from '../../components/AddressCard';
import AuthContext from '../../context/AuthContext';
import styles from '../../styles/styles';
import Address from '../../models/Address';
import Storage from '../../helper/Storage';

const AddressScreen = ({ navigation }) => {
  const nav = useNavigation();
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AddAddressScreen')}>
          <Text style={styles.headerRightBtnText}>Add Address</Text>
        </TouchableOpacity>
      ),
    });
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchMyAddresses();
    }, [])
  );

  const fetchMyAddresses = async () => {
    try {
      const addresses = await Address.mine();
      const currentAuth = {
        ...auth,
        ...addresses
      };

      setAuth(currentAuth);
      await Storage.set('user', currentAuth);
    } catch (error) {
      console.log('error fetchMyAddresses', error);
    }
  };

  return (
    <View style={[]}>
      <FlatList
        data={auth.addresses}
        keyExtractor={(item) => item.first_name + item.id}
        renderItem={({ item }) => (
          <AddressCard
            name={`${item.first_name} ${item.last_name}`}
            phone={item.phone}
            address={item.address}
            addressDetail={item.address_detail}
            postalCode={item.postal_code}
            addressType={item.address_type.name}
            isDefault={item.is_default == 1}
            onEdit={() => navigation.navigate('EditAddressScreen', { address: item })}
          />
        )}
      />
    </View>
  );
};

export default AddressScreen;