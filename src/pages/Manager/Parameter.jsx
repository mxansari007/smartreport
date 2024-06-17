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




const Parameter = () => {

    const [openParameter,setOpenParameter] = useState(false);
    const [tags,setTags] = useState([]);
    const [list,setList] = useState([]);

    const handleSubmit = async (e)=>{   
    }


  return (
    <>
    <div className='container flex flex-col'>
    <h1 className='text-4xl font-semibold text-blue-600 mt-10 mx-auto'>Manage Lab Parameters</h1>
    
    <div className='flex flex-col mt-10 w-[400px] mx-auto'>
    <Card>
    <CardHeader>
    <CardTitle>Register</CardTitle>
    <CardDescription>Register a new test</CardDescription>
    </CardHeader>
    <CardContent>
    <form className='flex flex-col'>
    <Label className="mb-2" htmlFor='test-name'>Parameter Name</Label>
    <Input onChange={
        (e)=>{
            setTestName(e.target.value);
        }
    } id='test-name' type='text' placeholder='Enter Test Name' />
    
    <Label className="mb-2 mt-4" htmlFor='test-parameter'>Parameter Unit</Label>
    <Input onChange={(e)=>{setParameter(e.target.value)}} 
            id='test-parameter' 
            type='text' 
            placeholder='Enter Test Parameter'
            />

    <Label className="mb-2" htmlFor='test-price'>Upper Bound</Label>
    <Input onChange={
        (e)=>{
            setTestPrice(e.target.value);
        }
    
    } id='test-price' type='text' placeholder='Enter Test Price' />
    <Label className="mb-2" htmlFor='test-price'>Lower Bound</Label>
    <Input onChange={
        (e)=>{
            setTestPrice(e.target.value);
        }
    
    } id='test-price' type='text' placeholder='Enter Test Price' />
    <Label className="mb-2" htmlFor='test-price'>Method</Label>
    <Input onChange={
        (e)=>{
            setTestPrice(e.target.value);
        }
    
    } id='test-price' type='text' placeholder='Enter Test Price' />
    <Button onClick={handleSubmit} className='bg-blue-600 text-white mt-4'>Register Test</Button>
    </form>
    </CardContent>
    </Card>
    </div>
    </div>
    </>
  )
}

export default Parameter