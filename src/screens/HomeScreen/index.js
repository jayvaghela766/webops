import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import FeaturedProductCard from '../../components/FeaturedProductCard';
import HomeCarousel from '../../components/HomeCarousel';
import NewsCard from '../../components/NewsCard.js';
import ProductCard from '../../components/ProductCard';
import ServiceCard from '../../components/ServiceCard';
import Service from '../../models/Service';
import Article from '../../models/Article';
import Product from '../../models/Product';
import FeaturedBrand from '../../models/FeaturedBrand';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import Appointment from '../../models/Appointment';
import AuthContext from '../../context/AuthContext';
import HomepageBanner from '../../components/HomepageBanner';
import AppointmentCard from '../../components/AppointmentCard';
import AppointmentStatusTab from '../../components/AppointmentStatusTab';
import AppointmentCTA from '../../components/AppointmentCTA';
import ModalOfferAppoinment from '../../components/ModalOfferAppoinment';
import colors from '../../config/colors';
import Request from '../../helper/Request';
import api from '../../config/api';
import Epb from '../../helper/Epb';

const HomeScreen = ({navigation, route}) => {
  const {auth} = useContext(AuthContext);
  const {width} = useWindowDimensions();
  const [appointmentTab, setAppointmentTab] = useState('upcoming');
  const [services, setServices] = useState([]);
  const [articles, setArticles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAppointmentOffer, setShowAppointmentOffer] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [homepageNotice, setHomepageNotice] = useState();
  useEffect(() => {
    fetchHomeScreen();
  }, []);

  useEffect(() => {
    if (route.params?.orderCode) {
      setOrderCode(route.params.orderCode);
      // not used anymore because they change to manual sync
      // sendUpdatedOrderDataToEpb(route.params.orderCode);
    }

    setShowAppointmentOffer(route.params?.isRequestAppoinment);
  }, [route.params]);

  useEffect(() => {
    fetchMyAppointment();
  }, [route.params?.fetchAppointment, appointmentTab]);

  const fetchHomeScreen = async () => {
    setIsLoading(true);
    await fetchNotice();
    await fetchServices();
    await fetchArticles();
    await fetchProducts();
    await fetchFeaturedBrands();
    await fetchMyAppointment();
    setIsLoading(false);
  };

  const fetchNotice = async () => {
    const response = await Request.backend('GET', api.GET_HOMEPAGE_NOTICE);
    if (response) {
      setHomepageNotice(response);
    } else {
      setHomepageNotice();
    }
  };

  const fetchMyAppointment = async () => {
    const response = await Appointment.mine(appointmentTab);
    if (response.has_appointment) {
      if (response.data) {
        setAppointments(response.data);
      }
    } else {
      setAppointments([]);
    }
  };

  const fetchServices = async () => {
    const services = await Service.get();
    setServices(services);
  };

  const fetchArticles = async () => {
    const articles = await Article.get();
    setArticles(articles);
  };

  const fetchFeaturedBrands = async () => {
    const featuredBrands = await FeaturedBrand.get();
    setFeaturedBrands(featuredBrands);
  };

  const fetchProducts = async () => {
    const products = await Product.all();
    if (products.data) {
      setProducts(products.data.slice(0, 10));
    }
  };

  const articleDetail = article => {
    navigation.navigate('ArticleDetailScreen', {article});
  };

  const serviceDetail = service => {
    navigation.navigate('ServiceDetailScreen', {service});
  };

  const productDetail = product => {
    navigation.navigate('ProductDetailScreen', {product});
  };

  const createAppointment = () => {
    navigation.navigate('MyAppointmentScreen', {
      screen: 'AddAppointmentScreen',
    });
  };

  const onPressCta = () => {
    if (homepageNotice.screen) {
      const redirection = JSON.parse(homepageNotice.screen);
      navigation.navigate(redirection.screen, {...redirection.params});
    }
  };

  // not used anymore because they change to manual sync
  const sendUpdatedOrderDataToEpb = async orderCode => {
    const response = await Request.backend(
      'GET',
      `${api.GET_EPB_ORDER_PARAMS}/${orderCode}`,
    );
    Epb.request(response);
  };

  return (
    <NavigationHOC
      navigation={navigation}
      containerStyle={styles.p0}
      isLoading={isLoading}
      onRefresh={fetchHomeScreen}>
      {homepageNotice && (
        <TouchableOpacity
          style={[style.headerCTA]}
          onPress={onPressCta}
          activeOpacity={0.9}>
          <Text style={[styles.textWhite, styles.normal]}>
            {homepageNotice.message}
          </Text>
        </TouchableOpacity>
      )}
      {/* <HeaderCTA
        title="Subscribe to W OPTICS now and enjoy 10% off!"
        content={'T&Cs apply!'}
      /> */}
      <HomepageBanner />
      <View style={[styles.ph20, {marginTop: 15}]}>
        <AppointmentCTA onPressBook={createAppointment} />
        <AppointmentStatusTab
          status={appointmentTab}
          setStatus={setAppointmentTab}
          hidePast
        />
      </View>
      {appointments.length ? (
        <>
          <AppointmentCard
            status={appointmentTab}
            store={appointments[0]?.appointment_type_time?.store.name}
            startAt={appointments[0]?.appointment_type_time?.start_at}
            endAt={appointments[0]?.appointment_type_time?.end_at}
            date={appointments[0]?.preferred_date}
            onPressDetail={() =>
              navigation.navigate('AppointmentDetailScreen', {
                appointment: appointments[0],
              })
            }
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('MyAppointmentScreen')}>
            <Text style={styles.allLink}>{'See more Appointments >>'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.textCenter, styles.textMuted]}>
          No Appointment
        </Text>
      )}
      <View style={[styles.p20]}>
        <View style={[styles.mb20, style.borderBottom]}>
          <Text style={style.heading}>Services</Text>
          <HomeCarousel
            data={services}
            renderItem={item => (
              <ServiceCard
                key={item.slug}
                onPress={() => serviceDetail(item)}
                imageUrl={item.thumbnail_url}
                title={item.title}
                containerStyle={item !== services.length - 1 ? styles.mr5 : {}}
              />
            )}
            useRegularScrollView
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ServiceScreen')}>
            <Text style={styles.allLink}>{'More Services >>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mb20, style.borderBottom]}>
          <Text style={style.heading}>E-Shop</Text>
          <HomeCarousel
            data={products}
            renderItem={product => (
              <ProductCard
                key={product.slug}
                containerStyle={{width: width / 2.5, marginRight: 20}}
                onPress={() => productDetail(product)}
                name={product.name}
                price={
                  product.product_prices.length
                    ? `SGD $${product.product_prices[0].price}`
                    : 'No Information'
                }
                unit={product.unit?.name}
                packageName={product.package?.name}
                amountPerPackage={product.amount_per_package}
                imageUrl={product.thumbnail_url}
              />
            )}
            useRegularScrollView
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductScreen')}>
            <Text style={styles.allLink}>{'Shop More >>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mb20, style.borderBottom]}>
          <Text style={style.heading}>Featured Products</Text>
          <HomeCarousel
            data={featuredBrands}
            renderItem={item => (
              <FeaturedProductCard
                key={item.title}
                brand={item.brand.name}
                title={item.title}
                imageUrl={item.thumbnail_url}
                containerStyle={
                  item !== featuredBrands.length - 1 ? styles.mr5 : {}
                }
              />
            )}
            useRegularScrollView
          />
        </View>
        <View style={[styles.mb20]}>
          <Text style={style.heading}>Happenings</Text>
          <HomeCarousel
            data={articles}
            renderItem={item => (
              <NewsCard
                key={item.slug}
                title={item.title}
                date={moment(item.created_at).format('DD MMMM YYYY')}
                articleType={item.article_type.name}
                imageUrl={item.thumbnail_url}
                onPress={() => articleDetail(item)}
                containerStyle={item !== articles.length - 1 ? styles.mr5 : {}}
              />
            )}
            useRegularScrollView
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('HappeningScreen')}>
            <Text style={styles.allLink}>{'Read More >>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalOfferAppoinment
        show={showAppointmentOffer}
        onClose={() => setShowAppointmentOffer(false)}
        orderCode={orderCode}
      />
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 10,
  },
  borderBottom: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerCTA: {
    backgroundColor: colors.dark,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeScreen;
