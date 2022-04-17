import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { NeuView } from 'react-native-neu-element';
import { Color } from '../constants/color';
import { Size } from '../constants/size';
const Backbutton = ({ action }) => {
	return (
		<Pressable onPress={() => action()}>
			<NeuView
				color={Color.WHITE}
				height={Size.height / 22}
				width={Size.height / 22}
				borderRadius={100}
				style={{ marginTop: Size.height / 28 }}
			>
				<Image source={require('../Assets/back.png')} style={{ height: '100%', width: '100%' }} />
			</NeuView>
		</Pressable>
	);
};

export default Backbutton;

const styles = StyleSheet.create({});
