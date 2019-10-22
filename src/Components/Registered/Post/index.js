import React, { Component } from 'react'
import { Image, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-paper';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { Button, Picker } from 'native-base';

let userData = ''

export const getData = (e) => {
    userData = e
}

class Post extends Component {
    constructor() {
        super()
        this.state = {
            units: '',
            urgency: 'Urgent',
            country: 'Country',
            states: 'State',
            city: "City",
            hospital: "Hospital",
            relation: "Relation With Patient",
            selected: 'Blood Group',
            contact: '',
            userData: '',
        }
    }

    componentDidMount() {
        this.setState({ userData })
    }

    post() {
        const { urgency, units, country, states, city, hospital, relation, selected, contact } = this.state
        if (urgency !== null && units !== null && country !== null && states !== null && city !== null && hospital !== null && relation !== null && selected !== null && contact !== null) {
            fetch("http://192.168.0.102:3010/posts/addPosts", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    units, urgency, country, states, city, hospital, relation, bloodGroup: selected, contact, email: userData.email, name: userData.name
                })
            })
                .then((res) => res.json())
                .then(() => {
                    this.setState({
                        units: '',
                        urgency: 'Urgent',
                        country: 'Country',
                        states: 'State',
                        city: "City",
                        hospital: "Hospital",
                        relation: "Relation With Patient",
                        selected: 'Blood Group',
                        contact: '',
                    })
                })
        } else {
            console.log("Something is Empty! Please full out all the fields.")
        }
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
                                <View style={{ flex: 1, marginBottom: 30 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
                                        <MaterialIcons name="format-list-numbered" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="No.of Units Required"
                                            mode="outlined"
                                            style={{ width: '80%' }}
                                            value={this.state.units}
                                            onChangeText={(e) => { this.setState({ units: e }) }}
                                            keyboardType='numeric'
                                            maxLength={3}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.urgency}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ urgency: e })}
                                        >
                                            <Picker.Item label="Urgency" value={null} />
                                            <Picker.Item label="Within 5 hours" value="Within 5 hours" />
                                            <Picker.Item label="Within 12 hours" value="Within 12 hours" />
                                            <Picker.Item label="Within 24 hours" value="Within 24 hours" />
                                            <Picker.Item label="Within 2 days" value="Within 2 days" />
                                            <Picker.Item label="Within Week" value="Within Week" />
                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.country}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ country: e })}
                                        >
                                            <Picker.Item label="Country" value={null} />
                                            <Picker.Item label="Pakistan" value="Pakistan" />
                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.states}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ states: e })}
                                        >
                                            <Picker.Item label="State" value={null} />
                                            <Picker.Item label="Sindh" value="Sindh" />
                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.city}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ city: e })}
                                        >
                                            <Picker.Item label="City" value={null} />
                                            <Picker.Item label="Karachi" value="Karachi" />
                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.hospital}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ hospital: e })}
                                        >
                                            <Picker.Item label="Hospital" value={null} />
                                            <Picker.Item label="Indus Hospital" value="Indus Hospital" />
                                            <Picker.Item label="Ziauddin Hospital" value="Ziauddin Hospital" />
                                            <Picker.Item label="Aga Khan Hospital" value="Aga Khan Hospital" />
                                            <Picker.Item label="Liaquat National Hospital" value="Liaquat National Hospital" />
                                            <Picker.Item label="OMI" value="OMI" />
                                            <Picker.Item label="Jinnah Hospital" value="Jinnah Hospital" />
                                            <Picker.Item label="Holy Family Hospital" value="Holy Family Hospital" />
                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Ionicons name="ios-arrow-dropdown" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={this.state.relation}
                                            style={{ marginTop: 10 }}
                                            onValueChange={(e) => this.setState({ relation: e })}
                                        >
                                            <Picker.Item label="Relation With Patient" value={null} />
                                            <Picker.Item label="Father" value="Father" />
                                            <Picker.Item label="Mother" value="Mother" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Aunt" value="Aunt" />
                                            <Picker.Item label="Uncle" value="Uncle" />
                                            <Picker.Item label="Nephew" value="Nephew" />
                                            <Picker.Item label="Niece" value="Niece" />
                                            <Picker.Item label="Friend" value="Friend" />
                                            <Picker.Item label="Neighbour" value="Neighbour" />
                                            <Picker.Item label="None" value="None" />
                                        </Picker>
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
                                        <Feather name="phone" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" />
                                        <TextInput
                                            label="Contact no."
                                            mode="outlined"
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            style={{ width: '80%' }}
                                            value={this.state.contact}
                                            onChangeText={(e) => { this.setState({ contact: e }) }}
                                            keyboardType="numeric"
                                            maxLength={11}
                                        />
                                    </View>
                                    <View style={{ flex: 1, marginTop: 20 }}>
                                        <Button full rounded style={{ backgroundColor: '#f52844', width: "70%", alignSelf: 'center', padding: 30 }} onPress={this.post.bind(this)}>
                                            <Text style={{ fontSize: 20, color: "white" }}>Post</Text>
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

export default Post
