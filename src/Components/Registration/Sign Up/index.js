import React, { Component } from 'react'
import { Image, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-paper';
import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Button, Picker } from 'native-base';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            selected: "Blood Group"
        };
    }

    static navigationOptions = {
        header: null
    }

    signUp() {
        const { firstName, lastName, email, password, selected } = this.state
        fetch("http://192.168.0.102:3010/users/addUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, bloodGroup: selected })
        })
            .then((res) => res.json())
            .then(() => { this.setState({ firstName: '', lastName: '', email: '', password: '', selected: "Blood Group" }) })
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
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
                                        <AntDesign name="user" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="First Name"
                                            mode="outlined"
                                            style={{ width: '80%' }}
                                            value={this.state.firstName}
                                            onChangeText={(e) => { this.setState({ firstName: e }) }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <AntDesign name="user" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="Last Name"
                                            mode="outlined"
                                            style={{ width: '80%' }}
                                            value={this.state.lastName}
                                            onChangeText={(e) => { this.setState({ lastName: e }) }}
                                        />
                                    </View>
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
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.selected}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ selected: e })}
                                        >
                                            <Picker.Item label="Blood Group" value={null} />
                                            <Picker.Item label="A+" value="A+" />
                                            <Picker.Item label="A-" value="A-" />
                                            <Picker.Item label="B+" value="B+" />
                                            <Picker.Item label="B-" value="B-" />
                                            <Picker.Item label="O+" value="O+" />
                                            <Picker.Item label="O-" value="O-" />
                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <FontAwesome name="key" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="Password"
                                            mode="outlined"
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            style={{ width: '80%' }}
                                            value={this.state.password}
                                            onChangeText={(e) => { this.setState({ password: e }) }}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                    <View style={{ flex: 1, marginTop: 20 }}>
                                        <Button full rounded style={{ backgroundColor: '#f52844', width: "70%", alignSelf: 'center', padding: 30 }} onPress={this.signUp.bind(this)}>
                                            <Text style={{ fontSize: 20, color: "white" }}>Sign Up</Text>
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

export default SignUp
