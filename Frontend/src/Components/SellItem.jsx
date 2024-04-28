import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { postElectronics } from "../../utils/utils";

export default function SellItem({ setElectronics, electronicList }) {

  const { loggedInUser } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [userTypeError, setUserTypeError] = useState(loggedInUser.user_type !== 'shopkeeper')
  const [showPopup, setShowPopup] = useState(false)

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [electronicsType, setElectronicsType] = useState('');
  const [storageInGB, setStorageInGB] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  
  }

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleElectronicsChange = (e) => {
    setElectronicsType(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, for example, send data to server or perform validation
    if (name && model && electronicsType && storageInGB && description && price && quantity && file) {
      const newElectronic = { name, model, electronics_type: electronicsType, storage_in_gb: storageInGB, description, price, quantity, img_url: file, shopkeeper_username: loggedInUser.username }
      setElectronics((prevElectronics) => {
        return [newElectronic, ...prevElectronics]
      })

      togglePopup()

      postElectronics({ name, model, electronicsType, storageInGB, description, price, quantity, file, username: loggedInUser.username }).then((data) => {
        console.log(data);
      })
    }
    else {
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
        <select className="electronicsType" onChange={handleElectronicsChange}>
          <option value="Phone">Phone</option>
          <option value="Laptop">Laptop</option>
          <option value="Other">Other</option>
        </select>


        {/* <input type="text" id="electronicsType" value={electronicsType} onChange={(e) => setElectronicsType(e.target.value)} required /> */}
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

        <input type="file" onChange={handleChange} />

        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <br />

        <button disabled={userTypeError} type="submit">Submit</button>
      </form>

      {errorMessage && <p className="input-invalid">{errorMessage}</p>}

      {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Customize the message based on the success or failure */}
                        <p>Item Listed Successfully!</p>
                        {/* Add additional content or actions if needed */}
                        <button onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}
    </div>
  );
}