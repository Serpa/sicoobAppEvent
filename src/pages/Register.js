import React from 'react'
import { View } from 'react-native'
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function Register() {
    const input = React.createRef();
    return (
        <View>
            <Input
                ref={input}
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                errorMessage="Oops! that's not correct."
                errorStyle={{}}
                errorProps={{}}
                inputStyle={{}}
                label="Cadastro"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="account-outline" size={20} />}
                leftIconContainerStyle={{}}
                rightIcon={<Icon name="close" size={20} onPress={() => input.current.clear()} />}
                rightIconContainerStyle={{}}
                placeholder="Enter Name"
            />
            <Input
                ref={input}
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                errorMessage="Oops! that's not correct."
                leftIcon={<Icon name="account-outline" size={20} />}
                leftIconContainerStyle={{}}
                rightIcon={<Icon name="close" size={20} onPress={() => input.current.clear()} />}
                rightIconContainerStyle={{}}
                placeholder="Enter Name"
            />
        </View>
    )
}
