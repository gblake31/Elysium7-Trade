import React, {useState} from 'react';
import imageCompression from 'browser-image-compression';

function ListingPage() {

    let storageStr = localStorage.getItem('item');
    let listing = storageStr.length == 0 ? null : JSON.parse(storageStr);
    let [itemPic, setItemPic] = useState("");

    let imageRef;
    let descriptionRef;
    let conditionRef;

    if (listing != null) setItemPic(listing.image);

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

    return (
        <div>
            <h1>{listing == null ? "Create New Listing" : "Edit Listing"}</h1>
            <img id = 'profile-pic' src = {itemPic}></img>
            <input type = "file" onChange = {uploadImage} ref={(c) => imageRef = c}></input>
            <div id = 'input-fields'> 
                <div className='input-box'>
                    <label id = "Text" >Item Name:</label>
                    <input defaultValue = {listing == null ? "" : listing.itemname} className = "field" type = "text"></input>
                </div>
                <div className='input-box'>
                    <label id = "Text" >Description:</label>
                    <input className = "field" type = "text" ref={(c) => descriptionRef = c} 
                    placeholder = 'Description' defaultValue={listing == null ? "" : listing.description}></input>
                </div>
                <div className='input-box'>
                    <label id = "Text" >Condition:</label>
                    <input className = "field" type = "text" ref={(c) => conditionRef = c} 
                    placeholder = 'Condition' defaultValue={listing == null ? "" : listing.condition}></input>
                    <button>Confirm New Listing</button>  
                </div>
            </div>
        </div>

    ) 
}

export default ListingPage;