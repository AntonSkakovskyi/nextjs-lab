"use client"
import { useEffect, useState } from "react";

const testArray = [
  {
    id: 'a-123',
    label: 'A',
  },
  {
    id: 'b-123',
    label: 'B',
  },
  {
    id: 'c-123',
    label: 'C',
  }
];

interface IInput {
  id: string,
  label: string,
}

const KeysPage = () => {
  const [array, setArray] = useState(testArray)
  const [isKeyId, setIsKeyId] = useState(false)

  const onSwitchKeyMode = () => {
    setIsKeyId(mode => !mode)
  }

  const onDelete = (label: string) =>{
    setArray(a => {
      const newArray = a.filter(item => item.label !== label)
      return newArray
    })
  }

  const onReset = () => {
    setArray(testArray)
  }

  return <div>
    <>Key mode is `{isKeyId ? "id" : "index"}`</>

    <ol>
      {array.map((item, index) => {
        return <li key={isKeyId ? item.id : index}>
          <ListItem item={item}/>
          <button onClick={() => onDelete(item.label)}>Delete</button>
        </li>
      })}
    </ol>

    <button onClick={onReset}>Reset</button>
    <button onClick={onSwitchKeyMode}>Switch key mode</button>
  </div>
}

interface ListItemProps {
  item: IInput
}
const ListItem = ({item}: ListItemProps) => {
  useEffect(()=>{
    console.log("mount: ", item.id)

    return () => {
      console.log("unmount: ", item.id)
    }
  }, [])

  return <>
    <label htmlFor={item.label}>{item.label}</label>
    <input type="text" id={item.label} defaultValue=""/>
  </>
}

export default KeysPage;
