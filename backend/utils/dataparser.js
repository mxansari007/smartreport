



export const dataparser =async (mydata)=>{

 return await new Promise((res,rej)=>{

        try{

            let jsonString = '';
            let data = mydata[0];
            for(let i in data.toJSON()) {
                jsonString+=data.toJSON()[''+i];
            }

            let jsonObject = JSON.parse(jsonString);
            res(jsonObject);    

        }catch(err){

            rej(err);

        }
    })


    return myres;
}