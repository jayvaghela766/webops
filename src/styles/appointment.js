import { StyleSheet } from "react-native"
import colors from "../config/colors";

export default StyleSheet.create({
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
    width: '80%'
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 20,
  },
  label: {
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    color: 'white',
    marginRight: 10
  },
  bookForOtherBtn: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10
  },
  bookForOtherLabel: {
    color: colors.primary,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
  },
  modalBg: {
    padding: 10,
    justifyContent: 'center',
    marginBottom: 30
  },
  confirmText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center'
  },
  bookDate: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  description: {
    fontFamily: 'OpenSans-Italic'
  }
});
