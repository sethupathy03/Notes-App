import React from 'react'
import { useRef , useState} from 'react';
import notepad from './assets/notepad.png'
import TodoItems from './TodoItems';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect } from "react";

function  Todo() {
    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef();
    const add = async () => {
  const inputText = inputRef.current.value.trim();
  if (inputText === "") return;

  const user = auth.currentUser;
  if (!user) {
    console.log("User not logged in");
    return;
  }

  await addDoc(
    collection(db, "users", user.uid, "notes"),
    {
      text: inputText,
      createdAt: serverTimestamp(),
    }
  );

  inputRef.current.value = "";
};
    // const delTodo = (id) => {
    //     setTodoList((prev) => {
    //         return prev.filter((item) => item.id !== id)
    //     });
    // }
    const delTodo = async (id) => {
  const user = auth.currentUser;
  if (!user) return;

  await deleteDoc(doc(db, "users", user.uid, "notes", id));
};
  useEffect(() => {
  const user = auth.currentUser;
  if (!user) return;

  const unsubscribe = onSnapshot(
    collection(db, "users", user.uid, "notes"),
    (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodoList(notesArray);
    }
  );

  return () => unsubscribe();
}, []);

  return (
    <>
    <div className='bg-stone-300 shadow-md mt-5 place-self-center w-11/12 max-w-md flex flex-col rounded-xl p-7 min-h-[550px]'>
      
      <div className="flex items-center mt-7 gap-3">
        <img src={notepad} className="w-8" />
        <h1 className='text-3xl font-semibold'>Notes App</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <textarea ref={inputRef} rows="4" cols="10" placeholder="Write your note" className='resize-none overflow-hidden bg-transparent border-0 outline-none pl-6 pr-2 flex-1 h-14 placeholder:text-slate-600'/>
        <button onClick={add} className='bg-orange-600 border-none cursor-pointer text-white text-lg font-medium h-14 w-32 rounded-full'>Save</button>

      </div>

      <div>
            {/* {todoList.map((item, index) => {
                return <TodoItems key={index} text={item.text} id={item.id} isCompleted={item.completed} delTodo={delTodo} />
            })}
             */}
            {todoList.map((item) => {
              return (
                <TodoItems
                  key={item.id}
                  text={item.text}
                  id={item.id}
                  delTodo={delTodo}
                />
            );
            })}
      </div>
    </div>
    </>
  )
}
export default Todo