import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'

class Requests extends Component {
    constructor() {
        super()
        this.state = {
            arr: ['a', 'a', 'a', 'a', 'a']
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, paddingTop: 40 }}>
                    <View style={{ marginBottom: 60 }}>
                        {this.state.arr.map(() => {
                            return <View key={Math.random()} style={{ width: "90%", backgroundColor: "white", alignSelf: 'center', marginTop: 15, elevation: 10, borderRadius: 8 }}>
                                <View style={{ flex: 1, padding: 20 }}>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Description</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            Lorem ipsum doler emit acros the origin plat in the order.
                                            </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Location</Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            At indus Hospital
                                             </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: 'gray' }}>Status</Text>
                                        <Text style={{ fontWeight: "bold", color: "#f52844" }}>
                                            Fulfilled / Not Fulfilled
                                        </Text>
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

export default Requests
