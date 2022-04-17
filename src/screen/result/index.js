import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { Color } from '../../constants/color';
import { Size } from '../../constants/size';
import Backbutton from '../../utils/backbutton';
import { NeuView } from 'react-native-neu-element';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

const Result = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { result } = route.params.data;
	console.log('result data', result);
	return (
		<View style={styles.main}>
			<Backbutton action={() => navigation.goBack()} />

			<FlatList
				data={result}
				keyExtractor={(item) => item.resultid}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<Pressable
							onPress={() => navigation.navigate('pdffullscreen', { pdf: item.resultimage })}
							style={{ alignItems: 'center', padding: 10 }}
						>
							<NeuView
								color={Color.WHITE}
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
												backgroundColor: 'rgb(30,191,196)',
												borderRadius: 20
											}}
										/>
										<View
											style={{
												display: 'flex',
												justifyContent: 'flex-start'
											}}
										>
											<Text style={{ fontSize: 20, color: Color.BLACK }}>
												{'  '}
												{item.sem} Semester{' '}
											</Text>
											<Text style={{ fontSize: 13 }}>
												{'   '}Date :{item.date}{' '}
											</Text>
										</View>
									</View>

									<Image source={require('../../Assets/pdf.png')} style={{ height: 40, width: 40 }} />
								</View>
							</NeuView>
						</Pressable>
					);
				}}
			/>
		</View>
	);
};

export default Result;

const styles = StyleSheet.create({
	main: {
		backgroundColor: Color.WHITE,
		flex: 1,
		padding: 20
	}
});
