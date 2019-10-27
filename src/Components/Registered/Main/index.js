import React, { Component } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'
import { Button } from 'native-base'
import { ActivityIndicator, Colors } from 'react-native-paper';

let userData = ''

export const getDataForMain = (e) => {
    userData = e
}

export class Main extends Component {
    constructor() {
        super()
        this.state = {
            arr: [],
        }
    }

    componentDidMount() {
        this.setState({ loader: true })
        fetch("http://192.168.0.102:3010/posts/getAll")
            .then((res) => res.json())
            .then((data) => {
                data.map((e) => {
                    let arr = this.state.arr
                    for (let key in e[1]) {
                        arr.push(e[1][key])
                        if (!!e[1][key].volunteers) {
                            let volunteers = e[1][key].volunteers
                            let arr = []
                            for (let key in volunteers) {
                                arr.push(key)
                            }
                            let length = arr.length
                            e[1][key].volunteers = length
                        }
                    }
                    this.setState({ arr })
                })
                this.setState({ loader: false })
            })
    }

    volunteerCount(uid, key, blg) {
        fetch("http://192.168.0.102:3010/posts/addVolunteer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid, key, blg })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.msg === "Blood Group doesn't match") {
                    Alert.alert(
                        "You can't proceed",
                        "Your blood Group doesn't match the Post request.",
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    );
                }
            })
    }

    commentDown(uid, key) {
        this.props.navigation.navigate("Detailed", { uid, key })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loader ? <ActivityIndicator animating={true} color={Colors.pinkA100} size={40} style={{ marginTop: 20 }} /> : <ScrollView style={{ flex: 1, paddingTop: 30 }}>
                    <View style={{ marginBottom: 60 }}>
                        <View>
                            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: '#f52844' }}>All Posts</Text>
                        </View>
                        {this.state.arr.map((e) => {
                            return e.uid !== userData.uid && <View key={Math.random()} style={{ width: "90%", backgroundColor: "white", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8 }}>
                                <View style={{ flex: 1, padding: 20 }}>
                                    <View>
                                        <Text style={{ color: 'gray' }}>Name</Text>
                                        <Text style={{ fontWeight: "bold" }}>{e.name}</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Description</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            We need {e.units} units of {e.bloodGroup} blood group. We are from {e.states}.
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {e.city} , {e.country}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Location</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {e.hospital}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Urgency</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {e.urgency}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Contact</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {e.contact}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Volunteers Uptill now</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {!!e.volunteers ? e.volunteers : 0}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Current Requirement</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {e.units}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Button block style={{ backgroundColor: "black", marginTop: 5 }} onPress={this.volunteerCount.bind(this, e.uid, e.pushKey, e.bloodGroup)}>
                                            <Text style={{ color: "white" }}>Volunteer</Text>
                                        </Button>
                                        <Button block style={{ marginTop: 10, backgroundColor: "#f52844" }} onPress={this.commentDown.bind(this, e.uid, e.pushKey)}>
                                            <Text style={{ color: "white" }}>Comment</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        })}
                    </View>
                </ScrollView>}
            </View>
        )
    }
}

export default Main