import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home';
import Map from '../screen/map';
import Percentage from '../screen/percentage';
import Result from '../screen/result';
import Circular from '../screen/circular';
import Bill from '../screen/bill';
import Setting from '../screen/setting';
import Fullscreen from '../screen/fullscreen';
import Pdffullscreen from '../screen/pdffullscreen';
import Circularfullscreen from '../screen/cirfullscreen/circularfullscreen';

const MainStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="home" component={Home} />
			<Stack.Screen name="percentage" component={Percentage} />
			<Stack.Screen name="result" component={Result} />
			<Stack.Screen name="circular" component={Circular} />
			<Stack.Screen name="bill" component={Bill} />
			<Stack.Screen name="setting" component={Setting} />
			<Stack.Screen name="mapview" component={Map} />
			<Stack.Screen name="fullscreen" component={Fullscreen} />
			<Stack.Screen name="pdffullscreen" component={Pdffullscreen} />
			<Stack.Screen name="circularfullscreen" component={Circularfullscreen} />
		</Stack.Navigator>
	);
};

export default MainStack;
