import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CalculatorButton from '../components/CalculatorButton';

const buttons = [
  ['C', '(', ')', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['%', '0', '.', '='],
];

export default function CalculatorScreen() {
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handlePress = (val) => {
    if (val === 'C') {
      setCurrent('');
      setResult('');
    } else if (val === 'DEL') {
      setCurrent((prev) => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        const evalResult = eval(current).toString();
        const evalSafe = current.replace(/(\d+)%(\d+)/g, '($1/100)*$2');
        setResult(eval(evalSafe).toString());
        setHistory((prev) => [...prev, { expression: current, result: evalResult }]);
      } catch {
        setResult('Error');
      }
    } else {
      if (
        (val === '(' && /[0-9)]$/.test(current)) ||
        (val === ')' && /\($/.test(current)) ||
        (val.match(/[0-9.]/) && /\)$/.test(current))
      ) {
        setCurrent((prev) => prev + '*' + val);
      } else {
        setCurrent((prev) => prev + val);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Result Box */}
      <View style={styles.display}>
        <Text style={styles.current}>{current}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      {/* Recent and Del */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setShowHistory(true)}>
          <Text style={styles.recentText}>Recent</Text>
        </TouchableOpacity>
        <Text style={styles.delText} onPress={() => handlePress('DEL')}>
          DEL
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn, colIndex) => (
              <CalculatorButton key={colIndex} label={btn} onPress={() => handlePress(btn)} />
            ))}
          </View>
        ))}
      </View>

      {/* History Side Drawer */}
      {showHistory && (
        <TouchableWithoutFeedback onPress={() => setShowHistory(false)}>
          <View style={styles.historyOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.historyDrawer}>
                <ScrollView contentContainerStyle={styles.historyScroll}>
                  {history.map((item, index) => (
                    <View key={index} style={styles.historyItem}>
                      <Text style={styles.historyExpr}>{item.expression}</Text>
                      <Text style={styles.historyResult}>= {item.result}</Text>
                    </View>
                  ))}
                  {history.length > 0 && (
                    <Text style={styles.clearHistory} onPress={() => setHistory([])}>
                      Clear history
                    </Text>
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3D4EF',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  display: {
    height: 160,
    backgroundColor: '#2B2D42',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },
  current: {
    color: '#A9C7E2',
    fontSize: 32,
    textAlign: 'right',
    fontFamily: 'SingleDay',
  },
  result: {
    color: '#FFFFFF',
    fontSize: 48,
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'SingleDay',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  recentText: {
    fontSize: 16,
    color: '#2B2D42',
    fontFamily: 'SingleDay',
  },
  delText: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#D6C3E9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontFamily: 'SingleDay',
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  historyOverlay: {
    position: 'absolute',
    top: 160 + 105,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  historyDrawer: {
    width: '65%',
    height: '100%',
    backgroundColor: '#E3D4EF',
    padding: 25,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  historyScroll: {
    paddingBottom: 40,
  },
  historyItem: {
    marginBottom: 12,
  },
  historyExpr: {
    fontSize: 18,
    color: '#2B2D42',
    fontFamily: 'SingleDay',
  },
  historyResult: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2D42',
    fontFamily: 'SingleDay',
  },
  clearHistory: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#A9C7E2',
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'SingleDay',
  },
});
