import React, {useState} from 'react'
import jsonData from './data'
import ListItem from './ListItem';

function ItemList(props) {

    function createCard(obj) {
        return <ListItem item = {obj} inventory = {props.inventory}/>
    }

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
                        column-gap: 2vw;
                    }
                `}
            </style>
            {items.map(x => createCard(x))}
        </div>

    );
}

export default ItemList;