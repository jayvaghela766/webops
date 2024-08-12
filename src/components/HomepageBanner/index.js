import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import api from '../../config/api';
import Request from '../../helper/Request';
import ImageCarousel from "../ImageCarousel";

const { width: windowWidth } = Dimensions.get('window');

const HomepageBanner = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const { data } = await Request.backend('GET', `${api.GET_HOMEPAGE_BANNER}`);
      setImages(data);
    } catch (err) {
      console.log('error HomepageBanner@get', err);
      return [];
    }
  };

  return (
    <ImageCarousel
      images={images}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.9}>
          <Image source={{ uri: item.image_url }} style={style.bannerImage} />
        </TouchableOpacity>
      )}
    />
  );
};

const style = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: windowWidth * 834 / 2344
  },
});

export default HomepageBanner;