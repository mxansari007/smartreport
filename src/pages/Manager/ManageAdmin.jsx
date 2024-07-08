import React from 'react'
import ManagerNav from '../../components/ManagerNav.jsx'

import {Card,CardHeader,CardTitle,CardContent,CardFooter,CardDescription} from '../../@/components/ui/card'
import {Label} from '../../@/components/ui/label'
import {Input} from '../../@/components/ui/input'
import {Button} from '../../@/components/ui/button'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const ManageAdmin = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues:{
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            assignLab:''
        }
      });


  return (
    <>
        <ManagerNav/>
        <div className='flex bg-[#0A5BA5] min-h-screen w-full'>
            <div className='container justify-center mt-16 w-full flex'>
            <div className='w-[600px]'>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Admins</CardTitle>
                    <CardDescription>Add a new Admin</CardDescription>
                </CardHeader>
                <CardContent>
                <Label>first Name</Label>
                <Input type="text" placeholder="First Name" />
                <Label>Last Name</Label>
                <Input type="text" placeholder="Last Name" />
                <Label>Email</Label>
                <Input type="email" placeholder="Email" />
                <Label>Contact Number</Label>
                <Input type="number" placeholder="Contact Number" />
                <Label>Assign Lab</Label>
                <Input type="text" placeholder="Assign Lab" />
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-500">Add Lab Admin</Button>
                </CardFooter>
            </Card>
            </div>
            </div>
        </div>


    </>
    
  )
}

export default ManageAdmin