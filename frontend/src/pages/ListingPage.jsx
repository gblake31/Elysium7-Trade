import React, {useState, useEffect} from 'react';
import imageCompression from 'browser-image-compression';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './listing.css'

function ListingPage() {

    let storageStr = localStorage.getItem('item');
    let listing = storageStr.length == 0 ? null : JSON.parse(storageStr);
    let [itemPic, setItemPic] = useState("");
    let bp = require('../components/Leinecker/Path.js');

    let imageRef;
    let nameRef;
    let priceRef;
    let descriptionRef;
    let conditionRef;
    let category;

    function _onSelect (option) {
        console.log('You selected ', option.label);
        category = option.value;
    }

    const options = [
        {value: 0, label: "None"},
        {value: 1, label: "Games"},
        {value: 2, label: 'Consoles'},
        {value: 3, label: 'Controllers'},
        {value: 4, label: 'Keyboards/Mice'},
        {value: 5, label: 'Audio'},
        {value: 6, label: 'Other'}
    ];
    const defaultOption = options[0];

    useEffect(() => {
        if (listing != null) {
			setItemPic(listing.image);
		}
	}, []);

    async function uploadImage() {
        let imgFile = imageRef.files[0]; 
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800
        }
        let compressedFile;
        try {
          compressedFile = await imageCompression(imgFile, options);
        } catch (error) {
          console.log(error);
          return;
        }
  
        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
  
        let imgstr = await toBase64(compressedFile);
        setItemPic(imgstr);
    }

    const createListing = async event =>
	{
		event.preventDefault();
        console.log(category);
	
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {sellerid: local.id, itemname: nameRef.value, price: priceRef.value, description: descriptionRef.value, condition: conditionRef.value, image:itemPic, category: category, listedtime: "0"}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/createItem'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("success");
                addToInventory(res.itemid);
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			console.log(e.toString());
			return;
		}
	}

    const editListing = async event =>
	{
		event.preventDefault();
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {itemid: listing._id, sellerid: local.id, itemname: nameRef.value, price: priceRef.value, description: descriptionRef.value, condition: conditionRef.value, image:itemPic, category: category, listedtime: "0"}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/updateItem'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("updated item successfully!");
                window.location.href = "/profile";
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			console.log(e.toString());
			return;
		}
	}

    const deleteListing = async event =>
	{
		let yes = await window.confirm("Are you sure you want to delete?");
		if(!yes) return;
		event.preventDefault();
		
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {itemid: listing._id, sellerid: local.id}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/deleteItem'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
                deleteFromInventory();
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			console.log(e.toString());
			return;
		}
	}

    const deleteFromInventory = async () =>
	{
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {itemid: listing._id, userid: local.id}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/deleteItemFromUser'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("delete item successfully!");
                window.location.href = "/profile";
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			console.log(e.toString());
			return;
		}
	}

    const addToInventory = async (itemid) => {
	
		let local = JSON.parse(localStorage.getItem('user_data'));
		let obj = {userid: local.id, itemid: itemid}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(bp.buildPath('api/addItemToUser'),
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("success");
                window.location.href = "/profile";
			}
			else {
				console.log(res.error);
			}
		}
		catch(e) {
			console.log(e.toString());
			return;
		}
    }
	
    return (
		<main>
			<div id='listingHeader'>
				<h2>{listing == null ? "Create New Listing" : "Edit Listing"}</h2>
			</div>			
			<div id='listingPage'>
				<div id='listing-image'>
					<img id = 'profile-pic' src = {itemPic}></img>
					<input type = "file" onChange = {uploadImage} ref={(c) => imageRef = c}></input>
				</div>
				<div id = 'input-fields'> 
					<div className='input-box'>
						<label id = "Text" >Item Name:</label>
						<input defaultValue = {listing == null ? "" : listing.itemname} className = "field" type = "text"  ref={(c) => nameRef = c}></input>
					</div>
					<div className='input-box' id='textareaField'>
						<label id = "Text" >Description:</label>
						<textarea className = "field" rows = '5' ref={(c) => descriptionRef = c} 
						placeholder = 'Description' defaultValue={listing == null ? "" : listing.description}></textarea>
					</div>
					<div className='input-box'>
						<label id = "Text" >Price: &#36; </label>
						<input className = "field" type = "text" ref={(c) => priceRef = c} 
						placeholder = 'Price' defaultValue={listing == null ? "" : listing.price}></input>
					</div>
					<div className='input-box'>
						<label id = "Text" >Condition:</label>
						<input className = "field" type = "text" ref={(c) => conditionRef = c} 
						placeholder = 'Condition' defaultValue={listing == null ? "" : listing.condition}></input>
					</div>
					<div className='input-box' id = "categorySelect">
						<label id = "Text" >Select a Category:</label>
						<Dropdown id = 'categoryDropdown' options={options} value = {listing == null ? null : options[listing.category]} onChange={_onSelect}/>
					</div>
					{listing == null ?
						<h3 className = "click-text" onClick={createListing}>Confirm New Listing</h3> :
						<h3 className = "click-text" onClick={editListing}>Confirm Changes to Listing</h3>}
					{listing != null ? <h3 className = "click-text" onClick={deleteListing}>Delete This Listing</h3> : <div/>}
				</div>
			</div>
		</main>
    ) 
}

export default ListingPage;