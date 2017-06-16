import {StatusBar} from 'react-native';
import {create} from '../components/FAStyleSheet';

export default create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#eee',
  },
  header: {
    flexDirection: 'row'
  },
  icon: {
    resizeMode: 'contain',
    width: 16,
  }
});
