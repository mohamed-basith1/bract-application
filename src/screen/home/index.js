import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable, Image, PermissionsAndroid, RefreshControl } from 'react-native';
import { NeuView } from 'react-native-neu-element';
import { Size } from '../../constants/size';
import { Color } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoder';
import { Api } from '../../constants/googleAPi';
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Loading from '../loading';
import Axios from '../../Api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
	const [ latt, setLatt ] = useState(0);
	const [ longi, setLongi ] = useState(0);
	const [ place, setPlace ] = useState('');
	const [ online, setOnline ] = useState(true);
	const [ loadings, setLoadings ] = useState(false);
	const [ studentdetails, setStudentdetails ] = useState([]);
	const [ studentrollno, setStudentrollno ] = useState('');
	const [ driverlist, setDriver ] = useState([]);
	const [ refresh, setRefresh ] = useState(false);
	const navigation = useNavigation();

	const samplebus = [
		{ busno: 51, status: 'online' },
		{ busno: 52, status: 'online' },
		{ busno: 53, status: 'online' },
		{ busno: 54, status: 'online' },
		{ busno: 55, status: 'online' },
		{ busno: 56, status: 'offline' },
		{ busno: 57, status: 'offline' },
		{ busno: 58, status: 'offline' },
		{ busno: 59, status: 'offline' },
		{ busno: 60, status: 'offline' }
	];
	useEffect(() => {
		studentdetailfuct();
		getpermisstion();
	}, []);

	//ethu message token local storage la save aagirukkanu checking
	const testing = async () => {
		const get = await AsyncStorage.getItem('messagetoken');
		console.log(get);
	};
	testing();

	//------------
	const studentdetailfuct = async () => {
		const authtoken = await AsyncStorage.getItem('auth-token-stu');
		const studentrollnos = await AsyncStorage.getItem('student-rollno');
		setStudentrollno(studentrollnos);

		const data = { rollno: studentrollnos };
		console.log(data, 'roool no-----------------------------------');
		const res = await Axios.post('/student/studentdetails', data, {
			headers: { 'auth-token': authtoken }
		});

		const ress = await Axios.get('/driver/alldriverdetails');
		console.log('driver details list', ress.data);
		console.log(res.data);
		if (res.status == 200 && ress.status == 200) {
			console.log('--------------------------------------------------------------', res.data);
			setStudentdetails(res.data);
			setDriver(ress.data);
			setLoadings(true);
		}
	};

	const getpermisstion = () => {
		return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				if (granted) {
					Geolocation.getCurrentPosition(
						(position) => {
							console.log(position.coords.latitude, position.coords.longitude);
							setLatt(position.coords.latitude);
							setLongi(position.coords.longitude);

							console.log(2);
							const useraddress = async (lat, lng) => {
								Geocoder.fallbackToGoogle(Api.apikey);
								// use the lib as usual
								let res = await Geocoder.geocodePosition({ lat, lng });
								setPlace(res[0].locality);
							};
							useraddress(position.coords.latitude, position.coords.longitude);
						},
						(error) => {
							// See error code charts below.
							console.log(error.code, error.message);
						},
						{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
					);
				}
			}
		});
	};

	const refreshfunction = () => {
		setRefresh(true);
		studentdetailfuct();
		setRefresh(false);
	};

	return loadings ? (
		<ScrollView
			style={styles.main}
			showsVerticalScrollIndicator={false}
			refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => refreshfunction()} />}
		>
			<StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} barStyle="dark-content" />
			{/* header */}
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 7 }}>
				<View>
					<Text style={{ fontSize: 25, fontWeight: '700', color: Color.BLACK }}>{studentdetails.name}</Text>
					<Text style={{ fontSize: 13, fontWeight: '400', color: Color.BLACK }}>
						{studentdetails.department}
					</Text>
				</View>
				<Pressable onPress={() => navigation.navigate('setting')}>
					<NeuView color="#E3EDF7" height={40} width={40} borderRadius={100} concave>
						<Image source={require('../../Assets/avator1.png')} style={{ height: '80%', width: '80%' }} />
					</NeuView>
				</Pressable>
			</View>
			<View />

			{/* body */}

			<View
				style={{
					marginTop: 10,
					display: 'flex',
					padding: 7,
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'flex-start'
					}}
				>
					<Pressable onPress={() => navigation.navigate('percentage', { details: studentdetails })}>
						<View>
							<NeuView
								color="#E3EDF7"
								height={Size.height / 4}
								width={Size.width / 2.4}
								borderRadius={30}
								style={{ marginTop: 20 }}
							>
								<Animatable.View
									animation="fadeIn"
									delay={500}
									style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								>
									<View style={{ height: 50, width: 50 }}>
										<Image
											source={require('../../Assets/attendance.png')}
											style={{ height: '100%', width: '100%' }}
										/>
									</View>
									<Text
										style={{ fontSize: 15, fontWeight: '400', color: Color.BLACK, paddingTop: 10 }}
									>
										Percentages
									</Text>
								</Animatable.View>
							</NeuView>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('result', { data: studentdetails })}>
						<View>
							<NeuView
								color="#E3EDF7"
								height={Size.height / 7}
								width={Size.width / 2.4}
								borderRadius={30}
								style={{ marginTop: 20 }}
							>
								<Animatable.View
									animation="fadeIn"
									delay={700}
									style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								>
									<View style={{ height: 50, width: 50 }}>
										<Image
											source={require('../../Assets/results.png')}
											style={{ height: '100%', width: '100%' }}
										/>
									</View>
									<Text
										style={{ fontSize: 15, fontWeight: '400', color: Color.BLACK, paddingTop: 10 }}
									>
										Sem Results
									</Text>
								</Animatable.View>
							</NeuView>
						</View>
					</Pressable>
				</View>

				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'flex-start'
					}}
				>
					<Pressable onPress={() => navigation.navigate('circular', { data: studentdetails })}>
						<View>
							<NeuView
								color="#E3EDF7"
								height={Size.height / 7}
								width={Size.width / 2.4}
								borderRadius={30}
								style={{ marginTop: 20 }}
							>
								<Animatable.View
									animation="fadeIn"
									delay={800}
									style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								>
									<View style={{ height: 50, width: 50 }}>
										<Image
											source={require('../../Assets/message.png')}
											style={{ height: '100%', width: '100%' }}
										/>
									</View>
									<Text
										style={{ fontSize: 15, fontWeight: '400', color: Color.BLACK, paddingTop: 10 }}
									>
										Circular
									</Text>
								</Animatable.View>
							</NeuView>
						</View>
					</Pressable>
					<Pressable onPress={() => navigation.navigate('bill')}>
						<View>
							<NeuView
								color="#E3EDF7"
								height={Size.height / 4}
								width={Size.width / 2.4}
								borderRadius={30}
								style={{ marginTop: 20 }}
							>
								<Animatable.View
									animation="fadeIn"
									delay={1000}
									style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								>
									<View style={{ height: 50, width: 50 }}>
										<Image
											source={require('../../Assets/bill1.png')}
											style={{ height: '100%', width: '100%' }}
										/>
									</View>
									<Text
										style={{ fontSize: 15, fontWeight: '400', color: Color.BLACK, paddingTop: 10 }}
									>
										Bill Receipt
									</Text>
								</Animatable.View>
							</NeuView>
						</View>
					</Pressable>
				</View>
			</View>

			{/* footer */}

			<View
				borderRadius={100}
				style={{
					marginTop: 40,
					marginBottom: 20,
					height: Size.height / 20,
					width: Size.width / 1.1,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}
			>
				<Pressable onPress={() => setOnline(true)}>
					<NeuView
						color="#E3EDF7"
						height={Size.height / 20}
						width={Size.width / 4}
						borderRadius={8}
						inset={online}
					>
						<Text
							style={{ fontSize: 15, color: online ? 'rgba(74,181,22,0.8)' : 'grey', fontWeight: '600' }}
						>
							Online
						</Text>
					</NeuView>
				</Pressable>
				<Pressable onPress={() => setOnline(false)}>
					<NeuView
						color="#E3EDF7"
						height={Size.height / 20}
						width={Size.width / 4}
						borderRadius={8}
						inset={!online}
					>
						<Text
							style={{ fontSize: 15, color: !online ? 'rgba(247,0,0,0.8)' : 'grey', fontWeight: '600' }}
						>
							Offline
						</Text>
					</NeuView>
				</Pressable>
			</View>
			{online ? (
				driverlist.filter((v) => v.status === 'online').map((v, index) => {
					return (
						<Pressable
							onPress={() =>
								navigation.navigate('mapview', {
									lattitudes: latt,
									longitudes: longi,
									userplace: place,
									busno: v.busno
								})}
							style={{
								padding: 15,
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Animatable.View
								animation="slideInDown"
								delay={index * 200}
								style={{
									height: Size.height / 12,
									width: Size.width / 1.2,
									backgroundColor: '#E3EDF7'
								}}
							>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										width: '90%'
									}}
								>
									<NeuView color="#E3EDF7" height={50} width={50} borderRadius={100}>
										<Image
											source={require('../../Assets/busicon.png')}
											style={{ height: '60%', width: '60%' }}
										/>
									</NeuView>
									<View style={{ flex: 1, marginLeft: 20 }}>
										<Text style={{ fontSize: 15, color: Color.BLACK }}>Bus No:{v.busno}</Text>
										<Text style={{ fontSize: 10, color: 'green' }}>{v.status}</Text>
									</View>
									<View style={{ height: 30, width: 30, borderRadius: 100 }}>
										<Image
											source={require('../../Assets/forward.png')}
											style={{ height: '100%', width: '100%' }}
										/>
									</View>
								</View>
							</Animatable.View>
						</Pressable>
					);
				})
			) : (
				driverlist.filter((v) => v.status === 'offline').map((v, index) => {
					return (
						<Pressable
							style={{
								padding: 15,
								width: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Animatable.View
								animation="slideInDown"
								delay={index * 200}
								style={{
									height: Size.height / 12,
									width: Size.width / 1.2,
									backgroundColor: '#E3EDF7'
								}}
							>
								<View
									style={{
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										width: '90%'
									}}
								>
									<NeuView color="#E3EDF7" height={50} width={50} borderRadius={100}>
										<Image
											source={require('../../Assets/busicon.png')}
											style={{ height: '60%', width: '60%' }}
										/>
									</NeuView>
									<View style={{ flex: 1, marginLeft: 20 }}>
										<Text style={{ fontSize: 15, color: Color.BLACK }}>Bus No:{v.busno}</Text>
										<Text style={{ fontSize: 10, color: 'red' }}>{v.status}</Text>
									</View>
									<View style={{ height: 30, width: 30, borderRadius: 100 }}>
										<Image
											source={require('../../Assets/forward.png')}
											style={{ height: '100%', width: '100%' }}
										/>
									</View>
								</View>
							</Animatable.View>
						</Pressable>
					);
				})
			)}
			<View style={{ margin: 50 }} />
		</ScrollView>
	) : (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.WHITE }}>
			<StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} barStyle="dark-content" />
			<Loading />
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		padding: 20,

		paddingTop: 60,
		backgroundColor: Color.WHITE
	}
});
export default Home;
