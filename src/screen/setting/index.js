import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color } from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const Setting = () => {
	const navigation = useNavigation();
	const logout = async () => {
		try {
			await AsyncStorage.removeItem('auth-token-stu');

			navigation.replace('auth', { screen: 'signin' });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View style={styles.main}>
			<Pressable onPress={() => logout()}>
				<Text>Logout</Text>
			</Pressable>
		</View>
	);
};

export default Setting;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: Color.WHITE,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
