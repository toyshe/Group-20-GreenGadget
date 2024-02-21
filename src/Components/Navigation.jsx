import SearchItem from "./SearchItem";
export default function Navigation() {
  return (
    <nav className="nav">
      <div>GreenGadget</div>
      <div className="basket-and-user-container">
        <div className="user-button">user</div>
        <div className="basket-button">basket</div>
      </div>
        <SearchItem />
    </nav>
  );
}
