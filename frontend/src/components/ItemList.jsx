import React, {useState} from 'react'
import jsonData from './data'
import ListItem from './ListItem';

function createCard(obj) {
    return <ListItem name = {obj.name} price = {obj.price} image = {obj.image} desc = {obj.desc}/>
}

function ItemList() {
    // This data will eventually come from the API, not a json file.
    let items = jsonData.list;
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