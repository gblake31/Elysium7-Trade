import React, {useState} from 'react'
import './ListItem.css'

function ListItem(props) {
    
    function clickItem () {
        localStorage.setItem('item', JSON.stringify(props.item));
        window.location.href = "/item";
    }

    function editItem() {
        localStorage.setItem('item', JSON.stringify(props.item));
        window.location.href = "/listing";
    }

    console.log(props.itemid);
    console.log(props.sellerid);
    return (
        <div id = 'card' onClick = {props.inventory ? editItem : clickItem}>
            <h3 id='name'>{props.item.itemname}</h3>
            <img className='listItemImg' src = {props.item.image}></img>
            <h3 id = 'price'>${props.item.price}</h3>
            <p>{props.item.description}</p>
        </div>
    );
}

export default ListItem;