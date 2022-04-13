import { StyleSheet, Text, View, Pressable, Modal, Image, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../constants/color';

import { useNavigation } from '@react-navigation/native';
import { Size } from '../../constants/size';
import ImagePicker from 'react-native-image-crop-picker';
import { NeuView } from 'react-native-neu-element';
import { Dimensions } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';

const Bill = () => {
	const [ online, setOnline ] = useState(true);
	const [ models, setModels ] = useState(false);
	const [ internal, setInternal ] = useState(false);
	const [ image, setImage ] = useState([]);
	const [ success, setSuccess ] = useState(true);
	const navigation = useNavigation();
	const { height, width } = Dimensions.get('window');

	useEffect(
		() => {
			Internalpermisstion();
			scangallary();
		},
		[ success, online ]
	);

	const Internalpermisstion = () => {
		console.log('hi iam internal permisttioj');
		PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((ispermitted) => {
			if (ispermitted) {
				setInternal(true);
				console.log('acces true');
			} else {
				PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
				).then((ispermistted) => {
					if (ispermistted) {
						setInternal(true);
					}
				});
			}
		});

		// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
	};
	const opengallery = () => {
		ImagePicker.openPicker({
			width: 500,
			height: 700,
			cropping: true,
			includeBase64: true
		}).then((image) => {
			console.log(image);
			const filename = image.path.split('/');
			console.log(filename);
			const filenamewithstate = online ? 'tuitionfees' : 'examfees';
			const foldername = `/storage/emulated/0/Android/obb/com.pristimage.bas/${filenamewithstate}`;

			const total = filename.length;
			const imagename = foldername + '/' + filename[total - 1];

			if (internal) {
				RNFetchBlob.fs.isDir(foldername).then((isDir) => {
					if (isDir) {
						console.log('folder is here');
						RNFetchBlob.fs.createFile(imagename, image.data, (encoding = 'base64')).then((save) => {
							if (save) {
								setImage([]);
								setSuccess(!success);
								console.log('successfully image stored');
							}
						});
					} else {
						RNFetchBlob.fs.mkdir(foldername);
						console.log('folder is noe creatred');
						RNFetchBlob.fs.createFile(imagename, image.data, (encoding = 'base64')).then((save) => {
							if (save) {
								setImage([]);
								setSuccess(!success);
								console.log('successfully image stored');
							}
						});
					}
				});
			}
		});
	};

	const opencamera = () => {
		ImagePicker.openCamera({
			width: 500,
			height: 700,
			cropping: true,
			includeBase64: true
		}).then((image) => {
			console.log(image);
			const filename = image.path.split('/');
			console.log(filename);
			const filenamewithstate = online ? 'tuitionfees' : 'examfees';
			const foldername = `/storage/emulated/0/Android/obb/com.pristimage.bas/${filenamewithstate}`;

			const total = filename.length;
			const imagename = foldername + '/' + filename[total - 1];

			if (internal) {
				RNFetchBlob.fs.isDir(foldername).then((isDir) => {
					if (isDir) {
						console.log('folder is here');
						RNFetchBlob.fs.createFile(imagename, image.data, (encoding = 'base64')).then((save) => {
							if (save) {
								setImage([]);
								setSuccess(!success);
								console.log('successfully image stored');
							}
						});
					} else {
						RNFetchBlob.fs.mkdir(foldername);
						console.log('folder is noe creatred');
						RNFetchBlob.fs.createFile(imagename, image.data, (encoding = 'base64')).then((save) => {
							if (save) {
								setImage([]);
								setSuccess(!success);
								console.log('successfully image stored');
							}
						});
					}
				});
			}
		});
	};

	const scangallary = () => {
		// RNFetchBlob.fs.readStream('/storage/emulated/0/Android/obb/com.pristimage.bas', 'base64').then((data) => {
		// 	console.log(data);
		// });
		// RNFetchBlob.fs
		// 	.readFile('/storage/emulated/0/Android/obb/com.pristimage.bas/47325ade-4875-4a24-9e0a-b2011195fe43.jpg')
		// 	.then((data) => {
		// 		console.log(data);
		// 	});
		// const filePath = '/storage/emulated/0/Android/obb/com.pristimage.bas/47325ade-4875-4a24-9e0a-b2011195fe43.jpg';
		// RNFS.readFile(filePath, 'base64')
		const filenamewithstate = online ? 'tuitionfees' : 'examfees';
		const dirpath = `/storage/emulated/0/Android/obb/com.pristimage.bas/${filenamewithstate}`;
		RNFS.readDir(dirpath)
			.then((files) => {
				console.log(files, 'jest');
				console.log(files.path);
				files.map((a) => {
					console.log(a.path, 'checking');
					const filePath = a.path;
					RNFS.readFile(filePath, 'base64').then((final) => {
						setImage((i) => [ ...i, final ]);
						// console.log(image, 'i am state store image');
						// console.log(final);
					});
				});
			})
			.catch((err) => {
				console.log(err.message, err.code);
			});

		console.log('hkdjfdjsfjsdjf');
		console.log(image);
	};
	console.log(image.length);

	const tuitionclick = () => {
		setImage([]);
		setOnline(true);
	};
	const examclick = () => {
		setImage([]);
		setOnline(false);
	};
	return (
		<ScrollView style={styles.main}>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: 10
				}}
			>
				<Pressable onPress={() => navigation.goBack()}>
					<NeuView
						color="#E3EDF7"
						height={Size.height / 22}
						width={Size.height / 22}
						borderRadius={100}
						style={{ marginTop: Size.height / 28 }}
					>
						<Image source={require('../../Assets/back.png')} style={{ height: '100%', width: '100%' }} />
					</NeuView>
				</Pressable>
				<Pressable onPress={() => setModels(true)}>
					<NeuView
						color="#E3EDF7"
						height={Size.height / 22}
						width={Size.height / 22}
						borderRadius={100}
						style={{ marginTop: Size.height / 28 }}
					>
						<Image source={require('../../Assets/addimage.png')} style={{ height: '60%', width: '60%' }} />
					</NeuView>
				</Pressable>
			</View>

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
				<Pressable onPress={() => tuitionclick()}>
					<NeuView
						color="#E3EDF7"
						height={Size.height / 20}
						width={Size.width / 2.5}
						borderRadius={8}
						inset={online}
					>
						<Text style={{ fontSize: 15, color: online ? Color.BLACK : 'grey', fontWeight: '600' }}>
							Tuition Fees
						</Text>
					</NeuView>
				</Pressable>
				<Pressable onPress={() => examclick()}>
					<NeuView
						color="#E3EDF7"
						height={Size.height / 20}
						width={Size.width / 2.5}
						borderRadius={8}
						inset={!online}
					>
						<Text style={{ fontSize: 15, color: !online ? Color.BLACK : 'grey', fontWeight: '600' }}>
							Exam Fees
						</Text>
					</NeuView>
				</Pressable>
			</View>

			<Modal animationType="slide" transparent={true} visible={models}>
				<View
					style={{
						height: height,
						width: width,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							height: Size.height / 4,
							width: Size.width / 1.1,
							backgroundColor: '#E3EDF7',
							elevation: 5,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 8
						}}
					>
						<View
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'center',
								width: '100%',
								height: 30,
								paddingRight: 10,
								paddingTop: 25
							}}
						>
							<Pressable onPress={() => setModels(false)}>
								<NeuView
									color="#E3EDF7"
									height={Size.height / 25}
									width={Size.height / 25}
									borderRadius={100}
								>
									<Image
										source={require('../../Assets/close.png')}
										style={{ height: '60%', width: '60%' }}
									/>
								</NeuView>
							</Pressable>
						</View>
						<View
							style={{
								height: '90%',
								width: '90%',
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
								flexDirection: 'row'
							}}
						>
							<Pressable onPress={() => opencamera()}>
								<NeuView
									color="#E3EDF7"
									height={Size.height / 13}
									width={Size.height / 13}
									borderRadius={100}
								>
									<Image
										source={require('../../Assets/camera.png')}
										style={{ height: '60%', width: '60%' }}
									/>
								</NeuView>
							</Pressable>
							<Pressable onPress={() => opengallery()}>
								<NeuView
									color="#E3EDF7"
									height={Size.height / 13}
									width={Size.height / 13}
									borderRadius={100}
								>
									<Image
										source={require('../../Assets/gallery.png')}
										style={{ height: '60%', width: '60%' }}
									/>
								</NeuView>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			<View
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'row',

					flexWrap: 'wrap',
					justifyContent: 'center'
				}}
			>
				{image.map((file) => {
					return (
						<Pressable onPress={() => navigation.navigate('fullscreen', { image: file })}>
							<NeuView
								color="#E3EDF7"
								height={Size.height / 5.4}
								width={Size.height / 5.4}
								style={{ margin: 4 }}
								borderRadius={10}
							>
								<Image
									source={{ uri: `data:image/gif;base64,${file}` }}
									style={{ height: '95%', width: '95%', borderRadius: 10 }}
								/>
							</NeuView>
						</Pressable>
					);
				})}
			</View>
		</ScrollView>
	);
};

export default Bill;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		position: 'relative',
		backgroundColor: Color.WHITE,
		padding: 15
	}
});
