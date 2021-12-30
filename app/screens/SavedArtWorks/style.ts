import { appFonts } from 'components/text';
import { primary, shimmerColor, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: textColor },
  listFooterComponent: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderWork: {
    height: 200,
    flex: 1,
    backgroundColor: 'black',
  },
  renderView: {
    backgroundColor: '#0033F7',
    position: 'absolute',
    right: 5,
    top: 5,
    borderRadius: 13,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontFamily: appFonts.InterRegular,
    fontSize: 8,
    fontWeight: '500',
    color: primary,
  },
  image: {
    height: 200,
    backgroundColor: shimmerColor,
    width: '100%',
  },
});
export default styles;
