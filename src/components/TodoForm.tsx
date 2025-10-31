import { useState } from "react";
import { useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm'

export default function TodoForm(props){
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: props.editing? props.currentTodo : {description: ''}
  });

  if(!props.editing) setValue('description', props.currentTodo?.description);

  const handleSubmits = (data, e) => {
    // manage errors
    // if data without whitespaces is empty, setError message 
    if(data.description.trim() === ''){
      setError('Please, enter a new task');
      return e.target.reset();
    }

    if(!props.editing) {
      props.todos(data);
    } else {
      data.id = props.currentTodo.id;
      data.completed = props.currentTodo.completed;
      props.updateTodo(props.currentTodo.id, data);
    }
    
    setError(null);
    e.target.reset();
    setSuccess('New task was added!');
    setTimeout(() => {
      setSuccess(null);
    }, 1500)
  }

  const handlerStatus = (event) => { 
    props.setStatus(event.target.value)
  }

  return (
    <form className="flex flex-col justify-center items-center w-full px-4" onSubmit={handleSubmit(handleSubmits)}>
      { error && (<div className='baseAlerts'> { error } </div>) }
      { success && (<div className={clsxm([
          'baseAlerts',
          'text-[#999999b3] dark:text-[#fff] bg-[#028575]'
      ])}> { success } </div>) }
      <div className="mx-[0rem] my-4 px-4 py-[0rem] w-full flex justify-between">
        <input type="text" placeholder="Enter new task" autoFocus {...register('description', {required: true})} className={clsxm([
          'baseTodos',
          'w-[70%] placeholder:text-[#028575]'
        ])} />
        <button type="submit" className={clsxm([
          'baseTodos',
          'font-bold bg-[#028575] cursor-pointer [transition:all_0.2s_ease] w-1/4 rounded-[5px]',
          'hover:bg-[#666] hover:text-[#fff]'
        ])}>
          {!props.editing ? 'ADD' : 'EDIT'}
        </button>
      </div>
      <div className="relative overflow-hidden w-full pl-4 pr-4 py-[0rem] flex justify-center border-b-[2px_solid_#028575]">
        <select name="todos" className={clsxm([
            'appearance-none text-[#028575] dark:text-[#fff] w-full cursor-pointer px-2 py-[0.4rem] text-[1rem] bg-[#999999b3] rounded-[5px] leading-[1.2]',
            'hover:after:bg-[#666] hover:after:text-[#fff]'
          ])} onChange={handlerStatus}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  )
}