import React, {useState} from 'react'

function ListItem(props) {
    
    function clickItem () {
        localStorage.setItem('item', JSON.stringify(props.item));
        window.location.href = "/item";
    }

    console.log(props.itemid);
    console.log(props.sellerid);
    return (
        <div id = 'card' onClick = {clickItem}>
            <style>
                {`
                    #card {
                        display: flex;
                        flex-direction: column;
                        border-style: solid;
                        border-width: medium;
                        cursor: pointer;
                        width: 500px;
                    }
                    #card:hover {
                        background-color: rgb(230,230,230);
                    }
                    #card > * {
                        margin: 10px;
                    }
                    #top {
                        display: flex;
                        flex-direction: row;
                    }
                    #top > * {
                        margin: 10px;
                    }
                    #price {
                        border-style: solid;
                        border-width: medium;
                        padding: 1%;
                    }
                    img {
                        width: 150px;
                        height: auto;
                    }
                `}
            </style>
            <div id = 'top'>
                <h3>{props.item.name}</h3>
                <h3 id = 'price'>${props.item.price}</h3>
            </div>  
            <img src = {props.item.image}></img>
            <p>{props.item.desc}</p>
        </div>
    );
}

export default ListItem;