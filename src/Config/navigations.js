import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../index';
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const AuthNavigator = createStackNavigator({
    Home: {
        screen: Routes.Home
    },
    "Sign Up": {
        screen: Routes.SignUp
    },
    "Log In": {
        screen: Routes.SignIn
    }
});


const TabNavigator = createMaterialTopTabNavigator(
    {
        "All Posts": {
            screen: Routes.Main
        },
        "My Posts": {
            screen: Routes.PostDetails
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#f52844',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: '#dde2eb',
            },
        },
    },
)

const TabNavigatorMain = createStackNavigator({
    Post: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        },
    },
});

const AppNavigator = createDrawerNavigator({
    Home: {
        screen: TabNavigatorMain
    },
    "Post Blood Request": {
        screen: Routes.Post
    },
    "My Requests": {
        screen: Routes.Requests
    },
    Detailed: {
        screen: Routes.Detailed,
        navigationOptions: {
            drawerLabel: () => null
        }
    }
}, {});


const DrawerNavigatorMain = createStackNavigator({
    Post: {
        screen: AppNavigator,
        navigationOptions: (navigation) => {
            return {
                title: 'Blood Donation App',
                headerStyle: {
                    backgroundColor: '#f52844',
                    height: 70,
                },
                headerLeft: () => (
                    <MaterialCommunityIcons name="hamburger" size={30} style={{ padding: 15, paddingTop: 20, paddingBottom: 20 }} color="black" onPress={() => navigation.navigation.toggleDrawer()} />
                ),
                headerTintColor: 'white',
            }
        },
    },
});

const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: DrawerNavigatorMain,
    },
});

export default createAppContainer(MainNavigator);
