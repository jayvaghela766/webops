import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  RefreshControl,
  FlatList,
} from 'react-native';
import HomepageBanner from '../../components/HomepageBanner';
import ServiceCardAlt from '../../components/ServiceCardAlt';
import colors from '../../config/colors';
import NavigationHOC from '../../hoc/NavigationHOC';
import Service from '../../models/Service';
import styles from '../../styles/styles';

const ServiceScreen = ({navigation}) => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {width: windowWidth} = Dimensions.get('window');

  useEffect(() => {
    fetchServices();
  }, [page]);

  const fetchServices = async () => {
    const response = await Service.all(page, {
      per_page: 30,
    });

    if (response.data.length) {
      const newServiceList = [...services, ...response.data];
      setServices(newServiceList);
      setPage(response.current_page);
    }
  };

  const onRefresh = async () => {
    setIsLoading(true);
    const response = await Service.all(page, {
      per_page: 30,
    });
    setIsLoading(false);

    if (response.data.length) {
      setServices(response.data);
      setPage(response.current_page);
    }
  };

  const serviceDetail = service => {
    navigation.navigate('ServiceDetailScreen', {service});
  };

  return (
    <NavigationHOC
      navigation={navigation}
      containerStyle={[styles.p0]}
      disableScrollView>
      <View style={[styles.bgWhite, styles.flex1]}>
        <Text style={style.heading}>Services</Text>
        <FlatList
          data={services}
          keyExtractor={item => item.slug}
          renderItem={({item, index}) => (
            <ServiceCardAlt
              onPress={() => serviceDetail(item)}
              imageUrl={item.thumbnail_url}
              title={item.title}
              containerStyle={{
                backgroundColor: index % 2 == 0 ? '#F2FBFF' : '#fff',
              }}
              textColor={{color: colors.primary}}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={() => setPage(prev => prev + 1)}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
          }
          style={{
            marginBottom:
              Platform.OS == 'ios'
                ? (windowWidth * 834) / 2344 + 50
                : (windowWidth * 834) / 2344 + 60,
          }}
        />
      </View>
      <View
        style={{position: 'absolute', bottom: Platform.OS == 'ios' ? 60 : 34}}>
        <HomepageBanner />
      </View>
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default ServiceScreen;
