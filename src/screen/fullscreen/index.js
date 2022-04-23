import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';

const Fullscreen = ({ route }) => {
	const { image, fees } = route.params;
	const navigate = useNavigation();
	console.log(image);
	const deleteclick = () => {
		console.log('delete clicked ');
		const filenamewithstate = fees ? 'tuitionfees' : 'examfees';
		const folderDir = `/storage/emulated/0/Android/obb/com.pristimage.bas/${filenamewithstate}/${image.name}`;
		RNFetchBlob.fs.unlink(folderDir).then((res) => navigate.navigate('home'));
	};
	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1
				// backgroundColor: 'black'
			}}
		>
			<Image
				source={{ uri: `data:image/gif;base64,${image.image}` }}
				style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
			/>

			<TouchableOpacity
				style={{ position: 'absolute', bottom: 50, height: 50, width: 50 }}
				onPress={() => deleteclick()}
			>
				<Image source={require('../../Assets/delete.png')} style={{ height: '100%', width: '100%' }} />
			</TouchableOpacity>
		</View>
	);
};

export default Fullscreen;

const styles = StyleSheet.create({});
