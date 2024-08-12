import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from '../../config/colors';
const { width: viewportWidth } = Dimensions.get('window');

const ImageCarousel = ({ images, renderItem }) => {
  const [active, setActive] = useState(0);
  const ref = useRef();
  return (
    <>
      <Carousel
        ref={ref}
        data={images}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        firstItem={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.9}
        onSnapToItem={(index) => setActive(index)}
        autoplay={true}
        autoplayDelay={3000}
        autoplayInterval={3000}
      />
      <Pagination
        carouselRef={ref}
        dotsLength={images.length}
        tappableDots={!!ref}
        activeDotIndex={active}
        containerStyle={style.paginationContainer}
        dotColor={colors.primary}
        inactiveDotColor="rgba(0,0,0,0.5)"
        dotStyle={style.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  )
};

ImageCarousel.defaultProps = {
  images: []
};

const style = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 5,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3
  }
});

export default ImageCarousel;