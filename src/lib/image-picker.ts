import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const getCameraRollPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('画像を選択するためにはカメラロールの許可が必要です');
    }
  }
};

export const pickImage = async () => {
  // パーミッションの取得
  await getCameraRollPermission();
  // ImagePickerk起動
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
  if (!result.cancelled) {
    return result.uri;
  }
};
