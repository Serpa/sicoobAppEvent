import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input, Image } from '@rneui/themed';
import AuthService from "../../AuthService";
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await AuthService.signIn(email, password)
            setLoading(false)
        } catch (e) {
            setError(e.message)
            setLoading(false);
        }
    }

    const teste = () => {
        console.warn(useAuthentication);
    }


    return (
        <>
            <View style={style.logo}>
                <Image style={style.image} source={require('../../assets/sicoob.png')} />
            </View>
            <View style={style.container}>
                <Input
                    placeholder='E-mail'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input placeholder="Senha" secureTextEntry={true} value={password}
                    onChangeText={text => setPassword(text)} />
                <View style={style.buttons}>
                    <Button
                        title="Entrar"
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: 'rgba(92, 99,216, 1)',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5,
                        }}
                        containerStyle={{
                            width: 200,
                            height: 45,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={handleLogin}
                    />
                    <Button
                        title="Cadastro"
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: 'rgba(92, 99,216, 1)',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 5,
                        }}
                        containerStyle={{
                            width: 200,
                            height: 45,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={() => navigation.navigate("Register")}
                    />
                </View>
            </View>
        </>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 247,
        height: 141,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})
