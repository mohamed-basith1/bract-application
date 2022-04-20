import React, { useState } from 'react';
import { View, Text, StatusBar, Dimensions, Keyboard, Pressable, Image, ActivityIndicator } from 'react-native';
import { NeuInput, NeuView } from 'react-native-neu-element';
import { Color } from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../Api/index';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
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
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ padding: 20 }}>
				<Animatable.View
					animation="zoomIn"
					delay={500}
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					<NeuView color={Color.WHITE} width={width / 3} height={width / 3} borderRadius={50} concave>
						<Image source={require('../../Assets/bractlogo.png')} style={{ height: '95%', width: '95%' }} />
					</NeuView>
				</Animatable.View>
				<View style={{ margin: 45 }} />
				<Animatable.View
					animation="fadeInUp"
					delay={800}
					style={{ display: 'flex', justifyContent: 'flex-start' }}
				>
					<Text style={{ fontSize: 35, fontWeight: '300', color: Color.BLACK }}>Welcome</Text>
					<Text style={{ fontSize: 15, color: 'black', fontWeight: '100' }}> Let's get started</Text>
				</Animatable.View>
				<View style={{ margin: 15 }} />
				<Animatable.View animation="zoomIn" delay={600}>
					<NeuInput
						onChangeText={setRollno}
						value={rollno}
						placeholder="Register no"
						width={width / 1.2}
						height={height / 13}
						borderRadius={100}
						color={Color.WHITE}
					/>
				</Animatable.View>
				<View style={{ margin: 15 }} />
				<Animatable.View animation="zoomIn" delay={700}>
					<NeuInput
						onChangeText={setPassword}
						value={password}
						placeholder="Password"
						width={width / 1.2}
						height={height / 13}
						borderRadius={100}
						color={Color.WHITE}
					/>
				</Animatable.View>

				<View style={{ margin: 55 }} />
				<Pressable
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
					onPress={() => submit()}
					disabled={submited}
				>
					{/* <NeuView color={'#0DC366'} width={width / 2} height={height / 15} borderRadius={100}> */}
					<Animatable.View
						animation="zoomIn"
						delay={800}
						style={{
							width: width / 2,
							height: height / 15,
							borderRadius: 100,
							backgroundColor: Color.BLACK,
							justifyContent: 'center',
							alignItems: 'center',
							elevation: 5
						}}
					>
						{!submited ? (
							<Text style={{ fontSize: 16, fontWeight: '300', color: 'white' }}>Sign-in</Text>
						) : (
							<ActivityIndicator color={Color.WHITE} />
						)}
					</Animatable.View>

					{/* </NeuView> */}
				</Pressable>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default Signin;
