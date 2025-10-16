import { Circle, CircleCheck, Pencil, Trash } from 'lucide-react';

import clsxm from '@/lib/clsxm'
export default function TodoList(props){

  return (
    <div className="flex justify-center items-center w-full">
      {
        props.todos.length > 0 ? (
          <ul className="w-full [list-style:none]">
            {
              props.filteredTodos.map(todo => (
                <li key={todo.id} className="flex justify-between items-center p-2 bg-[#fff] text-[#333] text-[0.9rem] [transition:all_0.5s_ease] border-b-[1px_solid_rgba(153,_153,_153,_0.5)]">
                  { !todo.completed ? 
                    <Circle className="size-6 text-[#999999b3]" onClick={() => props.completeTodo(todo)} /> : 
                    <CircleCheck className="size-6 text-[#03d136]" onClick={() => props.completeTodo(todo)}  />
                  }
                  <span className={clsxm([
                    'px-2 py-[0rem]',
                    todo.completed ? 'line-through opacity-40' : ''
                  ])}>
                    {todo.description}
                  </span>
                  <Pencil className="size-6 text-[#028575]" onClick={() => props.editTodo(todo)} />
                  <Trash className="size-6 text-[#e64615]" onClick={() => props.deleteTodo(todo.id)} />
                </li>
              ))
            }
          </ul>
        ) : (
          <div className="text-[0.7rem] text-center p-[0.3rem] ml-[0.9rem] mr-[0.9rem] my-20 w-4/5 rounded-[5px] text-[#333]">
            To create a to-Do list, please enter your first task in the field above and click "ADD" button. 
          </div>
        )
      }
    </div>
  )
}