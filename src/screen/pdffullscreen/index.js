import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color } from '../../constants/color';
import Pdf from 'react-native-pdf';
import { Size } from '../../constants/size';

const Pdffullscreen = ({ route }) => {
	const { pdf } = route.params;
	console.log(pdf);
	const source = {
		uri: pdf,
		cache: true
	};
	return (
		<View style={styles.main}>
			<Pdf
				source={source}
				onLoadComplete={(numberOfPages, filePath) => {
					console.log(`Number of pages: ${numberOfPages}`);
				}}
				onPageChanged={(page, numberOfPages) => {
					console.log(`Current page: ${page}`);
				}}
				onError={(error) => {
					console.log(error);
				}}
				onPressLink={(uri) => {
					console.log(`Link pressed: ${uri}`);
				}}
				style={{ width: Size.width, height: Size.height }}
			/>
		</View>
	);
};

export default Pdffullscreen;

const styles = StyleSheet.create({
	main: {
		backgroundColor: Color.WHITE,
		flex: 1
	}
});
