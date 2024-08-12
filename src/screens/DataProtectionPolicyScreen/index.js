import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import api from '../../config/api';
import Request from '../../helper/Request';
import styles from '../../styles/styles';

const DataProtectionPolicyScreen = () => {
  const { width } = useWindowDimensions();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const response = await Request.backend('GET', api.GET_DATA_PROTECTION_POLICY);
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

export default DataProtectionPolicyScreen;