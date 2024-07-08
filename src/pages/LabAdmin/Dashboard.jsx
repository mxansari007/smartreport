import React from 'react'
import AdminNav from '../../components/AdminNav';
import {useMemo} from 'react'
import {DataTable}  from '../../components/DataTable';
import { Button } from '../../@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../@/components/ui/tabs"




const Dashboard = () => {

    const colDef = useMemo(()=>[
        {
            accessorKey:'name',
            header:'Patient Name'
        },
        {
            accessorKey:'age',
            header:'Age'
        },
        {
            accessorKey:'testName',
            header:'Test Name'
        },
        {
            accessorKey:'status',
            header:'Status'
        },
        {
            accessorKey:'date',
            header:'Date'
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({row}) => {
                return (
                    <div className='flex gap-4'>
                        <Button className='bg-yellow-400 hover:bg-yellow-300 text-black px-2 py-1 rounded-md'>Create Test</Button>
                    </div>
                )
            }
        }
    ])


    const rowData = useMemo(()=>[
        {
            name:'Rajesh',
            age: 23,
            testName: 'Blood Test',
            status: 'Pending',
            date: '12-12-2021'
        },
        {
            name:'Rajesh',
            age: 23,
            testName: 'Blood Test',
            status: 'Pending',
            date: '12-12-2021'
        },
        {
            name:'Rajesh',
            age: 23,
            testName: 'Blood Test',
            status: 'Pending',
            date: '12-12-2021'
        },
        {
            name:'Rajesh',
            age: 23,
            testName: 'Blood Test',
            status: 'Pending',
            date: '12-12-2021'
        },
        {
            name:'Rajesh',
            age: 23,
            testName: 'Blood Test',
            status: 'Pending',
            date: '12-12-2021'
        }
    ])



  return (
    <>
    <AdminNav/>

    <div className='min-h-screen bg-[#0A5BA5]'>
    <h1 className='text-yellow-500 pt-10 text-2xl px-10'>Patients Requests</h1>
    <Tabs defaultValue="account" className="pt-2 px-10">
        <TabsList>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Released">Released</TabsTrigger>
        </TabsList>
        <TabsContent value="Pending">
        <div className=''>
                <DataTable 
                color='text-white'
                headerTextColor='text-yellow-400'
                columns={colDef}
                data={rowData}
                />
            </div>
        </TabsContent>
        <TabsContent value="Released">No Record Found</TabsContent>
    </Tabs>
    
    </div>

    </>
  )
}

export default Dashboard