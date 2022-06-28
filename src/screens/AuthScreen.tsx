import { StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: '#888',
  },
});

export const AuthScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large' />
      <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
  );
};
