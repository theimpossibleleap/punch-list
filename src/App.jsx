import { useState, useRef } from 'react'
import './App.css'
import Markdown from 'react-markdown'

function App() {

  const [list, setList] = useState([])
  const [completed, setComplete] = useState([])
  const [inputItem, setInputItem] = useState('')
  const inputRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputItem) return
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
        <div className="title">Punch List</div>
        <div className='subHeader'>
          <Markdown>
            This is a **Punch List**. Only check things off that are sufficiently ***PUNCHED OFF THE LIST***. Checking items is a destructive action, there is no going back. It's like.. literally punching someone. **You can not unpunch someone**.. But don't punch people. Just punch the list.. you can also use Markdown for your punch list input. **Go nuts**!
          </Markdown>
        </div>
        <form className='inputForm'>
          <input 
            className='input'
            placeholder='Add an item...'
            name="item"
            id="item"
            onChange={(e) => setInputItem(e.target.value)}
            ref={inputRef}
            autoCapitalize='off'
            autoCorrect='off'
            spellCheck='false'
          >
          </input>

          <button className='button' onClick={handleAdd}>
            Add Item
          </button>
          <button className='button' onClick={handleClear}>
            Clear List
          </button>
          <hr className='hr'/>
        </form>
        <ul className='list'>
          {list.map((item, index) => (
            <div key={Math.random()}>
              <div className='listContainer'>
                  <input type="checkbox" onClick={() => handleDelete(index)}/>
                  <li className='listItem'>
                    
                    <Markdown>
                      {item}
                    </Markdown>

                  </li>
              </div>
            </div>
          ))}
        </ul>
        <ul className='completed'>
          {completed.map((item, index) => (
            <div key={Math.random()}>
              <div className='listContainer'>
              <input type="checkbox" checked/>
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
