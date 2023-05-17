import React from 'react'
import { Button, Image, Text, View } from 'react-native'
import AuthService from '../../AuthService';
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function Home() {
  const handleLogout = async () => {
    try {
      const user = await AuthService.signOut()
    } catch (e) {
    }
  }

  const teste = useAuthentication()

  return (
    <View>
      <Text>
        {teste?.user?.displayName}
      </Text>
      <Image style={{ width: 100, height: 100 }} source={{ uri: teste?.user?.photoURL }} />
      <Button title='Teste' onPress={handleLogout} />
    </View>
  )
}
