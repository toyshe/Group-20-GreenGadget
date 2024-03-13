import { useState } from "react"

export default function SearchItem(){
    const [searchInput, setSearchInput] = useState('')

    const handleChange = (event) => {
        setSearchInput(event.target.value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(searchInput);
        setSearchInput('')
    }

    return (
        <form onSubmit={handleSubmit} className="search-box" >
            <label htmlFor="search">Search:</label>
            <input id="search" type="text" placeholder="Search Here" value={searchInput} onChange={handleChange} />
        </form>
    )
}