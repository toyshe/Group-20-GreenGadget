import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../utils/utils"

export default function CategoriesSelect({setElectronicsCategory}) {
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
        <div className="dropdown dropdown-list">
            <h2>Categories: </h2>
            <div class="dropdown-content">
            <select className="electronicsType" onChange={handleCategorySelect}>
                {categoriesList.map((category) => {
                    return (
                        <>
                            <option value={category.slug}>{category.slug}</option>
                            {/* <option value='Other'>Other</option> */}
                        </>
                    )
                })}
            </select>
            </div>
        </div>
    )
}