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
    <form className="flex flex-col justify-center items-center w-full" onSubmit={handleSubmit(handleSubmits)}>
      { error && (<div className='baseAlerts'> { error } </div>) }
      { success && (<div className={clsxm([
          'baseAlerts',
          'text-[rgb(34,_114,_2)] bg-[rgba(3,_209,_54,_0.3)]'
      ])}> { success } </div>) }
      <div className="mx-[0rem] my-4 px-4 py-[0rem] w-full flex justify-between">
        <input type="text" placeholder="Enter new task" autoFocus {...register('description', {required: true})} className={clsxm([
          'baseTodos',
          'w-[70%] border-b-[1px_solid_rgba(153,_153,_153,_0.3)] placeholder:text-[#028575]'
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
            'appearance-none outline-[none] border-[none] text-[rgba(2,_133,_117,_0.6)] w-full cursor-pointer px-2 py-[0.4rem] text-[1rem] bg-[rgba(153,_153,_153,_0.3)] rounded-[5px] leading-[1.2]',
            'after:absolute after:top-[0] after:right-[0] after:px-2 after:py-[0.4rem] after:bg-[#028575] after:ml-[0rem] after:mr-4 after:my-[0rem] after:pointer-events-none after:[transition:all_0.3s_ease] after:rounded-tl-[0] after:rounded-br-[5px] after:rounded-tr-[5px] after:rounded-bl-[0] after:leading-[1.2] after:max-h-[32px]',
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