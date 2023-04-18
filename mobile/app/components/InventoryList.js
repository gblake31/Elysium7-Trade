import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import Item from './Item';

function InventoryList(props) {
    const [listings, setListings] = useState(props.itemList);

    function renderItem({ item }) {
        return (
            <Item id={item.id} name={item.itemname} description={item.description} condition={item.condition} image={item.image} />
        );
    }

    return (
        <ScrollView style={styles.container}>
            {listings.map(item => (
                <Item id={item._id} name={item.itemname} price={item.price} image={item.image} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        height: 100
    }
})

export default InventoryList;