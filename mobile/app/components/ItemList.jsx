import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, Image, Pressable, FlatList } from 'react-native';
import Item from './Item';

const LOAD_ITEMS_ENDPOINT = 'http://paradise-7.herokuapp.com/api/loadKItems';

function ItemList(props) {
    const [items, setItems] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [numItems, setNumItems] = useState(10);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadItems() {
            try {
                const response = await fetch(LOAD_ITEMS_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        search: props.search,
                        startindex: startIndex,
                        numitems: 10,
                        category: props.category
                    })
                });

                const res = JSON.parse(await response.text());
                
                if (res.error) {
                    setError(res.error);
                    console.log(error);
                } else {
                    setItems(prevItems => [...prevItems, ...res.results]);
                    //setStartIndex(prevIndex => prevIndex + 10);
                }
            } catch (e) {
                console.error(e);
            }
        }
        loadItems();
    }, [props.search, props.category, startIndex]);

    function renderItem({ item }) {
        return (
            <Item id={item.id} name={item.itemname} description={item.description} condition={item.condition} image={item.image} />
        );
    }

    function handleLoadMore() {
        if (!error) {
            console.log("Loading more items");
            setStartIndex(prevIndex => prevIndex + numItems);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList horizontal={true}
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500
        //flexWrap: 'wrap',
    },
    card: {
        flex: 1,
        margin: 10,
        height: 500,
        width: 300,
        borderWidth: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        height: 150,
    },
    details: {
        padding: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    seller: {
        color: '#999',
    },
});


export default ItemList;