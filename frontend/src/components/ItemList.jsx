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
                        flex-direction: column;
                    }
                `}
            </style>
            <h2>Check out these new offers!</h2>
            {items.map(x => createCard(x))}
        </div>

    );
}

export default ItemList;