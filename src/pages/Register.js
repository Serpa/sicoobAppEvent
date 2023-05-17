import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Button, Input } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import AuthService from '../../AuthService';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, setDoc, getDocs, doc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
const storage = getStorage();
const db = getFirestore();

export default function Register() {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [phone, setPhone] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setLoading(true);
        try {
            const user = await AuthService.register(email, password)
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", selectedImage, true);
                xhr.send(null);
            });

            const fileRef = ref(storage, `avatars/${user.uid}.jpg`);
            const result = await uploadBytes(fileRef, blob);
            blob.close();
            const photo_url = await getDownloadURL(fileRef);
            await updateProfile(user, {
                displayName: name,
                photoURL: photo_url,
            });
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                phoneNumber: phone,
                photoURL: photo_url,
            }, { capital: true }, { merge: true });
            setLoading(false)
        } catch (e) {
            console.warn(e);
            setError(e.message)
            setLoading(false);
        }
    }


    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };


    return (
        <ScrollView >
            <View style={style.container}>
                <Avatar
                    size={250}
                    rounded
                    source={{ uri: selectedImage }}
                    title="Avatar"
                    containerStyle={{ backgroundColor: 'grey' }}
                >
                    <Avatar.Accessory size={50} onPress={handleImagePicker} />
                </Avatar>
                <Input
                    disabledInputStyle={{ background: "#ddd" }}
                    errorMessage={errors.name ? 'Insira um nome válido' : ''}
                    leftIcon={<Icon name="account-outline" size={20} />}
                    placeholder="Digite o seu nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    disabledInputStyle={{ background: "#ddd" }}
                    errorMessage={errors.phone ? 'Insira um celular válido' : ''}
                    leftIcon={<Icon name="cellphone" size={20} />}
                    placeholder="Digite seu celular"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    disabledInputStyle={{ background: "#ddd" }}
                    errorMessage={errors.email ? 'Insira um email válido' : ''}
                    leftIcon={<Icon name="email" size={20} />}
                    placeholder="Digite o seu e-mail"
                    value={email}
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    disabledInputStyle={{ background: "#ddd" }}
                    errorMessage={errors.password ? 'Insira uma senha valida' : ''}
                    leftIcon={<Icon name="form-textbox-password" size={20} />}
                    placeholder="Digite a sua senha"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <Input
                    disabledInputStyle={{ background: "#ddd" }}
                    errorMessage={errors.password2 ? 'A senha não confere' : ''}
                    leftIcon={<Icon name="form-textbox-password" size={20} />}
                    placeholder="Confirme sua senha"
                    secureTextEntry={true}
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
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
                    onPress={handleRegister}
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
