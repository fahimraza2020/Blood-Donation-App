import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Button } from 'native-base'

let userData = ''

export const getDataForMain = (e) => {
    userData = e
}

export class Main extends Component {
    constructor() {
        super()
        this.state = {
            arr: []
        }
    }

    componentDidMount() {
        fetch("http://192.168.0.102:3010/posts/getAll")
            .then((res) => res.json())
            .then((data) => {
                this.setState({ arr: data.result })
            })
    }

    render() {
        // console.log(this.state.arr, '/array')
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, paddingTop: 40 }}>
                    <View style={{ marginBottom: 60 }}>
                        {this.state.arr.length > 0 && this.state.arr.map((e) => {
                            return <View key={Math.random()} style={{ width: "90%", backgroundColor: "white", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8 }}>
                                <View style={{ flex: 1, padding: 20 }}>
                                    <View>
                                        <Text style={{ color: 'gray' }}>Name</Text>
                                        <Text style={{ fontWeight: "bold" }}>{e.name}</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Description</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            We need {e.units} units of blood. We are from {e.states}.
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
                                            0{e.contact}
                                        </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Volunteers Uptill now</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            3
                                    </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Current Requirement</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            7
                                    </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Button block style={{ backgroundColor: "black", marginTop: 5 }}>
                                            <Text style={{ color: "white" }}>Volunteer</Text>
                                        </Button>
                                        <Button block style={{ marginTop: 10, backgroundColor: "#f52844" }}>
                                            <Text style={{ color: "white" }}>Comment</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Main