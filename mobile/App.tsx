import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#1d1d2e"
        barStyle="light-content"
        translucent={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
