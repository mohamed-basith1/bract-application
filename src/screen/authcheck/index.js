import { Button, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../loading';
import { Color } from '../../constants/color';
const Authcheck = () => {
	const navigation = useNavigation();
	useEffect(() => {
		checkauth();
	}, []);

	const checkauth = async () => {
		const token = await AsyncStorage.getItem('auth-token-stu');
		console.log(token);
		await axios
			.get('/student/authcheck', {
				headers: {
					'auth-token': token
				}
			})
			.then((res) => {
				if (res.status === 200) {
					navigation.replace('mainstack');
				}
			})
			.catch((err) => {
				console.log(err, 'i a check error');
				if (err) {
					navigation.replace('signin');
				}
			});
	};
	return (
		<View
			style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: Color.WHITE
			}}
		>
			<StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} barStyle="dark-content" />
			<Loading />
		</View>
	);
};

export default Authcheck;

const styles = StyleSheet.create({});
