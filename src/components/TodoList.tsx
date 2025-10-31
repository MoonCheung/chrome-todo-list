import { Circle, CircleCheck, Pencil, Trash } from 'lucide-react';

import clsxm from '@/lib/clsxm'
export default function TodoList(props){

  return (
    <div className="flex justify-center items-center w-full border-solid border-t-2 border-t-[#028575] mt-4">
      {
        props.todos.length > 0 ? (
          <ul className="w-full h-full [list-style:none]">
            {
              props.filteredTodos.map(todo => (
                <li key={todo.id} className="flex justify-between items-center py-2 px-10 text-[#333] text-[0.9rem] [transition:all_0.5s_ease] border-solid border-b-1 border-b-[#999999b3]">
                  { !todo.completed ? 
                    <Circle className="size-6 text-[#999999b3]" onClick={() => props.completeTodo(todo)} /> : 
                    <CircleCheck className="size-6 text-[#028575]" onClick={() => props.completeTodo(todo)}  />
                  }
                  <span className={clsxm([
                    'flex-1 px-2 py-[0rem] text-[#999999b3] dark:text-[#ffffffde]',
                    todo.completed ? 'line-through opacity-40' : ''
                  ])}>
                    {todo.description}
                  </span>
                  <Pencil className="size-4 text-[#028575] mr-2" onClick={() => props.editTodo(todo)} />
                  <Trash className="size-4 text-[#e64615]" onClick={() => props.deleteTodo(todo.id)} />
                </li>
              ))
            }
          </ul>
        ) : (
          <div className="text-[0.7rem] text-center p-[0.3rem] ml-[0.9rem] mr-[0.9rem] my-20 w-4/5 rounded-[5px] text-[#999999b3] dark:text-[#ffffffde]">
            To create a to-Do list, please enter your first task in the field above and click "ADD" button. 
          </div>
        )
      }
    </div>
  )
}