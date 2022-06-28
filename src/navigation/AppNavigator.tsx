import { NavigationContainer } from '@react-navigation/native';
/* navigatar */
import { MainTabNavigator } from './MainTabNavigator';
/* screen */
import { AuthScreen } from '../screens/AuthScreen';
import { useContext } from 'react';
/* context */
import { UserContext } from '../contexts/userContext';

export const AppNavigator = () => {
  const { user } = useContext(UserContext);

  return <NavigationContainer>{!user ? <AuthScreen /> : <MainTabNavigator />}</NavigationContainer>;
};
