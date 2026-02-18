import { useState } from "react";
import edit from './assets/edit.png'
function NoteInput(){
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const addTodo = () => {
        if(todo.trim() === '') return;
        setTodos([...todos, {id: Date.now(), text: todo, completed: false}]);
        setTodo('');
    }
    return(
        <>
        <div className="flex items-center justify-center mt-10">
        <input type="text"
        className="bg-white outline-none rounded-md p-2 w-60 h-10 overflow-hidden resize-none "
        placeholder="Write your note..." value={todo} onChange = {(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo} className="cursor-pointer hover:bg-blue-700 bg-blue-500 text-white rounded-sm w-20 h-10 p-2">Save</button>
        </div>
        <ul>
            {todos.map((t) => (
                <li key={t.id} className="text-lg text-center gap-3 mt-4 bg-gray-100 text-gray-800 p-2 ml-15 rounded-lg w-70 h-10">{t.text}</li>
            ))}
        </ul>
        </>
    );

}

export default NoteInput;