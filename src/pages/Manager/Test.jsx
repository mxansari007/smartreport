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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../@/components/ui/dialog"

import ManagerNav from '../../components/ManagerNav'


const Test = () => {

    const [parameter,setParameter] = useState('');
    const [tags,setTags] = useState([]);
    const [list,setList] = useState([]);
    const [openParameter,setOpenParameter] = useState(false);
    const [testName,setTestName] = useState('');
    const [testPrice,setTestPrice] = useState('');
    const [data,setData] = useState([{}]);
    const [parameters,setParameters] = useState({});
    const [paraList,setParaList] = useState([]);


    useEffect(()=>{
        console.log(parameters);
    },[parameters])

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


      const paraColumns = useMemo(()=>[
        {
          accessorKey: "parameterName",
          header: "Parameter Name",
        },
        {
          accessorKey: "parameterUnit",
          header: "Parameter Unit",
        },
        {
          accessorKey: "upperLower",
          header: "Upper/Lower Bound",
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
                                url:import.meta.env.VITE_BASE_URL + '/manager/parameter/delete/'+row.original.parameterName,
                                method:'DELETE',
                                withCredentials:true
                            })
                            console.log(res.data);
                            getAllParameter();

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

    useEffect(()=>{
        getAllParameter();
    },[])


    const getAllParameter = async ()=>{
        try{

            const res = await axios({
                url:import.meta.env.VITE_BASE_URL + '/manager/parameter/get/all',
                method:'GET',
                withCredentials:true
            })

            res.data.forEach((d)=>d.upperLower = d.upperBound + '/' + d.lowerBound);

            setParaList(res.data);
        }catch(error){
            console.log(error);
        }
    }



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

     const changeParameter = (e)=>{

        setParameters(prev=> {return {...prev,[e.target.name]:e.target.value}});
    }

    const handleAddParameter = async (e)=>{

        try{
            const res = await axios({
                url:import.meta.env.VITE_BASE_URL + '/manager/parameter/create',
                method:'POST',
                data:parameters,
                withCredentials:true
            })
            console.log(res.data);
            getAllParameter();
        }
        catch(error){
            console.log(error);
        }
    }

  
  
    return (
    <>
    <ManagerNav/>
    <div className='min-w-full min-h-screen bg-[#0A5BA5] p-4'>
    <div className='container flex flex-col'>
    <h1 className='text-4xl font-semibold text-white mt-10 mx-auto'>Manage Lab Tests</h1>
    
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
    <ScrollArea className={`${openParameter?'scale-y-100':'scale-y-0'} shadow-md h-72 w-48 rounded-md border bg-white transition-all relative`}>
      <div className="p-4 flex-1">
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
      <div className='w-full flex justify-center absolute bottom-2 p-4'>
      <Dialog>
      <DialogTrigger>
      <Button type="button" className="w-full bg-blue-700 hover:bg-blue-500">Add Parameter</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
        <DialogTitle>Add Parameter</DialogTitle>
        <DialogDescription>
        Add a new parameter
        </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col'>
    <Label className="mb-2" htmlFor='test-name'>Parameter Name</Label>
    <Input onChange={
        (e)=>{
            changeParameter(e);
        }
    } id='parameterName' name="parameterName"  type='text' placeholder='Enter Parameter Name' />
    
    <Label className="mb-2 mt-4" htmlFor='test-parameter'>Parameter Unit</Label>
    <Input onChange={(e)=>{changeParameter(e)} }
            id='parameterUnit' 
            name='parameterUnit'
            type='text' 
            placeholder='Enter Parameter Unit'
            />

    <Label className="mb-2 mt-2" htmlFor='test-price'>Upper Bound</Label>
    <Input onChange={
        (e)=>{
            changeParameter(e);
        }
    
    } id='upperBound' name="upperBournd" type='text' placeholder='Enter Upper Bound' />
    <Label className="mb-2 mt-2" htmlFor='test-price'>Lower Bound</Label>
    <Input onChange={
        (e)=>{
            changeParameter(e);
        }
    
    } id='lowerBound' name="lowerBound" type='text' placeholder='Enter Lower Bound' />
    <Label className="mb-2 mt-2" htmlFor='test-price'>Method</Label>
    <Input onChange={
        (e)=>{
            changeParameter(e);
        }
    
    } id='method' name="method" type='text' placeholder='Enter Method' />
    </form>

        <DialogFooter>
        <DialogTrigger>
        <Button onClick={()=>{handleAddParameter();}} className="bg-blue-700 text-white">Add</Button>
        </DialogTrigger>
        <DialogTrigger>
        <Button className="bg-red-700 text-white">Cancel</Button>
        </DialogTrigger>
        </DialogFooter>
        </DialogContent>
      </Dialog>
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
    <h1 className='text-xl text-white mt-8'>Tests</h1>
    <div className="container mx-auto py-10 bg-white mt-2 rounded-md">
      <DataTable columns={columns} data={data} />
    </div>


    <h1 className='text-xl text-white mt-8'>Parameters</h1>
    <div className="container mx-auto py-8 bg-white mt-2 rounded-md">
      <DataTable columns={paraColumns} data={paraList} />
    </div>


    </div>
    </div>
    </>
  )
}

export default Test