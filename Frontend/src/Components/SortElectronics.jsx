export default function SortElectronics({ setSortBy, setOrder, setPage }) {
  const handleSortChange = (event) => {
    setPage(1)
    setSortBy(event.target.value);
  };
  const handleOrderChange = (event) => {
    setPage(1)
    setOrder(event.target.value);
  };
  return (
    <>
      <div className="filters-container">
        <div className="filter-group">
          <p>Sort By: </p>
          <div className="dropdown-content">
            <select onChange={handleSortChange} defaultValue=''>
              <option value='' disabled>Select a filter</option>
              <option value="price">Price</option>
              <option value="storage_in_gb">storage</option>
            </select>
          </div>
        </div>

        <div className="filter-group">
          <p>Order: </p>
          <div className="dropdown-content">
            <select onChange={handleOrderChange} defaultValue=''>
              <option value='' disabled>Select order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </>

  );
}