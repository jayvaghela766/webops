import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import api from '../../config/api';
import Request from '../../helper/Request';
import styles from '../../styles/styles';

const TermsAndConditionScreen = () => {
  const { width } = useWindowDimensions();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const response = await Request.backend('GET', api.GET_TERM_AND_CONDITION);
    if (response.content) {
      setContent(response.content);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ph20}>
      <RenderHTML
        contentWidth={width}
        source={{ html: content }}
      />
    </ScrollView>
  );
};

export default TermsAndConditionScreen;