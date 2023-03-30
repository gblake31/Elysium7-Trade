import React, {useState} from 'react'

function ListItem(props) {
    return (
        <div id = 'card'>
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
                <h3>{props.name}</h3>
                <h3 id = 'price'>${props.price}</h3>
            </div>  
            <img src = {props.image}></img>
            <p>{props.desc}</p>
        </div>
    );
}

export default ListItem;