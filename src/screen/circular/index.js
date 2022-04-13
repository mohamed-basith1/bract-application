import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { Color } from '../../constants/color';

import { Size } from '../../constants/size';
import Backbutton from '../../utils/backbutton';
import { NeuView } from 'react-native-neu-element';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
const Circular = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { circular } = route.params.data;
	console.log('circular data', circular);
	const url =
		'https://firebasestorage.googleapis.com/v0/b/trackbus-cdda1.appspot.com/o/image_processing20190826-8255-1onky4n.png?alt=media&token=9d741903-04f6-412d-b8d1-f9c7c91fa31a';
	return (
		<View style={styles.main}>
			<Backbutton action={() => navigation.goBack()} />

			<FlatList
				data={circular}
				keyExtractor={(item) => item.circularid}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => {
					return (
						<Pressable
							onPress={() => navigation.navigate('circularfullscreen', { image: item.circularimage })}
							style={{ alignItems: 'center', padding: 10 }}
						>
							<NeuView
								color="#E3EDF7"
								height={Size.height / 13}
								width={Size.width / 1.2}
								borderRadius={18}
								style={{ marginTop: 20 }}
							>
								<View
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										padding: 20
									}}
								>
									<View
										style={{
											width: '70%',
											display: 'flex',
											flexDirection: 'row',
											height: '100%'
										}}
									>
										<View
											style={{
												height: '100%',
												width: 6,
												backgroundColor: 'rgb(225,73,106)',
												borderRadius: 20
											}}
										/>
										<View
											style={{
												display: 'flex',
												justifyContent: 'flex-start'
											}}
										>
											<Text style={{ fontSize: 13, color: Color.BLACK }}>
												{'  '}
												{item.title}{' '}
											</Text>
											<Text style={{ fontSize: 13 }}>
												{'  '}Date:{item.date}{' '}
											</Text>
										</View>
									</View>

									<Image
										source={require('../../Assets/circular.png')}
										style={{ height: 40, width: 40 }}
									/>
								</View>
							</NeuView>
						</Pressable>
					);
				}}
			/>
		</View>
	);
};

export default Circular;

const styles = StyleSheet.create({
	main: {
		backgroundColor: Color.WHITE,
		flex: 1,
		padding: 20
	}
});
