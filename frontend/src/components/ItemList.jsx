import React, {useState} from 'react'
import jsonData from './data'
import ListItem from './ListItem';

function createCard(obj) {
    return <ListItem name = {obj.itemname} price = {obj.price} image = {obj.image} desc = {obj.description}/>
}

function ItemList(props) {
    // This data will eventually come from the API, not a json file.
    let items = props.arr;
    console.log(items);
    return (
        <div id = 'outer'>
            <style>
                {`
                    #outer {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                `}
            </style>
            {items.map(x => createCard(x))}
        </div>

    );
}

export default ItemList;