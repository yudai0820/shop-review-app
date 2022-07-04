import { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Alert } from 'react-native';
import firebase from 'firebase';
import { createReviewRef, updloadImage } from '../lib/firebase';
import { pickImage } from '../lib/image-picker';
import { UserContext } from '../contexts/userContext';
import { getExtention } from '../utils/file';
/* components */
import { IconButton } from '../components/IconButton';
import { TextArea } from '../components/TextArea ';
import { StarInput } from '../components/StarInput';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
/* types */
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { Review } from '../types/review';
import { ReviewsContext } from '../contexts/rewiewsContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photoContainer: {
    marginLeft: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateReview'>;
  route: RouteProp<RootStackParamList, 'CreateReview'>;
};

export const CreateReviewScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>('');
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => <IconButton onPress={() => navigation.goBack()} name='x' />,
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert('レビューまたは画像がありません');
      return;
    }
    setLoading(true);
    // documentのIDを先に取得
    const reviewDocRef = await createReviewRef(shop.id);
    // storageのpawhを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await updloadImage(imageUri, storagePath);
    // reviewドキュメントを作る
    const review = {
      id: reviewDocRef.id,
      user: {
        name: user?.name,
        id: user?.id,
      },
      shop: {
        name: shop.name,
        id: shop.id,
      },
      text,
      score,
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    // レビュー一覧に即時反映する
    setReviews([review, ...reviews]);
    await reviewDocRef.set(review);
    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label='レビュー'
        placeholder='レビューを書いてください'
      />
      <View style={styles.photoContainer}>
        <IconButton name='camera' onPress={onPickImage} color='#ccc' />
        {!!imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <Button text='レビューを投稿する' onPress={onSubmit}></Button>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
