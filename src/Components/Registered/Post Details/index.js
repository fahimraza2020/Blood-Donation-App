import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';

let userData = ''

export const getDataForMine = (e) => {
    userData = e
}

class PostDetails extends Component {

    constructor() {
        super()
        this.state = {
            comment: '',
            arr: [],
            check: false,
            padding: 10
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
                        if (!!e[1][key].comments) {
                            let comment = e[1][key].comments
                            e[1][key].allComment = Object.values(comment)
                        }
                        if (!!e[1][key].volunteers) {
                            let volunteers = e[1][key].volunteers
                            e[1][key].all = Object.values(volunteers)
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

    comment(uid, key) {
        let comment = this.state.comment
        fetch("http://192.168.0.102:3010/posts/addComment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid, key, comment })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
    }

    check(uid, key) {
        this.setState({ check: !this.state.check, padding: this.state.padding === 10 ? 0 : 10 })
        fetch("http://192.168.0.102:3010/posts/deletePost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid, key })
        })
            .then((res) => res.json())
            .then(() => {
                Alert.alert(
                    "Nice Work",
                    "Your blood requirement is fulfilled.",
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                {
                    this.state.loader ? <ActivityIndicator animating={true} color={Colors.pinkA100} size={40} style={{ marginTop: 20 }} /> : <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset="160" enabled style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1, paddingTop: 40 }}>
                            <View>
                                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: '#f52844' }}>My Posts</Text>
                            </View>
                            {this.state.arr.map((e) => {
                                return e.uid === userData.uid && <View key={Math.random()} style={{ width: "90%", backgroundColor: "white", alignSelf: 'center', marginBottom: 50, marginTop: 15, elevation: 10, borderRadius: 8 }}>
                                    <View style={{ flex: 1, padding: 20 }}>
                                        <View>
                                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{e.name}</Text>
                                        </View>
                                        <View style={{ alignSelf: 'flex-end', borderColor: "black", borderWidth: 1 }}>
                                            <TouchableOpacity style={{ padding: this.state.padding }} onPress={this.check.bind(this, e.uid, e.pushKey)}>
                                                {this.state.check && <FontAwesome name="check" size={20} color="black" />}
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray' }}>Units Required</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {e.units}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray' }}>Donation Received</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {!!e.volunteers ? e.volunteers : 0}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray' }}>Blood Group</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {e.bloodGroup}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray' }}>Location</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {e.city}, {e.country}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray' }}>Hospital</Text>
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
                                            <Text style={{ color: 'gray' }}>Relation with Patient</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {e.relation}
                                            </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ color: 'gray' }}>Contact no.</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {e.contact}
                                            </Text>
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: "black", marginTop: 20 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: 'center', color: "blue" }}>Volunteers</Text>
                                        </View>
                                        {!!e.all ? e.all.map((s) => {
                                            return <View key={Math.random()} style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 30 }}>
                                                <Text style={{ color: 'gray' }}>{s.firstName + " " + s.lastName}</Text>
                                                <Text style={{ fontWeight: "bold", color: 'red' }}>
                                                    {s.bloodGroup}
                                                </Text>
                                                <Text style={{ color: 'gray' }}>Status</Text>
                                                <Text style={{ fontWeight: "bold", color: 'red' }}>
                                                    Donated / Not Donated
                                                </Text>
                                            </View>
                                        }) : <View style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 30 }}>
                                                <Text style={{ color: 'gray' }}>No Volunteers.</Text>
                                            </View>}
                                        <View style={{ borderWidth: 1, borderColor: "black", marginTop: 20 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: 'center', color: "blue" }}>Comments</Text>
                                        </View>
                                        {!!e.allComment ? e.allComment.map((f) => {
                                            return <View key={Math.random()} style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 20 }}>
                                                <Text style={{ color: 'gray' }}>{f.name}</Text>
                                                <Text style={{ fontWeight: "bold", color: 'red' }}>
                                                    {f.comment}
                                                </Text>
                                            </View>
                                        }) : <View style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 30 }}>
                                                <Text style={{ color: 'gray' }}>No Comments.</Text>
                                            </View>}
                                        <View style={{ flex: 1, marginTop: 40, flexDirection: "row" }}>
                                            <TextInput
                                                label="Comment"
                                                mode="outlined"
                                                style={{ width: '90%', height: 60, padding: 0 }}
                                                value={this.state.comment}
                                                onChangeText={(e) => { this.setState({ comment: e }) }}
                                            />
                                            <TouchableOpacity onPress={this.comment.bind(this, e.uid, e.pushKey)}>
                                                <Feather name="send" size={20} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            })}
                        </ScrollView>
                    </KeyboardAvoidingView>
                }
            </View >
        )
    }
}

export default PostDetails
