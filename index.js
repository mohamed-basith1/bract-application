/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const messagetokensave = async (e) => {
	console.log('ippa save pannanum', e.token);
	await AsyncStorage.setItem('messagetoken', e.token);
};
PushNotification.configure({
	onNotification: function(notification) {
		console.log('NOTIFICATION:', notification);
	},
	onRegister: function(token) {
		console.log('TOKEN:', token);
		messagetokensave(token);
	}
});
AppRegistry.registerComponent(appName, () => App);
