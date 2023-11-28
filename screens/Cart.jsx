//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';


// create a component
const Cart = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Cart</Text>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Cart;
