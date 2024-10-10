import { DeleteOutlined, EditOutlined, HeartOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useReducer, useState } from 'react'
import HeartIcon from "../assets/images/heart.svg"
import Saved from "../assets/images/saved.svg"
import Item from 'antd/es/list/Item'


const TYPES = {
    create:"CREATE",
    liked:"LIKED",
    delete:"DELETE",
    saved: "SAVE"
}
function reducer(state, action){
    if(action.type == TYPES.create){
        return {
            todos:[...state.todos, action.payload],
            likedList:state.likedList
        }
    }
    else if(action.type == TYPES.liked){

        return {
            todos:state.todos,
            // likedList:[...state.likedList, action.payload]
            todos:state.todos.map(item => item.id === action.payload.id ? {...item, isLiked: !item.isLiked} : item)
        }
        
    }
    else if(action.type == TYPES.saved){

        return {
            todos:state.todos,
            todos:state.todos.map(item => item.id === action.payload.id ? {...item, isSaved: !item.isSaved} : item)

        }
        
    }
    else if(action.type == TYPES.delete){
        const deleteIndex = state.todos.findIndex(item => item.id == action.payload)
        state.todos.splice(deleteIndex, 1)
        return {
            todos:[...state.todos],
            likedList:state.likedList
        }
    }
}

const intialState = {
    todos:[],
    likedList:[]
}
function Todos() {
    const [data, dispatch] = useReducer(reducer, intialState)
    const [inputValue, setInputValue] = useState("")
    function handleSubmit(e){
        e.preventDefault()
        const newValue = {
            id:data.todos.length,
            value:inputValue,
            isLiked:false,
            isSaved:false

        }
        dispatch({type:TYPES.create, payload:newValue});
        setInputValue("")
    }

    
  return (
    <>

        <div className="w-[1200px] mx-auto p-2 py-3 pt-4 bg-white rounded-lg -mt-2 flex items-center justify-between">
            <h2 className='font-bold text-[35px] text-zinc-400 pl-10'>Todo List</h2>
            <ul className='flex pr-5 gap-5'>
                <li className='w-[60px] border-[1px] border-black rounded-full cursor-pointer'>
                    <button className='flex items-center gap-1 pl-1'>
                        <span>{data.todos.filter(item => item.isLiked).length}</span>
                        <img className='mx-auto py-3' src={HeartIcon} alt="heart img" width={30} height={30} />
                    </button>
                </li>
                <li className='w-[60px] border-[1px] border-black rounded-full cursor-pointer'>
                    
                    <button className='flex items-center gap-1 pl-1'>
                        <span>{data.todos.filter(item => item.isSaved).length}</span>
                        <img className='mx-auto py-3' src={Saved} alt="save img" width={30} height={30} />
                    </button>
                </li>
            </ul>
        </div>
        <form onSubmit={handleSubmit} autoComplete='off' className='w-[500px] mx-auto flex items-center justify-between bg-white p-5 rounded-md mt-10'>
            <Input onChange={(e) => setInputValue(e.target.value)} name='todo' className='w-[80%]' placeholder='Add Todo' size='large' allowClear />
            <Button htmlType='submit' type='primary' size='large'>Submit</Button>
        </form>
        <ul className='w-[500px] bg-white mt-5 p-5 mx-auto rounded-md space-y-3'>
            {data.todos.map((item, index) => (
                <li className='p-2 rounded-md flex items-center justify-between bg-slate-300' key={index}>
                    <div className="">{`${index + 1})  ${item.value}`}</div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => dispatch({type:TYPES.liked, payload:item})} className={`${item.isLiked ? "text-red-500" : ""}`}> 
                            
                            <HeartOutlined/> 
                        </button>
                        <button onClick={() => dispatch({type:TYPES.saved, payload:item})} className={`${item.isSaved ? "text-green-500" : ""}`} > <SaveOutlined/> </button>
                        <button onClick={() => dispatch({type:TYPES.delete, payload:item.id})}> <DeleteOutlined/> </button>
                        <button> <EditOutlined/> </button>
                    </div>
                </li>
            ))}
        </ul>
    </>
  )
}

export default Todos
