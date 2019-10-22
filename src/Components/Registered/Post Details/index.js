import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

class PostDetails extends Component {

    constructor() {
        super()
        this.state = {
            comment: '',
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset="10" enabled style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, paddingTop: 40 }}>
                        <View style={{ width: "90%", backgroundColor: "white", alignSelf: 'center', marginBottom: 50, marginTop: 15, elevation: 10, borderRadius: 8 }}>
                            <View style={{ flex: 1, padding: 20 }}>
                                <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Fahim Memon</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Units Required</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        3
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Donation Required</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        5
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Still Required</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        3
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Blood Group</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        B+
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Location</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Karachi, Pakistan
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Hospital</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Indus
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Urgency</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Urgent
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Relation with Patient</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Neighbour
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Contact no.</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        +92 3052723867
                                    </Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: 'gray' }}>Hospital</Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Indus
                                    </Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: "black", marginTop: 20 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: 'center', color: "blue" }}>Volunteers</Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 30 }}>
                                    <Text style={{ color: 'gray' }}>Rehanuddin</Text>
                                    <Text style={{ fontWeight: "bold", color: 'red' }}>
                                        A+
                                    </Text>
                                    <Text style={{ color: 'gray' }}>Status</Text>
                                    <Text style={{ fontWeight: "bold", color: 'red' }}>
                                        Donated / Not Donated
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 30 }}>
                                    <Text style={{ color: 'gray' }}>Imam Ul Haq</Text>
                                    <Text style={{ fontWeight: "bold", color: 'red' }}>
                                        A+
                                    </Text>
                                    <Text style={{ color: 'gray' }}>Status</Text>
                                    <Text style={{ fontWeight: "bold", color: 'red' }}>
                                        Donated / Not Donated
                                    </Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: "black", marginTop: 20 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: 'center', color: "blue" }}>Comments</Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 20 }}>
                                    <Text style={{ color: 'gray' }}>Rehanuddin</Text>
                                    <Text style={{ fontWeight: "bold", color: 'red' }}>
                                        Comment Here
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: "black", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8, padding: 20 }}>
                                    <Text style={{ color: 'gray' }}>Imam Ul Haq</Text>
                                    <Text style={{ fontWeight: "bold", color: 'red' }}>
                                        Comment Here
                                </Text>
                                </View>
                                <View style={{ flex: 1, marginTop: 40, flexDirection: "row" }}>
                                    <TextInput
                                        label="Comment"
                                        mode="outlined"
                                        style={{ width: '90%', height: 60, padding: 0 }}
                                        value={this.state.comment}
                                        onChangeText={(e) => { this.setState({ comment: e }) }}
                                    />
                                    <TouchableOpacity>
                                        <Feather name="send" size={20} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

export default PostDetails
