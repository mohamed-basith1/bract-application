import { TextInput, Animated, Text, View, StyleSheet, Easing } from 'react-native';
import React, { useEffect } from 'react';
import { Color } from '../constants/color';
import { Size } from '../constants/size';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const Donut = ({ percentage, max }) => {
	const animated = React.useRef(new Animated.Value(0)).current;
	const inputRef = React.useRef();

	const animation = (toValue) => {
		return Animated.timing(animated, {
			delay: 100,
			toValue,
			duration: 500,
			useNativeDriver: true,
			easing: Easing.out(Easing.ease)
		}).start();
	};

	useEffect(
		() => {
			animation(percentage);

			animated.addListener((v) => {
				inputRef.current.setNativeProps({
					text: `${Math.round(v.value)}`
				});
			});
			return () => {
				animated.removeAllListeners();
			};
		},
		[ max, percentage ]
	);

	return (
		<AnimatedTextInput
			ref={inputRef}
			underlineColorAndroid="transparent"
			editable={false}
			defaultValue="0"
			style={{ color: Color.BLACK, fontSize: Size.width / 3, fontWeight: '500', marginTop: -40 }}
		/>
	);
};

export default Donut;
