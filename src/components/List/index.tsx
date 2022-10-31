import { Fragment, useState } from "react";

type ListProps = {
    initialItems: string[]
}

export function List({initialItems}: ListProps){
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(initialItems)

  function addToList() {
    setTimeout(() => {
      setList(state => [...state, newItem]);
    }, 500)
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== item));
    }, 500)
  }

  return (
    <>
      <input placeholder='Novo item' type="text" onChange={e => setNewItem(e.target.value)} />
      <button onClick={addToList}>Adicionar</button>

      <ul>
        {list.map((item, index) => {       
          return (
            <Fragment key={index}>
              <li>{item}</li>
              <button onClick={()=>removeFromList(item)}>Remover</button>
            </Fragment>
          )
        })}
      </ul>
    </>
  )
}