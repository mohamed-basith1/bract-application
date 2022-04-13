import { TextInput, Animated, Text, View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Color } from '../../constants/color';
import Donut from '../../components/Donut';
import { useNavigation } from '@react-navigation/native';
import { Size } from '../../constants/size';
import Backbutton from '../../utils/backbutton';
import { NeuView } from 'react-native-neu-element';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
const Percentage = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { name, percentage, cgpa, rollno, semester, year, department } = route.params.details;

	const currentpercentage = percentage;

	return (
		<View style={styles.main}>
			<Backbutton action={() => navigation.goBack()} />
			<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: Color.BLACK, fontSize: Size.height / 45, fontWeight: '300' }}>
						Your current semester
					</Text>
					<Text style={{ color: Color.BLACK, fontSize: Size.height / 55, fontWeight: '300' }}>
						attendance percentage
					</Text>
					<Text
						style={{
							color:
								currentpercentage >= 90
									? 'green'
									: currentpercentage >= 70 ? '#6AC777' : currentpercentage >= 50 ? '#F1C300' : 'red',

							fontSize: Size.height / 55,
							fontWeight: '400',
							marginTop: 10
						}}
					>
						{currentpercentage >= 90 ? (
							'Awesome'
						) : currentpercentage >= 70 ? (
							'Good'
						) : currentpercentage >= 50 ? (
							'Carefull'
						) : (
							'Not Eligible'
						)}
					</Text>

					<Donut percentage={currentpercentage} max={100} />

					<Text style={{ color: Color.BLACK, fontSize: Size.height / 55, fontWeight: '300', marginTop: -30 }}>
						out of 100
					</Text>
				</View>
				<NeuView
					color="#E3EDF7"
					height={Size.height / 3.4}
					width={Size.width / 1.1}
					borderRadius={50}
					style={{ marginTop: 50 }}
				>
					<View style={{ height: '100%', width: '100%', padding: 20, display: 'flex', flexDirection: 'row' }}>
						<NeuView
							color="#E3EDF7"
							height={Size.height / 4}
							width={20}
							borderRadius={50}
							style={{ marginRight: 20 }}
						>
							<View style={{ backgroundColor: 'green', borderRadius: 50, height: '95%', width: 10 }} />
						</NeuView>
						<View>
							<View>
								<Text style={{ fontSize: 15, color: Color.BLACK, marginVertical: 10 }}>
									Name:{'  '}
									{name}
								</Text>
							</View>
							<View>
								<Text style={{ fontSize: 15, color: Color.BLACK, marginVertical: 10 }}>
									Register No:{'  '}
									{rollno}
								</Text>
							</View>
							<View>
								<Text style={{ fontSize: 15, color: Color.BLACK, marginVertical: 10 }}>
									Department:{'  '}
									{department}
								</Text>
							</View>
							<View>
								<Text style={{ fontSize: 15, color: Color.BLACK, marginVertical: 10 }}>
									Semester:{'  '}
									{semester}
								</Text>
							</View>
							<View>
								<Text style={{ fontSize: 15, color: Color.BLACK, marginVertical: 10 }}>
									Year:{'  '}
									{year}
								</Text>
							</View>
						</View>
					</View>
				</NeuView>
				<View style={{ margin: Size.height / 50, width: 20, height: 20 }} />
				<NeuView color="#E3EDF7" height={Size.height / 10.4} width={Size.width / 1.1} borderRadius={50}>
					<View
						style={{
							display: 'flex',
							width: '90%',

							height: '90%',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<LottieView
							style={{ height: 100, width: 100 }}
							source={require('../../Assets/cgpa.json')}
							autoPlay
						/>
						<Text style={{ fontSize: 25, fontWeight: '600', color: Color.BLACK }}>
							{'    '}CGPA: {cgpa}
						</Text>
					</View>
				</NeuView>
			</View>
		</View>
	);
};

export default Percentage;

const styles = StyleSheet.create({
	main: {
		backgroundColor: Color.WHITE,
		flex: 1,
		padding: 20,
		display: 'flex',
		flexDirection: 'column'
	}
});
