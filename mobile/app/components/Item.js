import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Item(props) {
    const router = useRouter();

    const openItem = async () => {
        try 
        {
            await AsyncStorage.setItem('item_id', props.id);
            router.push('./ItemScreen');
        }
        catch (e)
        {
            console.error(e);
        }
    }

    

    return (
        <View key={props.id} style={styles.card}>
            <Pressable onPress={openItem}>
                <Image source={{ uri: props.image }} style={styles.image} />
            </Pressable>
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
    info: 
    {
        color: '#000',
        fontSize: 24,
        textAlign: 'left',
        fontFamily: 'Habibi'
    }
})

export default Item;