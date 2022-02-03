import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UsersList } from './screens/UsersList';
import { CreateUser } from './screens/CreateUser';
import { UserDetail } from './screens/UserDetail';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5465FF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen
        name="UserList"
        component={UsersList}
        options={{ title: 'User List' }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{ title: 'Create a new user' }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{ title: 'User Detail' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
