import './App.css';
import { Fragment,useEffect, useState } from 'react';
import TodoItem from './components/todoItem';

function App() {
  const [ todoItems, setTodoItems]  = useState(null);


 useEffect(() => {
   console.log("hey.I've loaded up");

   if(!todoItems){
     fetch('http://localhost:8080/api/todoItems')
     .then((response) => response.json())
     .then(data => {
     console.log("Todo items lists:", data);
     setTodoItems(data);
   });
  }
 } , [todoItems] );

   function addNewTodoItem(){
      fetch("http://localhost:8080/api/todoItems",{
        headers :{
          "content-type":"application/json"
        },
        method:"POST",
        }).then(response => response.json())
        .then((aTodoItem) => {
          console.log(aTodoItem);
         
          setTodoItems([...todoItems, aTodoItem]);
         });
 }


  return (
    <>
    <div>
      <button onClick={addNewTodoItem}>add new item</button>
    </div>
    
    <div>
      {todoItems
       ? todoItems.map((todoItem) => {
        return <TodoItem key={todoItem.id} data= {todoItem}/>
      }) 
        : "loading data..."}
    </div>
    </>
     );    
}

export default App;
