import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Authcheck from '../screen/authcheck';
import Signin from '../screen/Signin';

import Mainstack from './Mainstack';
const AuthStack = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="auth" component={Authcheck} />
			<Stack.Screen name="signin" component={Signin} />
			<Stack.Screen name="mainstack" component={Mainstack} />
		</Stack.Navigator>
	);
};

export default AuthStack;
