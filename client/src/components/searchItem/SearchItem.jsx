import "./searchItem.scss";

function SearchItem(props) {
  const item = props.data;
  return (
    <div className="search-item">
      <div className="search-item-img">
        <img src={item.image.url} alt =""/>
      </div>
      <div className="search-item-info">
        <h1>{item.title}</h1>
        <h3>{item.author.username}</h3>
      </div>
    </div>
  );
}

export default SearchItem;
