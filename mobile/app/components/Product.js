import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Product(props) {
    return (
        <View style={styles.box}>
            <Text style={styles.title}>{props.itemName}</Text>
            <Text style={styles.price}>${props.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create
({
    box:
    {
        backgroundColor: '#fff',
        borderWidth: 2,
        padding: 5,
        width: '20%'
    },
    price:
    {
        color: 'gray',
        fontSize: 12
    },
    title: 
    {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left'
    }
})

export default Product;