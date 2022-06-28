import { NavigationContainer } from '@react-navigation/native';
/* navigatar */
import { MainTabNavigator } from './MainTabNavigator';
/* screen */
import { AuthScreen } from '../screens/AuthScreen';

export const AppNavigator = () => {
  const user = null;

  return <NavigationContainer>{!user ? <AuthScreen /> : <MainTabNavigator />}</NavigationContainer>;
};
