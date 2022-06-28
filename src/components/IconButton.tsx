import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  color?: string;
};

export const IconButton: React.FC<Props> = ({ onPress, name, color = '#000' }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name={name} color={color} size={32} />
    </TouchableOpacity>
  );
};
