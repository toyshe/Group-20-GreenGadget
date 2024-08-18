import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../utils/utils"

export default function CategoriesSelect({ setElectronicsCategory, categoriesList, setCategoriesList }) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then((data) => {
            setCategoriesList(data)
        })
    }, [])

    const handleCategorySelect = (e) => {
        setElectronicsCategory(e.target.value)
        navigate(`/electronics?electronics_type=${e.target.value}`)
    }

    const handleAllItems = (e) => {
        window.location.replace('/electronics')
    }

    return (
        <div className="dropdown dropdown-list filters-container">
            <div className="filter-group">
                <p>Categories: </p>
                <div className="dropdown-content">
                    <select className="electronicsType" defaultValue='' onChange={handleCategorySelect}>
                        <option value='' disabled>Select a category</option>
                        {categoriesList.map((category, index) => {
                            return (
                                <>
                                    <option key={index} value={category.slug}>{category.slug}</option>
                                    {/* {console.log(index)} */}
                                </>
                            )
                        })}
                    </select>
                </div>

            </div>
            <a className="all-items" onClick={handleAllItems}> All Items</a>
        </div>
    )
}