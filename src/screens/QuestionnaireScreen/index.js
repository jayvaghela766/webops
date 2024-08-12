import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Questionnaire from '../../models/Questionnaire';
import styles from '../../styles/styles';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import Option from './components/Option';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from '../../hoc/Spinner';
import Features from '../../helper/Features';

const QuestionnaireScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const questions = await Questionnaire.getQuestions();
    setIsLoading(false);
    setQuestions(questions);
    if (questions.length) {
      questions[questionIndex].question = questions[questionIndex].question.replace(/\\n/g, '\n');
      setQuestion(questions[questionIndex]);
      setOptions(questions[questionIndex].options)
    }
  };

  const onSelectOption = (option) => {
    setSelectedOption(option);
  };

  const reset = () => {
    setQuestionIndex(0);
    setQuestion(questions[0]);
    setOptions(questions[0].options)

    setSelectedOptions([]);
    setSelectedOption();
  };

  const submit = async () => {
    if (!selectedOption) {
      return Features.toast('Please choose your answer', 'info');
    }

    const currentAnswered = [...selectedOptions];
    if (selectedOptions.length < questions.length) {
      currentAnswered.push(selectedOption.id);
      setSelectedOptions(currentAnswered);
    }

    if (selectedOption.next_question_id) {
      const nextQuestion = questions.find(({ id }) => id === parseInt(selectedOption.next_question_id));
      nextQuestion.question = nextQuestion.question.replace(/\\n/g, '\n');

      setQuestion(nextQuestion);
      setOptions(nextQuestion.options)
      setQuestionIndex((prev) => prev + 1);
    } else {
      const answeredOptions = currentAnswered.join(',');
      console.log('answeredOptions', answeredOptions);

      const productRecommendations = await Questionnaire.getProductRecommendation({
        question_option_id: answeredOptions
      });

      if (productRecommendations?.products?.length) {
        navigation.navigate('ProductRecommendation', {
          products: productRecommendations.products
        })
      } else {
        Features.toast(productRecommendations.message, 'info');
      }

    }
  };

  if (isLoading) {
    return <Spinner isLoading />
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.p20}
      >
        <View style={[styles.mb30]}>
          <Header
            title={questionIndex < questions.length - 1 ? 'Let\'s Start' : 'Almost there...'}
            totalStep={questions.length}
            currentStep={questionIndex + 1}
          />
          <ProgressBar
            length={questions.length}
            currentIndex={questionIndex}
          />
        </View>
        <Text style={style.question}>{question.question}</Text>
        {
          options.map((option) => (
            <Option
              key={`option-${option.id}`}
              text={option.option}
              onPress={() => onSelectOption(option)}
              active={option.id === selectedOption?.id}
            />
          ))
        }
        <TouchableOpacity style={[styles.mv20]} activeOpacity={0.9} onPress={submit}>
          <Text style={[styles.btnPrimary, styles.bold]}>
            {questionIndex < options.length - 1 ? 'Next' : 'Submit'}
          </Text>
        </TouchableOpacity>

        {
          questionIndex > 0 && (
            <TouchableOpacity activeOpacity={0.9} onPress={reset}>
              <Text style={[styles.textCenter, styles.semiBold, styles.f16]}>Reset</Text>
            </TouchableOpacity>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  question: {
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 30,
  }
});

export default QuestionnaireScreen;