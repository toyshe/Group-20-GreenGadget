import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../utils/utils"

export default function CategoriesSelect({ setElectronicsCategory }) {
    const [categoriesList, setCategoriesList] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [electronicsCategory, setElectronicsCategory] = useState('')

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

    return (
        <div className="dropdown dropdown-list filters-container">
            <div className="filter-group">
                <p>Categories: </p>
                <div className="dropdown-content">
                    <select className="electronicsType" defaultValue='' onChange={handleCategorySelect}>
                        <option value='' disabled>Select a category</option>
                        {categoriesList.map((category) => {
                            return (
                                <>
                                    <option value={category.slug}>{category.slug}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}