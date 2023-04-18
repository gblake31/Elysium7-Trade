import React, {useState} from 'react'
import './ListItem.css'

function ListItem(props) {
    
    function clickItem () {
        localStorage.setItem('item', JSON.stringify(props.item));
        window.location.href = "/item/"+props.item._id;
    }

    function editItem() {
        localStorage.setItem('item', JSON.stringify(props.item));
        window.location.href = "/listing";
    }

    // console.log(props.itemid);
    // console.log(props.sellerid);
    return (
        <div id = 'card' onClick = {props.inventory ? editItem : clickItem}>
            <img className='listItemImg' src = {props.item.image}></img>
            <h3 id='name'>{props.item.itemname}</h3>
            <h3 id = 'price'>${props.item.price}</h3>
        </div>
    );
}

export default ListItem;