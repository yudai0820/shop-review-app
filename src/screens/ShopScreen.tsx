import { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ReviewsContext } from '../contexts/rewiewsContext';
/* component */
import { ShopDetail } from '../components/ShopDetai';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { ReviewItem } from '../components/ReviewItems';
/* types */
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getReviews } from '../lib/firebase';

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
  // const [reviews, setReviews] = useState<Review[]>([]);
  const { reviews, setReviews } = useContext(ReviewsContext);

  const fetchReviews = async () => {
    console.log('run');
    const reviews = await getReviews(shop.id);
    setReviews(reviews);
  };

  useEffect(() => {
    navigation.setOptions({ title: shop.name });
    fetchReviews();
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton iconName='plus' onPress={() => navigation.navigate('CreateReview', { shop })} />
    </SafeAreaView>
  );
};
