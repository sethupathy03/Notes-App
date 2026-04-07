import React from "react";
import remove from "./assets/remove.png";

function TodoItems({text, id, isCompleted, delTodo}) {
  return (
    <div className="flex items-center my-3 gap-2">
        <div className="flex flex-1 items-center cursor-pointer">
            <p className="ml-4 text-slate-700 text-[17px]">{text}</p>
            
        </div>
        <img onClick={() => delTodo(id)} src={remove} className="w-4 cursor-pointer" />
    </div>
  );
}

export default TodoItems;