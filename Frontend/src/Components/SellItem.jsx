import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { postElectronics } from "../../utils/utils";
import './SellItem.css'

export default function SellItem({ setElectronics }) {
  const { loggedInUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [userTypeError, setUserTypeError] = useState(loggedInUser.user_type !== 'shopkeeper');
  const [showPopup, setShowPopup] = useState(false);

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [electronicsType, setElectronicsType] = useState('');
  const [storageInGB, setStorageInGB] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [file, setFile] = useState();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleElectronicsChange = (e) => {
    setElectronicsType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && model && electronicsType && storageInGB && description && price && quantity && file) {
      const newElectronic = {
        name, model, electronics_type: electronicsType, storage_in_gb: storageInGB,
        description, price, quantity, img_url: file, shopkeeper_username: loggedInUser.username
      };
      setElectronics((prevElectronics) => [newElectronic, ...prevElectronics]);
      togglePopup();
      postElectronics({ name, model, electronicsType, storageInGB, description, price, quantity, file, username: loggedInUser.username }).then((data) => {
        console.log(data);
      });
    } else {
      setErrorMessage('Please fill out all fields, including posting a picture');
    }
  };

  return (
    <div className="sell-item-page-container">
    <div className="sell-item-form-container">
      <h1>Sell an Item</h1>
      {loggedInUser.user_type === 'shopkeeper' ? null : <p className="input-invalid">Sorry, only shopkeepers are allowed to sell an item</p>}
      <form onSubmit={handleSubmit} className="sell-item-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Enter device model" required />
        </div>
        <div className="form-group">
          <label htmlFor="electronicsType">Electronics Type:</label>
          <select id="electronicsType" value={electronicsType} onChange={handleElectronicsChange} required>
            <option value="" disabled>Select a type</option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
            <option value="Smartwatch">Smartwatch</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="storageInGB">Storage (in GB):</label>
          <input type="number" id="storageInGB" value={storageInGB} onChange={(e) => setStorageInGB(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <button disabled={userTypeError} type="submit" className="submit-button">Submit</button>
      </form>
      {errorMessage && <p className="input-invalid">{errorMessage}</p>}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Item Listed Successfully!</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
