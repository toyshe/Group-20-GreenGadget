import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../utils/utils";
import { MdKeyboardArrowUp, MdDone } from "react-icons/md";
import Icon from './Icon';
import { MdOutlineDevicesOther } from "react-icons/md";

export default function CategoriesSelect({ setElectronicsCategory, categoriesList, setCategoriesList, setPage }) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    
    useEffect(() => {
        getCategories().then((data) => {
            setCategoriesList(data)
        })
    }, [])

    const handleCategorySelect = (e) => {
        let cval = document.querySelector("#cval")
        if (e.target.value){
            setElectronicsCategory(e.target.value);
            setPage(1);
            navigate(`/electronics?electronics_type=${e.target.value}`);
            cval.innerHTML = e.target.value;
        }
        else{
            setElectronicsCategory(e.target.value);
            setPage(1);
            navigate(`/electronics`);
            cval.innerHTML = "All electronics";
        }
    }

    const handleAllItems = (e) => {
        window.location.replace('/electronics')
    }

    return (
        <div className="dropdown dropdown-list filters-container">
            {/* <div className="filter-group">
                <p>Categories: </p>
                <div className="dropdown-content">
                    <select className="electronicsType" defaultValue='' onChange={handleCategorySelect}>
                        <option value='' disabled>Select a category</option>
                        {categoriesList.map((category, index) => {
                            return (
                                <Fragment key={index}>
                                    <option value={category.slug}>{category.slug}</option>
                                </Fragment>
                            )
                        })}
                    </select>
                </div>
            </div> */}

            <div className="filter-group">
                <p>Categories: </p>
                <details className="select-box">
                <summary className="select-button"><span id="cval">Select a category</span><MdKeyboardArrowUp/></summary>
                <div className="options">
                    <div className="option">
                        <input type="radio" name="categories" id="catsec-none" 
                        value={""} style={{display: "none"}}
                        onClick={handleCategorySelect}/>
                        <label htmlFor="catsec-none">
                            <MdOutlineDevicesOther className="electronics_button-icon"/>
                            All electronics 
                            <MdDone className="sel-op"/>
                        </label>
                    </div>
                    {categoriesList.map((category, index) => {
                            return (
                                <div className="option" key={index}>
                                    <input type="radio" name="categories" id={`catsec-${category.slug}`}
                                    value={category.slug} style={{display: "none"}}
                                    onClick={handleCategorySelect}/>
                                    <label htmlFor={`catsec-${category.slug}`}>
                                        <Icon props={category.slug} className="electronics_button-icon" />
                                        {category.slug} 
                                        <MdDone className="sel-op"/>
                                    </label>
                                </div>
                            )
                        })}
                </div>
            </details>
            </div>

            <a className="all-items" onClick={handleAllItems}> All Items</a>
        </div>
    )
}