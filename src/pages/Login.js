import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input, Image } from '@rneui/themed';

export default function Login({ navigation }) {
    return (
        <>
            <View style={style.logo}>
                <Image style={style.image} source={require('../../assets/sicoob.png')} />
            </View>
            <View style={style.container}>
                <Input
                    placeholder='E-mail'
                />
                <Input placeholder="Senha" secureTextEntry={true} />
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
                        onPress={() => navigation.navigate("Camera")}
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
