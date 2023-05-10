import { useState } from "react";
import { List } from "./List";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [previousSearch, setPreviousSearch] = useState(
    JSON.parse(localStorage.getItem("previousSearchList"))
      ? JSON.parse(localStorage.getItem("previousSearchList"))
      : []
  );
  const [showSearchedItem, setShowSearchedItem] = useState(true);

  const HandleChange = (event) => {
    event.preventDefault();
    let value = event.target.value;
    const filteredList = List.filter((l) =>
      l.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);

    setInputValue(value);
    setShowSearchedItem(false);
    setList((list) => filteredList);
  };

  const HandlePreviousSearch = (value) => {
    setInputValue(value);
    setPreviousSearch((p) => [value, ...p].slice(0, 5));
    localStorage.setItem(
      "previousSearchList",
      JSON.stringify([value, ...previousSearch].slice(0, 5))
    );
  };

  const ShowPreviousSearch = () => {
    setShowSearchedItem(true);
  };

  const HandleClear = () => {
    setInputValue("");
    setShowSearchedItem(true);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    setPreviousSearch((p) => [inputValue, ...p].slice(0, 5));
    localStorage.setItem(
      "previousSearchList",
      JSON.stringify([inputValue, ...previousSearch].slice(0, 5))
    );
    setList((list) =>
      List.filter((l) => l.toLowerCase().includes(inputValue.toLowerCase()))
    );
  };

  const HighLightText = (text, input) => {
    const startIndex = text.toLowerCase().indexOf(input.toLowerCase());
    const endIndex = startIndex + input.length;
    return (
      <>
        {text.slice(0, startIndex)}
        <span className="highlight">{text.slice(startIndex, endIndex)}</span>
        {text.slice(endIndex)}
      </>
    );
  };

  return (
    <>
      <div className="autocomplete">
        <form className="flexbox" onSubmit={HandleSubmit}>
          <input
            type="text"
            autoFocus
            value={inputValue}
            placeholder="Search here...."
            onChange={HandleChange}
            onClick={ShowPreviousSearch}
          ></input>
          <button type="button" className="button" onClick={HandleClear}>
            Clear
          </button>
        </form>
        <div className="options">
          {!showSearchedItem &&
            list.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => HandlePreviousSearch(item)}
                  className="option"
                >
                  {HighLightText(item, inputValue)}
                </div>
              );
            })}

          {showSearchedItem &&
            previousSearch.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => HandlePreviousSearch(item)}
                  className="option"
                >
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
