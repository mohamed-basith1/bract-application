import React from 'react';
import LottieView from 'lottie-react-native';
import { Size } from '../../constants/size';
const Loading = () => {
	return (
		<LottieView
			style={{ height: Size.height / 3.5, width: Size.height / 3.5 }}
			source={require('../../Assets/bract.json')}
			autoPlay
		/>
	);
};

export default Loading;
