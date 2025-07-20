import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CalculatorButton({ label, onPress }) {
  const isOperator = ['/', '*', '-', '+', '=', '%'].includes(label);
  const isAction = ['C', 'DEL'].includes(label);

  return (
    <TouchableOpacity
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
      style={[
        styles.button,
        isOperator && styles.operator,
        isAction && styles.action,
      ]}
    >
      <Text style={[styles.text, (isOperator || isAction) && styles.textLight]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    backgroundColor: '#A9C7E2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#2B2D42',
    fontSize: 28,
    fontFamily: 'SingleDay',
  },
  textLight: {
    color: '#fff',
  },
  operator: {
    backgroundColor: '#2B2D42',
  },
  action: {
    backgroundColor: '#D6C3E9',
  },
});
