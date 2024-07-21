import { Buffer } from 'buffer';
import { getRandomValues } from 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

global.Buffer = Buffer;
global.crypto = {
  getRandomValues
};
