import React, { Component } from 'react'
import { Image, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Button } from 'native-base';
import { getData } from '../../Registered/Post/index'
import { getDataForMain } from '../../Registered/Main/index'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    static navigationOptions = {
        header: null
    }


    logIn() {
        const { email, password } = this.state
        fetch("http://192.168.0.102:3010/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((data) => {
                getData(data)
                getDataForMain(data)
                this.props.navigation.navigate("App")
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: 'https://t3.ftcdn.net/jpg/01/05/49/00/240_F_105490066_WLdcS7SfbBiqmiczxHpwSSDH9UAW8SPV.jpg' }}
                    />
                </View>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset="10" enabled style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: '#f52844' }}>KanMerkezi</Text>
                        </View>
                        <ScrollView ref={ref => this.scrollView = ref}
                            onContentSizeChange={() => {
                                this.scrollView.scrollToEnd({ animated: true });
                            }}>
                            <View style={{ flex: 1, paddingTop: 50 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Entypo name="email" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="Email"
                                            mode="outlined"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            keyboardType="email-address"
                                            style={{ width: '80%' }}
                                            value={this.state.email}
                                            onChangeText={(e) => { this.setState({ email: e }) }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <FontAwesome name="key" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="Password"
                                            mode="outlined"
                                            autoCapitalize="none"
                                            style={{ width: '80%' }}
                                            value={this.state.password}
                                            onChangeText={(e) => { this.setState({ password: e }) }}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                    <View style={{ flex: 1, marginTop: 40 }}>
                                        <Button full rounded style={{ backgroundColor: '#f52844', width: "70%", alignSelf: 'center', padding: 30 }} onPress={this.logIn.bind(this)}>
                                            <Text style={{ fontSize: 20, color: "white" }}>Login</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default SignIn
