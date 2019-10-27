import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';

class Detailed extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
            arr: [],
            uid: '',
            key: ''
        }
    }

    componentDidMount() {
        let uid = this.props.navigation.getParam("uid")
        let key = this.props.navigation.getParam("key")
        this.setState({ loader: true, uid, key })
        fetch("http://192.168.0.102:3010/posts/getSpecificPosts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid, key })
        })
            .then((res) => res.json())
            .then((data) => {
                let arr = this.state.arr
                arr.push(data.data)
                if (!!data.data.comments) {
                    let comment = data.data.comments
                    data.data.allComment = Object.values(comment)
                }
                if (!!data.data.volunteers) {
                    let volunteers = data.data.volunteers
                    data.data.all = Object.values(volunteers)
                    let arr = []
                    for (let key in volunteers) {
                        arr.push(key)
                    }
                    let length = arr.length
                    data.data.volunteers = length
                }
                this.setState({ arr, loader: false })
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

    render() {
        return (
            <View style={{ flex: 1 }} >
                {this.state.loader ? <ActivityIndicator animating={true} color={Colors.pinkA100} size={40} style={{ marginTop: 20 }} /> : <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset="160" enabled style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, paddingTop: 40 }}>
                        <View style={{ width: "90%", backgroundColor: "white", alignSelf: 'center', marginBottom: 50, marginTop: 15, elevation: 10, borderRadius: 8 }}>
                            {this.state.arr.map((e) => {
                                return <View key={Math.random()} style={{ flex: 1, padding: 20 }}>
                                    <View>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{e.name}</Text>
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
                            })}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>}
            </View>
        )
    }
}

export default Detailed
