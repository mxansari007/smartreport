import React,{useEffect, useMemo, useState} from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../@/components/ui/card"

import { Input } from '../../@/components/ui/input'
import { Button } from '../../@/components/ui/button'
import {Label} from '../../@/components/ui/label'
import axios from 'axios'

import { ScrollArea } from "../../@/components/ui/scroll-area"
import { Separator } from "../../@/components/ui/separator"

import { DataTable } from '../../components/DataTable';






const Test = () => {

    const [parameter,setParameter] = useState('');
    const [tags,setTags] = useState([]);
    const [list,setList] = useState([]);
    const [openParameter,setOpenParameter] = useState(false);
    const [testName,setTestName] = useState('');
    const [testPrice,setTestPrice] = useState('');
    const [data,setData] = useState([{}]);


    function handleDelete(rowData) {
    // Delete the row data
}

    const getTests = async ()=>{
        try{
            const res = await axios({
                url:import.meta.env.VITE_BASE_URL + '/manager/test/get',
                method:'GET',
                withCredentials:true
            })

            res.data.forEach((d)=>d.parameters = d.parameters.map((p)=>p.parameterName).join(', '));

            setData(res.data);
        }catch(error){
            console.log(error);
        }
    }


      const columns = useMemo(()=>[
        {
          accessorKey: "testName",
          header: "Test Name",
          Cell: ({ row }) => console.log(row),
        },
        {
          accessorKey: "parameters",
          header: "Parameters",
        },
        {
          accessorKey: "price",
          header: "Price",
        },
        {
          accessorKey: "Delete",
          header: "Delete",
          cell: ({ row }) => (
            <button onClick={() =>{
                (
                    async ()=>{
                        try{
                            const res = await axios({
                                url:import.meta.env.VITE_BASE_URL + '/manager/test/delete/'+row.original.testName,
                                method:'DELETE',
                                withCredentials:true
                            })
                            console.log(res.data);
                            getTests();

                        }catch(error){
                            console.log(error);
                        }
                    }
                )()
            }}>Delete</button>
          ),    
        },
      ],[])

    useEffect(()=>{
        getParameter();
    }
    ,[parameter])

    useEffect(()=>{
        console.log(list);
    },[list])


    useEffect(()=>{
        getTests();
    },[])






    const getParameter = async ()=>{
        try{
            if(parameter===''){
                const res = await axios({
                    url:import.meta.env.VITE_BASE_URL + '/manager/parameter/get/all',
                    method:'GET',
                    withCredentials:true
                })
                const Tags = res.data.map((p)=>p.parameterName);
                setTags(Tags);
            }else{
            const res = await axios({
                url:import.meta.env.VITE_BASE_URL + '/manager/parameter/get/'+parameter,
                // params:parameter,
                method:'GET',
                withCredentials:true
            })

            const Tags = res.data.map((p)=>p.parameterName);
            setTags(Tags);
        }
        }catch(error){
            console.log(error);
            setTags([]);
        }
    }
  

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios({
                url:import.meta.env.VITE_BASE_URL + '/manager/test/create',
                method:'POST',
                data:{
                    testName:testName,
                    parameters:list,
                    price:testPrice
                },
                withCredentials:true
            })
            console.log(res.data);
            getTests();
        }catch(error){
            console.log(error);
        }
    }
  
  
    return (
    <>
    <div className='container flex flex-col'>
    <h1 className='text-4xl font-semibold text-blue-600 mt-10 mx-auto'>Manage Lab Tests</h1>
    
    <div className='flex flex-col mt-10 w-[400px] mx-auto'>
    <Card>
    <CardHeader>
    <CardTitle>Register</CardTitle>
    <CardDescription>Register a new test</CardDescription>
    </CardHeader>
    <CardContent>
    <form className='flex flex-col'>
    <Label className="mb-2" htmlFor='test-name'>Test Name</Label>
    <Input onChange={
        (e)=>{
            setTestName(e.target.value);
        }
    } id='test-name' type='text' placeholder='Enter Test Name' />
    
    <Label className="mb-2 mt-4" htmlFor='test-parameter'>Parameter</Label>
    <Input onFocus={()=>{setOpenParameter(true)}} 
            onBlur={()=>{setTimeout(() => setOpenParameter(false), 300)}}
            onChange={(e)=>{setParameter(e.target.value)}} 
            id='test-parameter' 
            type='text' 
            placeholder='Enter Test Parameter'
            />
    <div className={`relative ${openParameter?'z-[1000]':'-z-10'}`}>
    <div className='absolute top-2 left-0 z-50'>
    <ScrollArea className={`${openParameter?'scale-y-100':'scale-y-0'} h-72 w-48 rounded-md border bg-white transition-all`}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Parameters</h4>
        {tags.length!==0?tags.map((tag) => (
          <>
            <div key={tag} onClick={
                (e)=>{
                    setList(prevList => [...prevList, tag]);
                }
            
            } className="text-sm cursor-pointer">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        )):<p>No Parameters Found</p>}
      </div>
    </ScrollArea>
    </div>
    </div>
    <div>
        <ul className='w-[600px]'>{
            list.map((l)=><li>{l}</li>)
        }</ul>
    </div>
    <p onClick={()=>{setList([])}} className='text-blue-700 cursor-pointer mt-6 mb-4'>Clear</p>
    <Label className="mb-2" htmlFor='test-price'>Test Price</Label>
    <Input onChange={
        (e)=>{
            setTestPrice(e.target.value);
        }
    
    } id='test-price' type='number' placeholder='Enter Test Price' />
    <Button onClick={handleSubmit} className='bg-blue-600 text-white mt-4'>Register Test</Button>
    </form>
    </CardContent>
    </Card>
    </div>

    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>


    </div>
    </>
  )
}

export default Test