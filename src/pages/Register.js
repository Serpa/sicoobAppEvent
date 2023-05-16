import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Button, Input } from '@rneui/themed';


export default function Register() {
    const input = useRef([]);
    const [name, setName] = useState({ value: '', error: false });
    const [email, setEmail] = useState({ value: '', error: false });
    const [password, setPassword] = useState({ value: '', error: false });
    const [password2, setPassword2] = useState({ value: '', error: false });
    const [phone, setPhone] = useState({ value: '', error: false });
    const [photo, setPhoto] = useState(null);
    return (
        <ScrollView >
            <View style={style.container}>
                <Avatar
                    size={250}
                    rounded
                    source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
                    title="Avatar"
                    containerStyle={{ backgroundColor: 'grey' }}
                >
                    <Avatar.Accessory size={50} />
                </Avatar>
                <Input
                    ref = {ref => input.current.name = ref}
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage={name.error ? 'Insira um nome válido' : false}
                    errorStyle={{}}
                    errorProps={{}}
                    inputStyle={{}}
                    labelStyle={{}}
                    labelProps={{}}
                    leftIcon={<Icon name="account-outline" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} onPress={() => input.current.name.clear()} />}
                    rightIconContainerStyle={{}}
                    placeholder="Digite o seu nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    ref = {ref => input.current.email = ref}
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage={email.error ? 'Insira um email válido' : false}
                    leftIcon={<Icon name="email" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} onPress={() => input.current.email.clear()} />}
                    rightIconContainerStyle={{}}
                    placeholder="Digite o seu e-mail"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    ref = {ref => input.current.password = ref}
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage={password.error ? 'Insira uma senha valida' : false}
                    leftIcon={<Icon name="form-textbox-password" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} onPress={() => input.current.password.clear()} />}
                    rightIconContainerStyle={{}}
                    placeholder="Digite a sua senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <Input
                    ref = {ref => input.current.password2 = ref}
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage={password2.error ? 'A senha não confere' : false}
                    leftIcon={<Icon name="form-textbox-password" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} onPress={() => input.current.password2.clear()} />}
                    rightIconContainerStyle={{}}
                    placeholder="Confirme sua senha"
                    secureTextEntry={true}
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
                />
                <Input
                    ref = {ref => input.current.phone = ref}
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage={phone.error ? 'Insira um celular válido' : false}
                    leftIcon={<Icon name="cellphone" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} onPress={() => input.current.phone.clear()} />}
                    rightIconContainerStyle={{}}
                    placeholder="Digite seu celular"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
                <Button
                    title="Cadastrar"
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
                />
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
