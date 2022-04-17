import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, PermissionsAndroid } from 'react-native';

import { getDistance } from 'geolib';
import { NeuView } from 'react-native-neu-element';
import { Size } from '../../constants/size';
import { Color } from '../../constants/color';
import { Api } from '../../constants/googleAPi';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import { useNavigation } from '@react-navigation/native';
import { io } from 'socket.io-client';
const Person = () => {
	const socket = io('https://bract.herokuapp.com');
	return (
		<View
			style={{
				width: 70,
				height: 70,
				backgroundColor: 'rgba(152,204,253,.3)',
				borderRadius: 100,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<View
				style={{
					backgroundColor: 'rgba(152,204,253,.5)',
					width: 60,
					height: 60,
					borderRadius: 100,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<View
					style={{
						backgroundColor: 'rgba(152,204,253,.7)',
						width: 45,
						height: 45,
						borderRadius: 100,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Image source={require('../../Assets/pointer.png')} style={{ height: '50%', width: '50%' }} />
				</View>
			</View>
		</View>
	);
};
const Bus = () => {
	return (
		<View
			style={{
				width: 70,
				height: 70,
				borderRadius: 100,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Image source={require('../../Assets/busicon.png')} style={{ height: '50%', width: '50%' }} />
		</View>
	);
};
const Map = ({ route }) => {
	const [ ourcoords, setOurcoords ] = useState({ coords: { latitude: 0, longitude: 0 } });
	const [ buscoords, setBuscoords ] = useState({ lattitude: 0, longitude: 0 });
	const [ busplace, setBusplace ] = useState('');
	const [ ourplace, setOurplace ] = useState('');
	const { lattitudes, longitudes, userplace, busno } = route.params;

	const navigation = useNavigation();
	const socket = io('https://bract.herokuapp.com/');
	console.log('lattitude from home', lattitudes);
	console.log('lattitude from here', ourcoords.coords.latitude);

	console.log(1);
	//this for asking permisiion and get the user current location lag and lat

	const getpermisstion = () => {
		return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				if (granted) {
					Geolocation.getCurrentPosition(
						(position) => {
							console.log('ippa user location get ');
							console.log(position.coords.latitude, position.coords.longitude);

							setOurcoords(position);
							console.log(2);
							const useraddress = async (lat, lng) => {
								Geocoder.fallbackToGoogle(Api.apikey);
								// use the lib as usual
								let res = await Geocoder.geocodePosition({ lat, lng });
								setOurplace(res[0].locality);
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

	//bus loaction socket la varathu

	socket.on(busno, (e) => {
		console.log('line 135 ethu bus 53', e);
		setBuscoords(e);
		busaddress(e.lattitude, e.longitude);
	});

	//bus place varathu
	const busaddress = async (lat, lng) => {
		Geocoder.fallbackToGoogle(Api.apikey);
		// use the lib as usual
		let res = await Geocoder.geocodePosition({ lat, lng });
		setBusplace(res[0].locality);
	};

	//marupatiyum use details get pnadarthu
	const refresh = () => {
		console.log(' line 153 hi i am triger fuction');
		getpermisstion();
	};

	const kilometer = getDistance(
		//ethu rebos hottrl
		{ latitude: buscoords.lattitude, longitude: buscoords.longitude },
		{ latitude: lattitudes, longitude: longitudes }
	);
	console.log(' line 166 soxket ulla ulla kim', kilometer);
	// console.log('ourcoords', ourcoords.coords.latitude);
	console.log(
		'buscoords',
		buscoords.lattitude,
		'ippa ethu new ---------------------------------------------------------------------------------------'
	);

	return (
		<View style={styles.main}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: lattitudes,
					longitude: longitudes,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
			>
				{/* <MapViewDirections
					origin={{ latitude: 10.901316, longitude: 79.178196 }}
					destination={{ latitude: 10.9010328, longitude:  79.1983226}}
					apikey={Api.apikey}
					strokeColor="red"
					strokeWidth={5}
				/> */}
				<Marker
					coordinate={{
						latitude: ourplace === '' ? lattitudes : ourcoords.coords.latitude,
						longitude: ourplace === '' ? longitudes : ourcoords.coords.longitude
					}}
				>
					<Person />
				</Marker>
				<Marker coordinate={{ latitude: buscoords.lattitude, longitude: buscoords.longitude }}>
					<Bus />
				</Marker>
			</MapView>
			<View
				style={{
					position: 'absolute',
					top: Size.height / 25,
					width: Size.width,

					padding: 20
				}}
			>
				<View
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<Pressable
						onPress={() => navigation.goBack()}
						style={{ display: 'flex', alignItems: 'flex-start' }}
					>
						<NeuView color="#E3EDF7" height={Size.height / 22} width={Size.height / 22} borderRadius={100}>
							<Image
								source={require('../../Assets/back.png')}
								style={{ height: '100%', width: '100%' }}
							/>
						</NeuView>
					</Pressable>
					<View>
						<Text style={{ color: Color.BLACK, fontSize: 20, fontWeight: '600' }}>Tracking Bus</Text>
					</View>
					<Pressable onPress={() => refresh()} style={{ display: 'flex', alignItems: 'flex-start' }}>
						<NeuView color="#E3EDF7" height={Size.height / 22} width={Size.height / 22} borderRadius={100}>
							<Image
								source={require('../../Assets/refresh.png')}
								style={{ height: '70%', width: '70%' }}
							/>
						</NeuView>
					</Pressable>
				</View>
			</View>
			<View
				style={{
					position: 'absolute',
					bottom: 10,
					width: Size.width,
					height: Size.height / 4,
					padding: 20
				}}
			>
				<View
					style={{ backgroundColor: 'white', height: '100%', borderRadius: 15, elevation: 50, padding: 20 }}
				>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<View>
								<Text style={{ color: Color.BLACK }}>Distance</Text>
							</View>
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
								<Text style={{ fontSize: 30, fontWeight: '700', color: Color.BLACK }}>
									{kilometer / 1000}
								</Text>
								<Text> </Text>
								<Text style={{ fontSize: 20, color: Color.BLACK }}>km</Text>
							</View>
						</View>

						<View
							style={{
								display: 'flex',
								width: '50%',
								alignItems: 'flex-start'
							}}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<View
									style={{
										height: 20,
										width: 20,
										backgroundColor: 'rgb(152,204,253)',
										borderRadius: 100,
										marginRight: 10,
										elevation: 10
									}}
								/>
								<View>
									<Text style={{ fontSize: 10, color: Color.BLACK }}>Your Location</Text>
									<Text
										style={{
											fontSize: 15,
											fontWeight: '500',

											color: Color.BLACK
										}}
									>
										{ourplace === '' ? userplace : ourplace}
									</Text>
								</View>
							</View>
							{/* youtlocation end */}
							<View style={{ marginVertical: 10 }} />
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<View
									style={{
										height: 20,
										width: 20,
										backgroundColor: Color.YELLOW,
										borderRadius: 100,
										marginRight: 10,
										elevation: 10
									}}
								/>
								<View>
									<Text style={{ fontSize: 10, color: Color.BLACK }}>Bus Location</Text>
									<Text
										style={{
											fontSize: 15,
											fontWeight: '500',

											color: Color.BLACK
										}}
									>
										{busplace}
									</Text>
								</View>
							</View>
						</View>
					</View>

					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ marginTop: 10, height: 40, width: 40 }}>
							<Image
								source={require('../../Assets/busicon.png')}
								style={{ height: '100%', width: '100%' }}
							/>
						</View>
						<View style={{ marginHorizontal: 5 }} />
						<View>
							<Text style={{ fontSize: 20, color: Color.BLACK, fontWeight: '500' }}>Bus No-56</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: Color.WHITE,
		color: Color.BLACK,
		display: 'flex'
	}
});
