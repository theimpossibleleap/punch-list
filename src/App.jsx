import { useState, useRef } from 'react'
import './App.css'

function App() {

  const [list, setList] = useState([])
  const [completed, setComplete] = useState([])
  const [inputItem, setInputItem] = useState('')
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    setList([...list, inputItem])
    setInputItem('')
    inputRef.current.value = '';
  }

  const handleDelete = (index) => {
    const newComplete = list.filter((item, i) => i === index)
    const newList = list.filter((item, i) => i !== index)
    setList(newList)
    setComplete([...completed, ...newComplete])
  }

  const handleClear = (e) => {
    e.preventDefault();
    setList([])
    setComplete([])
    setInputItem('')
    inputRef.current.value = '';
  }

  return (
    <>
      <div id='container'>
        <h1 className="title">Punch List</h1>

        <form>
          <input 
            className='input'
            placeholder='Add an item...'
            name="item"
            id="item"
            onChange={(e) => setInputItem(e.target.value)}
            ref={inputRef}
          >
          </input>

          <button className='button' onClick={handleAdd}>
            Add Item
          </button>
          <button className='button' onClick={handleClear}>
            Clear List
          </button>
        </form>

        <ul>
          {list.map((item, index) => (
            <div key={Math.random()}>
              <div className='listContainer'>
                  <input type="checkbox" onClick={() => handleDelete(index)}/>
                  <li className='listItem'>
                    {item}
                  </li>
              </div>
            </div>
          ))}
        </ul>
        <ul className='completed'>
          {completed.map((item, index) => (
            <div key={Math.random()}>
              <div className='listContainer'>
              <input type="checkbox" disabled/>
                  <li className='listItem'>
                    {item}
                  </li>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
