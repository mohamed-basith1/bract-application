import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Circularfullscreen = ({ route }) => {
	const { image } = route.params;
	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
				backgroundColor: 'black'
			}}
		>
			<Image source={{ uri: image }} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
		</View>
	);
};

export default Circularfullscreen;

const styles = StyleSheet.create({});
