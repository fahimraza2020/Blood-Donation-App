import React, { Component } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'

class Home extends Component {

    static navigationOptions = {
        header: null
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
                <View style={{ flex: 0.6 }}>
                    <View>
                        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', textDecorationLine: 'underline', color: '#f52844' }}>Blood Donator App</Text>
                    </View>
                    <View style={{ height: 90, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', width: "90%", alignSelf: 'center' }}>
                            You can donate for ones in need and request donation for blood if you need
                        </Text>
                    </View>
                    <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 15 }}>
                        <TouchableOpacity style={{ width: "80%", alignSelf: 'center', height: "auto", padding: 20, borderWidth: 2, borderColor: '#f52844', borderRadius: 40, backgroundColor: 'white' }} onPress={() => this.props.navigation.navigate("Log In")}>
                            <Text style={{ textAlign: "center", color: '#f52844', fontSize: 17, fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
                        <TouchableOpacity style={{ width: "80%", alignSelf: 'center', height: "auto", padding: 20, borderWidth: 2, borderColor: '#f52844', borderRadius: 40, backgroundColor: '#f52844' }} onPress={() => this.props.navigation.navigate("Sign Up")}>
                            <Text style={{ textAlign: "center", color: 'white', fontSize: 17, fontWeight: 'bold' }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: "auto", width: "95%", padding: 10, alignSelf: 'center' }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        By Creating an account you agree to the Terms of Services of Use and Privacy Policy.
                    </Text>
                </View>
            </View>
        )
    }
}

export default Home
