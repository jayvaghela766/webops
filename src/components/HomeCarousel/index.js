import React, { useRef } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const HomeCarousel = ({ data, renderItem, useRegularScrollView }) => {
  const ref = useRef();
  const { width } = useWindowDimensions();

  if (useRegularScrollView) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        { data.map(renderItem) }
      </ScrollView>
    );
  }

  return (
    <Carousel
      ref={ref}
      data={data}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={160}
      firstItem={1}
      inactiveSlideScale={1}
      inactiveSlideOpacity={0.9}
    />
  )
};

HomeCarousel.defaultProps = {
  data: []
};

export default HomeCarousel;