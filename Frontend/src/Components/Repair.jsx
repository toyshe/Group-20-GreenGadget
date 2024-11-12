import { useState } from "react";
import { MdOutlineMonochromePhotos } from "react-icons/md";
import './Repair.css'
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { Helmet } from "react-helmet";


export default function Repair() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        electronicType: "",
        issueDescription: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, such as sending data to the backend
        console.log("Form submitted:", formData);
        // Reset the form after submission
        setFormData({
            name: "",
            email: "",
            phone: "",
            electronicType: "",
            issueDescription: ""
        });
    };

    const [file, setFile] = useState();
    function handleFileChange(e) {
        console.log(e.target.files);
        // setFile(URL.createObjectURL(e.target.files[0]));
        if (e.target.files.length === 0){
            let val3 = document.querySelector("#rep-imgselname");
            val3.value = "No file chosen";
        }
        else{
            setFile(URL.createObjectURL(e.target.files[0]));
            let val2 = document.querySelector("#r-image").files[0].name
            let val3 = document.querySelector("#rep-imgselname")
            val3.value = val2;
        }
    }

    return (
        <div className="repair-page-container">
        <Helmet>
            <title>Greengadget | Repair</title>
            <meta name="description" content="lorem ipsum"/> 
        </Helmet>
        <div className="form-container">

            <h1>Repair Item Form:</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} placeholder="Enter name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone No." required />

                    <FaPhoneSquareAlt/>
                    <FaPhoneAlt/>
                    <MdLocalPhone/>

                </div>
                <div className="form-group">
                    <label htmlFor="electronicType">Electronic Type:</label>
                    <select id="electronicType" name="electronicType" value={formData.electronicType} onChange={handleChange} required>
                        <option value="">Select an option</option>
                        <option value="Mobile Phone">Mobile Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Tablet">Tablet</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="issueDescription">Issue Description:</label>
                    <textarea id="issueDescription" name="issueDescription" value={formData.issueDescription} onChange={handleChange} placeholder="Messagebox" required />
                </div>
                
                <div className="form-group">

                    <label >Upload image:</label>
                    <div className="img-upload">
                            
                        <label htmlFor="r-image" id="imgsel-btn">
                        <span>
                        <MdOutlineMonochromePhotos />
                        UPLOAD IMAGE
                        </span>
                        </label>

                        <input type="text" id="rep-imgselname" defaultValue={"No file chosen"} disabled/>

                    </div>
                </div>
                <div>
                    <input className="hidden-imgsel" id="r-image" type="file" onChange={handleFileChange} accept="Image/*"/>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
}
