import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { Dialog } from '@rneui/themed';
const db = getFirestore();

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [msg, setMsg] = useState('');
  const user = useAuthentication();
  const toggleDialog1 = (msg) => {
    setMsg(msg);
    setVisible1(!visible1);
  };
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const teste = JSON.parse(data);
    const docRef = doc(db, "users", user.user.uid);
    const docSnap = await getDoc(docRef);
    const user_info = docSnap.data()
    if (user_info.visited.includes(teste.Expo)) {
      toggleDialog1(`Presença em ${teste.name} já cadastrada!`);
    } else {
      user_info.visited.push(teste.Expo)
      await updateDoc(doc(db, "users", user.user.uid), {
        visited: user_info.visited
      }, { capital: true }, { merge: true });
      toggleDialog1(`Presença confirmada em ${teste.name}!`);
    }

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Dialog
        isVisible={visible1}
        onBackdropPress={toggleDialog1}
      >
        <Dialog.Title title="Dialog Title" />
        <Text>{msg}</Text>
      </Dialog>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});