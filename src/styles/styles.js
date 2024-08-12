import { StyleSheet } from 'react-native';
import colors from '../config/colors';

export default StyleSheet.create({
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  row: {
    flexDirection: 'row',
  },
  rowAllCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowBetweenInCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  f8: {
    fontSize: 8,
  },
  f10: {
    fontSize: 10,
  },
  f12: {
    fontSize: 12,
  },
  f14: {
    fontSize: 14,
  },
  f16: {
    fontSize: 16,
  },
  f20: {
    fontSize: 20,
  },
  f24: {
    fontSize: 24,
  },
  fw400: {
    fontWeight: '400'
  },
  m0: {
    margin: 0,
  },
  m10: {
    margin: 10,
  },
  m20: {
    margin: 20,
  },
  m15: {
    margin: 15,
  },
  ml0: {
    marginLeft: 0,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: {
    marginLeft: 20,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr20: {
    marginRight: 20,
  },
  mb0: {
    marginBottom: 0,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh30: {
    marginHorizontal: 30,
  },
  mh40: {
    marginHorizontal: 40,
  },
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20,
  },
  mt0: {
    marginTop: 0,
  },
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mt40: {
    marginTop: 40,
  },
  p0: {
    padding: 0,
  },
  pr5: {
    paddingRight: 5,
  },
  pr10: {
    paddingRight: 10,
  },
  pl5: {
    paddingLeft: 5,
  },
  pl10: {
    paddingLeft: 10,
  },
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  pt10: {
    paddingTop: 10,
  },
  pt15: {
    paddingTop: 15,
  },
  pt20: {
    paddingTop: 20,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv15: {
    paddingVertical: 15,
  },
  pv20: {
    paddingVertical: 20,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb20: {
    paddingBottom: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textMuted: {
    color: '#9B9B9B',
  },
  textWhite: {
    color: 'white',
  },
  textRed: {
    color: 'red',
  },
  bgPrimary: {
    backgroundColor: colors.primary,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  bgGrey: {
    backgroundColor: '#9B9B9B',
  },
  button: {
    width: 160,
    height: 48,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonLabel: {
    fontFamily: 'OpenSans-Bold',
  },
  buttonLight: {
    backgroundColor: '#fff',
    color: colors.primary,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    color: '#fff',
  },
  borderBottomHairline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8B8B8B'
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'OpenSans-Bold'
  },
  allLink: {
    color: colors.primary,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    marginVertical: 15
  },
  h1: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: 'black'
  },
  h6Light: {
    fontFamily: 'SFUIDisplay-Light',
    fontSize: 10,
    color: 'black'
  },
  textPrimary: {
    color: colors.primary
  },
  borderPrimary: {
    borderColor: colors.primary
  },
  desc: {
    fontSize: 14,
    fontFamily: 'SFUIDisplay-Light',
    color: '#8D8D8D',
    marginTop: 20,
    width: 300
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    marginTop: 30
  },
  heading: {
    backgroundColor: colors.primary,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  bold: {
    fontFamily: 'OpenSans-Bold'
  },
  normal: {
    fontFamily: 'OpenSans-Regular'
  },
  dark: {
    color: '#333333'
  },
  btnPrimary: {
    color: 'white',
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    overflow: 'hidden'
  },
  btnPrimaryOutline: {
    color: colors.primary,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    overflow: 'hidden',
    borderWidth: 1
  },
  headerRightBtnText: {
    marginRight: 10,
    color: colors.primary,
    fontFamily: 'OpenSans-Bold',
    fontSize: 12
  },
  underline: {
    textDecorationLine: 'underline'
  },
  regular: {
    fontFamily: 'OpenSans-Regular'
  },
  semiBold: {
    fontFamily: 'OpenSans-SemiBold'
  },
  italic: {
    fontFamily: 'OpenSans-Italic'
  },
  textPrimary: {
    color: colors.primary
  },
  halfwidth: {
    width: '50%'
  }
});
