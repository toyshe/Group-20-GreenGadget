import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function SellItem(){

    const [selectedImage, setSelectedImage] = useState(null)
    const {loggedInUser} = useContext(UserContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [userTypeError, setUserTypeError] = useState(loggedInUser.user_type !== 'shopkeeper')

    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [electronicsType, setElectronicsType] = useState('');
    const [storageInGB, setStorageInGB] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, for example, send data to server or perform validation
        if(name && model && electronicsType && storageInGB && description && price && quantity && selectedImage){

        }
        else{
            setErrorMessage('Please fill out all fields, including posting a picture')
        }
    };

    return (
        <div>
          <h1>Sell an Item</h1>
          {loggedInUser.user_type === 'shopkeeper' ? null : <p className="input-invalid">Sorry, only shopkeepers are allowed to sell an item</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <br />

            <label htmlFor="model">Model:</label>
            <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required />
            <br />

            <label htmlFor="electronicsType">Electronics Type:</label>
            <input type="text" id="electronicsType" value={electronicsType} onChange={(e) => setElectronicsType(e.target.value)} required />
            <br />

            <label htmlFor="storageInGB">Storage (in GB):</label>
            <input type="number" id="storageInGB" value={storageInGB} onChange={(e) => setStorageInGB(e.target.value)} required />
            <br />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <br />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <br />

            {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}
    
          <br />
          <br />
          
          <input
            type="file"
            name="myImage"
            disabled={userTypeError}
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            <br />

            <button type="submit">Submit</button>
        </form>
    
        {errorMessage && <p className="input-invalid">{errorMessage}</p>}
        </div>
      );
}