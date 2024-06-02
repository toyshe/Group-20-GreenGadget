import { useState } from "react";

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
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="form-container">

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} placeholder="Enter name" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone No." required />
                </div>
                <div>
                    <label htmlFor="electronicType">Electronic Type:</label>
                    <select id="electronicType" name="electronicType" value={formData.electronicType} onChange={handleChange} required>
                        <option value="">Select an option</option>
                        <option value="Mobile Phone">Mobile Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Tablet">Tablet</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="issueDescription">Issue Description:</label>
                    <textarea id="issueDescription" name="issueDescription" value={formData.issueDescription} onChange={handleChange} placeholder="Messagebox" required />
                </div>
                <div>
                    <label htmlFor="file">Upload Picture:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
