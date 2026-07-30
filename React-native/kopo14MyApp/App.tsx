import { StyleSheet, View, Text } from 'react-native';
function App() {
  return (
    <View style={{ marginTop: 80, alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>나의 첫 React Native 앱</Text>
      <Text style={styles.title}>제목</Text>
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  box: { padding: 20, backgroundColor: '#ffffff' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
