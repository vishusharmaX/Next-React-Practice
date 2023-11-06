"use client"
import React, { useState } from 'react'
import axios from 'axios';

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [getImages, setGetImages] = useState([]);

  const submitHandler =(e)=>{
    e.preventDefault();
    setMainTask([...mainTask,{title,desc}]); 
    setTitle("");
    setDesc("");
    console.log(mainTask);

  }

  const deleteHandler =(i)=>{
    const copytask = [...mainTask];
    copytask.splice(i,1);
    setMainTask(copytask);
  }

  let RenderTask = <h2>No task Available</h2>

  if(mainTask.length>0){
    RenderTask = mainTask.map((t,i)=>{
      return(
        <li key ={i} className='flex items-center justify-between mb-5'>
          <div className='flex items-center justify-between mb-5 w-2/3'>
            <h5 className='text-xl font-semibold'>{t.title}</h5>
            <h6 className='text-lg font-medium'>{t.desc}</h6>
            </div>
            <button onClick={(i)=>{
              deleteHandler(i)
            }} className=' bg-red-500 p-3 m-3 font-bold text-2xl text-white'>Delete</button>
        </li>
      )
    })
  }

  const getImage = async()=>{
    try {
      const getimg = await axios.get('https://picsum.photos/v2/list');
      const data = getimg.data;
      setGetImages(data);
      console.log(getImages);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className=' bg-red-500 text-center items-center h-20 flex justify-center'>
      <h1 className='font-bold text-3xl text-white'>Vishu Todo List </h1>
      </div>
      <form onSubmit={submitHandler}>
        <input type="text"  className='text-2xl border-zinc-800 border-2 m-8 px-4 py-2' 
        placeholder='Enter Task'
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value);
          // console.log(e.target.value);
        }}
        />
        <input type="text"  className='text-2xl border-zinc-800 border-2 m-8 px-4 py-2' 
        placeholder='Enter Desc'
        value={desc}
        onChange={(e)=>{
          setDesc(e.target.value);
          // console.log(e.target.value);
        }}
        />
        <button className=' bg-black text-white p-3 text-2xl ml-5 font-bold rounded '
        >Add Task</button>
      </form>
      <div className=' bg-slate-400 p-8 mt-5'>
        <ul>
          {RenderTask}
        </ul>

      </div>
      <div className=' flex  justify-center item-center text-center'>
        <button onClick={getImage} className=' bg-green-500 p-4 m-6 text-2xl font-bold text-white rounded'>Get Images</button>

          <hr />

          

      </div>
      <div className='text-center'>
            <h1 className='text-6xl'>Pic of the Day</h1>
            {
              getImages.map((img,i)=>{
                return (
                  <div key={i} className='inline-block m-4 p-4 text-center  items-center justify-center'>
                  <h1>{img.author}</h1>
                  <img src= {img.download_url} width={300} height={300} />
                  </div>
                )
              })
            }
          </div>
    </>
  )
}

export default page