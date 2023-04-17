import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

function Item(props) {
    return (
        <View key={props.id} style={styles.card}>
                <Image source={{ uri: props.image }} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.price}>{props.name}</Text>
                    <Text style={styles.price}>{props.description}</Text>
                    <Text style={styles.price}>{props.condition}</Text>
                </View>
            </View>
    );
}

const styles = StyleSheet.create
({
    card: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        height: 500,
        width: 300,
        borderWidth: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        height: 250,
        width: 300,
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

export default Item;