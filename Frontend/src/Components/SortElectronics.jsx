export default function SortElectronics({ setSortBy, setOrder }) {
    const handleSortChange = (event) => {
      setSortBy(event.target.value);
    };
    const handleOrderChange = (event) => {
      setOrder(event.target.value);
    };
    return (
    <>
      <p>Sort By</p>
      <select onChange={handleSortChange}>
        <optgroup label="choose a filter">
        <option value="created_at">date</option>
        <option value="Price">Price</option>
        <option value="storage">storage</option>
        </optgroup>
      </select>

      <p>Order</p>
      <select onChange={handleOrderChange}>
        <optgroup label="choose how you want devices ordered">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
        </optgroup>
      </select>
    </>

    );
}