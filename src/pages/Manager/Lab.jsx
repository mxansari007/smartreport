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
import { set } from "react-hook-form";
import { Button } from "../../@/components/ui/button";
import ManagerNav from "../../components/ManagerNav";


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



  return (
    <>  
        <ManagerNav/> 
        <div className='bg-[#0A5BA5] h-screen w-full flex justify-center items-center'>
            <div className="w-[600px]">
            <Card className="p-2">
                <CardHeader>
                    <CardTitle>Manage Labs</CardTitle>
                    <CardDescription>Add a new Lab</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="px-4">
                
                <Label>Lab Name</Label>
                <Input type="text" placeholder="Enter Lab Name" />
                
                <Label>Operating Hours</Label>
                <Input type="text" placeholder="Enter Operating Hours" />


                <Label>City</Label>
                <div className="flex">
                <Input onChange={(e)=>{setCity(e.target.value)}} type="text" placeholder="Enter City" />
                <Button className="ml-2 bg-blue-600 hover:bg-blue-500" onClick={()=>{handleLocation()}}>locate</Button>
                <Button className="ml-2 bg-blue-600 hover:bg-blue-500 mb-2" onClick={()=>{setLive(prev=>!prev)}}>Live Location</Button>
                </div>
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
                <Input type="text" placeholder="Enter Address" />
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-500">Add Lab</Button>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
    
    </>

  )
}


export default Lab