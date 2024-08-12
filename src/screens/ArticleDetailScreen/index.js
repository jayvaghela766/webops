import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import NavigationHOC from '../../hoc/NavigationHOC';
import styles from '../../styles/styles';
import colors from '../../config/colors';

const ArticleDetailScreen = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [article, setArticle] = useState({
    content: '',
  });

  useEffect(() => {
    if (route.params?.article) {
      setArticle(route.params.article)
    }
  }, [route.params]);

  const idsStyles = {
    orthoMain1:{
      paddingTop:"10px",
      flexWrap: 'wrap',
    },
    orthoMain2:{
      flexDirection: 'column-reverse',
    },
    orthoMain3:{
      flexWrap: 'wrap',
    },
    orthoMain4:{
      flexDirection: 'column-reverse',
    },
  }

  const tagsStyles = {
    a:{
      display:"block",
      backgroundColor: "#306F8C",
      borderRadius: '5px',
      borderColor: 'transparent',
      color: "#fff",
      paddingTop: "0.9rem",
      paddingBottom: "0.9rem",
      marginBottom: "0.5rem",
      fontWeight:'700',
      lineHeight: '1.8',
      border: '1px solid transparent',
      fontSize: '1.2rem',
      textDecorationLine: "none",
      textAlign:"center",
      width:"100%",
      marginLeft:"auto",
      marginRight:"auto",  
    }
  }

  const classStyles = {    
    bauschMainImages:{
      width:"100%",
    },
    bauschImages:{
      marginLeft:"auto",
      marginRight:"auto",
      maxWidth:320,
      width:"100%",
      marginBottom:5
    },
    bausch_custom:{
      fontSize:'16px',
      textAlign:"justify"
    }
  }
  return (
    <NavigationHOC navigation={navigation}>
      <Text style={style.header}>Happenings</Text>
      <Text style={style.title}>{article.title}</Text>
      <View style={[styles.row, styles.alignItemsCenter]}>
        <Text style={style.info}>{`Posted on ${moment(article.create_at).format('MMMM DD, YYYY')} under`}</Text>
        <TouchableOpacity activeOpacity={0.9}>
          <Text style={style.articleType}>{article.article_type?.name}</Text>
        </TouchableOpacity>
      </View>
      <RenderHtml
        contentWidth={width}
        source={{ html: article.content }}
        idsStyles={idsStyles}
        tagsStyles={tagsStyles}
        classesStyles={classStyles}
      />
    </NavigationHOC>
  );
};

const style = StyleSheet.create({
  header: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginBottom: 10
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16
  },
  info: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10
  },
  articleType: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    color: colors.primary,
    marginLeft: 3
  }
});

export default ArticleDetailScreen;