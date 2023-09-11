import React,{useState} from 'react'
import "./todo.css"
import {FaArrowRight,FaEdit,FaTrash} from "react-icons/fa"

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert('Please fill in data');
    } else if (isEditItem !== null) {
      // If isEditItem is not null, update the existing item
      setItems((prevItems) => {
        const updatedItems = prevItems.map((elem) =>
          elem.id === isEditItem ? { ...elem, name: inputData } : elem
        );
        return updatedItems;
      });
      setInputData('');
      setIsEditItem(null);
    } else {
      // If isEditItem is null, add a new item
      setItems((prevItems) => [
        ...prevItems,
        { id: new Date().getTime(), name: inputData },
      ]);
      setInputData('');
    }
  };

  // Delete an item
  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((elem) => elem.id !== id));
  };

  // Edit an item
  const editItem = (id) => {
    const selectedItem = items.find((elem) => elem.id === id);
    setInputData(selectedItem.name);
    setIsEditItem(id);
  };

  // Remove all items
  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="heading">
            <h1 className='headStyle'>React Todo List</h1>
          </div>

          <div className="addItems">
            <input
              type="text"
              placeholder=" Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {isEditItem !== null ? (
              <FaArrowRight className='FaArrowRight' title='Update Item' onClick={addItem}/>
            ) : (
              <FaArrowRight className='FaArrowRight' size={"2.8rem"} title='Add Item' onClick={addItem}/>
            )}
          </div>

          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className='todo-btn' >
                    <FaEdit className='FaEdit' size={"3rem"} title="Edit Item" onClick={() => editItem(elem.id)}/>
                    <FaTrash className='FaTrash' size={"2.6rem"} title="Delete Item" onClick={() => deleteItem(elem.id)}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
