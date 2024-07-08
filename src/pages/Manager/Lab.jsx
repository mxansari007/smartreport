import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../@/components/ui/card"

  import { Label } from "../../@/components/ui/label"
  import { Input } from "../../@/components/ui/input"

  import React, { useRef,useState,useMemo,useCallback, useEffect } from "react";
  import { MapContainer, Marker, TileLayer,useMapEvents,Popup } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
import { Button } from "../../@/components/ui/button";
import ManagerNav from "../../components/ManagerNav";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import axios from 'axios';
import {DataTable} from '../../components/DataTable';




  function LocationMarker({pos,live}) {
    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(pos);
    const markerRef = useRef(null)

    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    useEffect(() => {
      setPosition(pos)
    }
    ,[pos])

    useEffect(() => {

      if(live !== null){
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, map.getZoom());
        setPosition(e.latlng);
      });
    }

    }
    ,[live])


    const eventHandlers = useMemo(
      () => ({
        dragend(e) {
          const marker = e.target;
          const newposition = marker.getLatLng();
          setPosition(newposition);
          console.log(newposition)
          // if (marker != null) {
          //   setPosition(marker.getLatLng())
          //   console.log(markerRef.current)
          // }
        },
      }),
      [],
    )




    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
  


    
  
    return position === null ? null : (
      <Marker 
      draggable={draggable}
      eventHandlers={eventHandlers}
      ref={markerRef}
      position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }


const Lab = () => {

    const mapRef = useRef(null);
    const [city, setCity] = useState('')
    const [pos, setPos] = useState([51.505, -0.09]);
    const [live,setLive] = useState(null);
    const {register,handleSubmit,formState:{errors},control} = useForm({
      mode:'onBlur',
      defaultValues:{
        name:'',
        operatingHours:'',
        address:'',
        city:'',
        contact:'',
        email:'',
        lat:'',
        lng:''
      }
    });

    const [rowData,setRowData] = useState([]);


    const getLabs = async () => {

      try{
        const res = await axios({
          url:import.meta.env.VITE_BASE_URL + '/api/v1/labs/',
          method:'GET',
          withCredentials:true,
          params:{
            page:1,
            limit:10
          }
        })
        console.log(res.data);
        setRowData(res.data.data.labs);
      }
      catch(e){
        console.log(e)
      }
    }



  useEffect(()=>{
    getLabs();
  },[])



    //column definations

    const columns = useMemo(()=>[
      {
        accessorKey: "name",
        header: "Lab Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "contact",
        header: "Contact Number",
      },
      {
        accessorKey: "city",
        header: "City",
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
                              url:import.meta.env.VITE_BASE_URL + '/api/v1/labs/delete/'+row.original.name,
                              method:'DELETE',
                              withCredentials:true
                          })
                          console.log(res.data);
                          getLabs();

                      }catch(error){
                          console.log(error);
                      }
                  }
              )()
          }}>Delete</button>
        ),    
      },
    ],[])



    const handleLocation = async () => { 

      try{
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`);
        const data = await response.json();
        const {lat,lon} = data[0];
        mapRef.current.flyTo([lat,lon], 13);
        setPos([lat,lon]);
      }catch(e){
        console.log(e)
      }
    }

    const handleLabSubmit = async (data) =>{
      data.lat = pos[0];
      data.lng = pos[1];
        console.log(data)

        try{
          const result = await axios({
            url:import.meta.env.VITE_BASE_URL + '/api/v1/labs/createLab',
            data:data,
            method:'POST',
            withCredentials:true
          })
          getLabs();

        }
        catch(e){
          console.log(e)
        }

    }



  return (
    <>  
        <ManagerNav/> 
        <div className='bg-[#0A5BA5] min-h-screen w-full flex flex-col gap-4 p-8 justify-center items-center'>
            <div className="w-[600px] pb-10">
            <Card className="p-2 mt-10`">
                <CardHeader>
                    <CardTitle>Manage Labs</CardTitle>
                    <CardDescription>Add a new Lab</CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit(handleLabSubmit)}>
                <div className="px-4">
                
                <Label>Lab Name</Label>
                <Input {...register("name",
                {required:{value:true,message:'*name is required'}
                })} type="text" placeholder="Enter Lab Name" />
                {errors.name && <p className="text-red-700 text-sm pt-2">{errors.name.message}</p>}
                <Label>Operating Hours</Label>
                <Input 
                {...register("operatingHours",{
                  required:{value:true,message:'*operating hours is required'},
                  pattern:{value:/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,message:'*Valid Format start:end from 00:00 to 23:59'}
                })
                }
                type="text" placeholder="Enter Operating Hours" />
                {errors.operatingHours && <p className="text-red-700 text-sm pt-2">{errors.operatingHours.message}</p>}

                <Label>City</Label>
                <div className="flex">
                <Input 
                {...register("city",{
                  required:{value:true,message:'*city is required'},
                  pattern:{value:/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,message:'*Invalid city'}
                })
                }
                onChange={(e)=>{setCity(e.target.value)}} type="text" placeholder="Enter City" />

                <Button type="button" className="ml-2 bg-blue-600 hover:bg-blue-500" onClick={()=>{handleLocation()}}>locate</Button>
                <Button type="button" className="ml-2 bg-blue-600 hover:bg-blue-500 mb-2" onClick={()=>{setLive(prev=>!prev)}}>Live Location</Button>
                </div>
                {errors.city && <p className="text-red-700 text-sm pt-2">{errors.city.message}</p>}
                <Label>Pin a Location</Label>
                <div className="mt-2">
                <MapContainer center={[51.505, -0.09]} zoom={13} ref={mapRef} style={{height: "300px", width: "500px"}}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Additional map layers or components can be added here */}
                    <LocationMarker pos={pos} live={live}/>

                </MapContainer>
                </div>

                <Label>Address</Label>
                <Input 
                {...register("address",{
                  required:{value:true,message:'*address is required'},
                })
                }
                type="text" placeholder="Enter Address" />
                {errors.address && <p className="text-red-700 text-sm pt-2">{errors.address.message}</p>}

                <Label>Contact Number</Label>
                <Input 
                {...register("contact",{
                  required:{value:true,message:'*contact is required'},
                  pattern:{value:/^\d{10}$/,message:'*Invalid contact number'}
                })
                }
                type="text" placeholder="Enter Contact Number" />
                {errors.contact && <p className="text-red-700 text-sm pt-2">{errors.contact.message}</p>}
                <Label>Email</Label>
                <Input 
                {...register("email",{
                  required:{value:true,message:'*email is required'},
                  pattern:{value:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,message:'*Invalid email'}
                })
                }
                type="text" placeholder="Enter Email" />
                {errors.email && <p className="text-red-700 text-sm pt-2">{errors.email.message}</p>}


                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-500">Add Lab</Button>
                </div>
                </form>
                </CardContent>
            </Card>
            </div>
            <h1 className="text-3xl text-white">Labs</h1>
            <div className="bg-white p-2 rounded-md">
            <DataTable
            columns={columns}
            data={rowData}
            />
            </div>



        </div>
    <DevTool control={control} />
    </>

  )
}


export default Lab