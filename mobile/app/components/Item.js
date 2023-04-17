import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

function Item(props) {
    return (
        <View key={props.id} style={styles.card}>
                <Image source={{ uri: props.image }} style={styles.image} />
                <Text style={styles.info}>{props.name}</Text>
                <Text style={styles.info}>${props.price}</Text>
            </View>
    );
}

const styles = StyleSheet.create
({
    card: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        height: 400,
        width: 300,
        overflow: 'hidden'
    },
    image: {
        height: 300,
        width: 300,
        marginBottom: 16,
        borderRadius: 37
    },
    price:
    {
        color: 'gray',
        fontSize: 12
    },
    info: 
    {
        color: '#000',
        fontSize: 24,
        textAlign: 'left',
        fontFamily: 'Habibi'
    }
})

export default Item;