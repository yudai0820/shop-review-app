import { StyleSheet, SafeAreaView } from 'react-native';
import { ShopDetail } from '../components/ShopDetai';
import { FloatingActionButton } from '../components/FloatingActionButton';
/* types */
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

export const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: shop.name });
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop} />
      <FloatingActionButton iconName='plus' onPress={() => navigation.navigate('CreateReview', { shop })} />
    </SafeAreaView>
  );
};
