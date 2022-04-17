import React, { useState } from 'react';
import { View, Text, StatusBar, Dimensions, VirtualizedList, Pressable } from 'react-native';
import { NeuInput, NeuView } from 'react-native-neu-element';
import { Color } from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../Api/index';

import { useNavigation } from '@react-navigation/native';

const Signin = () => {
	const { width, height } = Dimensions.get('window');
	const [ rollno, setRollno ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ submited, setSubmited ] = useState(false);
	const navigation = useNavigation();
	const testing = async () => {
		const get = await AsyncStorage.getItem('messagetoken');
		console.log('ethu siginn etect', get);
	};
	testing();
	const submit = async () => {
		console.log('hihihihihihihuhihih');
		setSubmited(true);
		const data = { rollno: rollno.toUpperCase(), password: password.toUpperCase() };
		console.log(data);
		try {
			const res = await Axios.post('/student/signin', data);
			await AsyncStorage.setItem('auth-token-stu', res.data);
			await AsyncStorage.setItem('student-rollno', rollno.toUpperCase());
			const msgtoken = await AsyncStorage.getItem('messagetoken');
			console.log('succesfull');
			console.log(res.data);
			if (res.status === 200) {
				const msgdata = { rollno: rollno.toUpperCase(), messagetoken: msgtoken };
				console.log(msgdata);
				const ress = await Axios.put('/student/changemsgtoken', msgdata).then((ress) => {
					console.log(ress.status, 'ethu ulla succesfully message uploaded');
					navigation.replace('mainstack');
				});
			}
		} catch (error) {
			console.log('ethuthan');
			console.log(error);
			setSubmited(false);
		}
	};

	return (
		<View
			style={{
				backgroundColor: Color.WHITE,
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<StatusBar barStyle="dark-content" backgroundColor={'rgba(0,0,0,0)'} translucent />
			<View>
				<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 30, color: Color.BLACK, fontWeight: 'bold' }}>Student App</Text>
				</View>
				<View style={{ margin: 65 }} />
				<View style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<Text style={{ fontSize: 35, fontWeight: '600', color: Color.BLACK }}>Welcome</Text>
					<Text style={{ fontSize: 15, color: Color.BLACK }}>Let's get started</Text>
				</View>
				<View style={{ margin: 15 }} />
				<NeuInput
					onChangeText={setRollno}
					value={rollno}
					placeholder="Register no"
					width={width / 1.2}
					height={height / 13}
					borderRadius={100}
					color={Color.WHITE}
				/>
				<View style={{ margin: 15 }} />
				<NeuInput
					onChangeText={setPassword}
					value={password}
					placeholder="Password"
					width={width / 1.2}
					height={height / 13}
					borderRadius={100}
					color={Color.WHITE}
				/>

				<View style={{ margin: 35 }} />
				<Pressable
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
					onPress={() => submit()}
					disabled={submited}
				>
					<NeuView color={Color.WHITE} width={width / 2} height={height / 15} borderRadius={100}>
						{!submited ? (
							<Text style={{ fontSize: 25, fontWeight: '500', color: Color.BLACK }}>Sign-in</Text>
						) : (
							<Text> loading</Text>
						)}
					</NeuView>
				</Pressable>
			</View>
		</View>
	);
};

export default Signin;
