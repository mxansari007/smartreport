import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardFooter } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
function Dashboard() {
  return (
    <>
      <div className="bg-[#0077ff] min-h-screen p-8 text-white">
        <h1 className="text-4xl font-bold">Hi, Guest 👋</h1>
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div className="">
            <h2 className="text-2xl font-semibold mb-4 text-[#F59E0B]">
              Previous Reports
            </h2>
            <Card className="bg-white text-gray-800 h-96">
              <CardContent className="p-6">
                <p className="text-center">There are no reports pending</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#F59E0B]">
              Profile
            </h2>
            <Card className="bg-white text-gray-800 ">
              <CardContent className="p-6 flex flex-col">
                <div className="mr-4 flex items-center p-2 ">
                  <img
                    className="w-20 h-20 rounded-full outline outline-double outline-blue-600 outline-2"
                    src="src/assets/profile.jpg"
                    alt=""
                  />
                  <p className="text-blue-600 font-bold ml-4 text-lg">Jenny</p>
                </div>
                <div className="text-left  outline outline-gray-300 rounded-lg p-3.5 w-full bg-slate-100">
                  <label htmlFor="" className="text-yellow-500 font-semibold ">Contact</label>
                  <p className=""> +91 9876543210</p>
                  <label htmlFor="" className="text-yellow-500 font-semibold">Gender</label>
                  <p>Female</p>
                  <label htmlFor="" className="text-yellow-500 font-semibold">Age</label>
                  <p>10</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center p-6">
                <Button className="w-full bg-white outline outline-[#F59E0B] outline-1 text-[#F59E0B] hover:bg-blue-600">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
