import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
/* navigators */
import { HomeStackNavigator } from './HomeStackNavigator';
/* screens */
import { UserScreen } from '../screens/UserScreen';
/* types */
import { RootStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarActiveTintColor: '#900', tabBarInactiveTintColor: '#999', headerShown: false }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'ホーム',
          tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size}></Feather>,
        }}
      />
      <Tab.Screen
        name='User'
        component={UserScreen}
        options={{
          tabBarLabel: 'ユーザー',
          tabBarIcon: ({ color, size }) => <Feather name='user' color={color} size={size}></Feather>,
        }}
      />
    </Tab.Navigator>
  );
};
