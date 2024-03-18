import React, { useEffect,useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer,Font,Image } from '@react-pdf/renderer';
import LatoRegular from '../assets/Fonts/Lato/Lato-Regular.ttf';
import LatoBold from '../assets/Fonts/Lato/Lato-Bold.ttf';
import LatoLight from '../assets/Fonts/Lato/Lato-Light.ttf';
import LatoThin from '../assets/Fonts/Lato/Lato-Thin.ttf'
import dnaImage from '../assets/dna.png';
import male from '../assets/male.png';
import bloodCount from '../assets/blood-count-test.png';
import redUpRight from '../assets/Line-3.png';
import redUpLeft from '../assets/redUpLeft.png';
import kidney from '../assets/kidney.png';
import Bones from '../assets/bones.png';
import Liver from '../assets/liver.png';
import Lipid from '../assets/lipid.png';
import Malaria from '../assets/malaria.png';
import HIV from '../assets/test-tube.png';
import Thyroid from '../assets/thyroid.png';
import greenUpLeft from '../assets/greenUpLeft.png';
import greenDownLeft from '../assets/greenDownLeft.png';
import greenUpRight from '../assets/greenUpRight.png';
import Urine from '../assets/dark-urine.png';
import Hepatitis from '../assets/hepatitis-c.png';
import Ysignal from '../assets/ysignal.png';
import Gsignal from '../assets/gsignal.png';
import Rsignal from '../assets/rsignal.png';
import humanPoster from '../assets/human-body.png';
import axios from 'axios';
import LoadingPage from './LoadingPage';




Font.register({
  family: 'Lato',
  fonts: [
    { src: LatoRegular, fontWeight: 400 }, // Normal weight
    { src: LatoBold, fontWeight: 700 },    // Bold weight
    { src: LatoLight, fontWeight: 300 },    // Light weight
    { src: LatoThin, fontWeight: 100 }    // Light weight
  ]
});






const styles = StyleSheet.create({
  
  cover:{
    backgroundColor:"#0c4a6e",
    color:"white",
    fontFamily:'Lato',
  },    

  coverupper:{
    position:"absolute",
    top:10,
    right:10,
    fontFamily:'Lato',
    fontWeight:'700',
    fontSize:'20px'
  },
  
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth*0.7, //the pdf viewer will take up all of the width and height
    height: window.innerHeight*0.8,
  },
});

const Pdf = () => {

  const [test,setTest] = useState();
  const [myUser, setMyUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [loading,setLoading] = useState(true);
  const [critical,setCritical] = useState(false);
  const [criticalValues,setCriticalValues] = useState([]);

  useEffect(()=>{

    console.log(myUser);

    ;(async ()=>{
      try{
        const res = await axios({
          url:import.meta.env.VITE_BASE_URL + '/user/getTest',
          method:'GET',
          withCredentials:true
        })

        setTest(res.data);
        setLoading(false)
        setCriticalValues([]);
        res.data.testValues.forEach(d=>{

          if(d.impression!=='N'){
            setCritical(true);
            setCriticalValues(prev=>{return [...prev,d]});

          }
        })

      }catch(error){
        console.log(error);
      }
    })()


  },[])

  useEffect(()=>{
    console.log(criticalValues);
  },[criticalValues])


  
  return(
  <div className='w-full flex justify-center items-center'>
  <div>
  {!loading?<PDFViewer style={styles.viewer}>
    <Document>
      <Page size="A4" style={styles.cover}>
        <View style={[styles.coverupper, { color: 'white' }]}>
        <View style={{borderBottom:'1px solid white',display:'flex',flexDirection:'row',gap:'10px'}}>
        <View>
        <Image style={{width:'40px'}} src={dnaImage} />
        </View>
        <View>
          <Text>Redcliff</Text>
          <Text style={{color:'#e11d48'}}>labs</Text>
          </View>
          </View>
          <Text style={{fontSize:'16px',fontWeight:'400'}}>Healthy India ki Trust Lab</Text>
        </View>

        <View style={{zIndex:-1,position:'fixed',top:'300px',left:'0'}}>
          <Image src={humanPoster} />
        </View>


        <View style={{position:'absolute',top:'150px',left:'30px'}}>
        <View style={{fontSize:'50px',borderBottom:'1px solid white'}}>
          <Text>Smart</Text>
          <Text style={{color:'#e11d48'}}>Health Report</Text>
          </View>
        </View>

        <View style={{position:'absolute',bottom:'60px', left:'20px'}}>
          <Text style={{fontSize:'16px',fontWeight:'100'}}>Prepared For</Text>
          <Text style={{fontSize:'24px',fontWeight:'700',color:'#e11d48'}}>{myUser.customer_name}</Text>
          <Text style={{fontSize:'20px',fontWeight:'400',color:'white'}}>{myUser.gender} {myUser.age}</Text>
        </View>
      </Page>
      <Page style={{fontFamily:'Lato'}}>
      <View style={{position:'absolute',bottom:'0px', left:'50%'}} render={({ pageNumber }) => (
    //detect if user is NOT on an even page:
        <Text>{`[${pageNumber}]`}</Text>
      )} />

      <View style={{position:'absolute',top:'20px',left:'20px'}}>
          <Text style={{color:'#0c4a6e',fontWeight:'700'}}>Health Summary</Text>
      </View>

        <View style={{position:'absolute',top:'200px',left:'35%'}}>
          <View style={{width:'150px'}}>
          <Image  src={male} />
      </View>  
      </View>

      {test.testId===5571?<View style={{position:'absolute',top:'100px',left:'40px',fontSize:'10px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'15px'}}>
          <Image src={bloodCount} />
          </View>
        <Text>{test.testName}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'180px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'8px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:<></>}


      {test.testId===5628&&critical?<View style={{position:'absolute',top:'350px',left:'170px',width:'100px'}}>
        <Image src={redUpRight} />
      </View>:null}

      {test.testId===5628&&!critical?<View style={{position:'absolute',top:'350px',left:'170px',width:'100px'}}>
        <Image src={greenUpRight} />
      </View>:null}



      {test.testId===5628?<View style={{position:'absolute',top:'350px',left:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={kidney} />
          </View>
        <Text>{test.testName}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:<></>}


      {test.testId===5563?<View style={{position:'absolute',top:'500px',left:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={Bones} />
          </View>
        <Text>Calcium</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:<></>}



      {test.testId===5635&&!critical?<View style={{position:'absolute',top:'330px',right:'170px',width:'150px'}}>
        <Image src={greenUpLeft} />
      </View>:<></>}

      {test.testId===5635&&critical?<View style={{position:'absolute',top:'330px',right:'170px',width:'150px'}}>
        <Image src={redUpLeft} />
      </View>:<></>}


{/* 
      <View style={{position:'absolute',top:'330px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={Liver} />
          </View>
        <Text>Liver Profile</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          <Text style={{marginTop:'5px'}}>RBC Count</Text>
          <Text style={{marginTop:'5px'}}>Total Leukocyte</Text>
          <Text style={{marginTop:'5px'}}>Abs. Neutrophil Count</Text>
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            <Text style={{marginTop:'5px'}}>3.3</Text>
            <Text style={{marginTop:'5px'}}>3.1</Text>
            <Text style={{marginTop:'5px'}}>1.55</Text>
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>Please Watch Out</Text>
        </View>
      </View> */}



      {test.testId===5632||test.testId===5621?<View style={{position:'absolute',top:'500px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={Lipid} />
          </View>
        <Text>{test.testName}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
           {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:null}


      {test.testId===108?<View style={{position:'absolute',top:'200px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={Malaria} />
          </View>
        <Text>{test.testName}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:<></>}
 
 
      {test.testId===5622?<View style={{position:'absolute',top:'300px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={HIV} />
          </View>
        <Text>{test.testName}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:null}


      
      {test.testId===5667?<View style={{position:'absolute',top:'185px',right:'160px',width:'150px'}}>
        <Image src={greenDownLeft} />
      </View>:<></>}





      {test.testId===5667?<View style={{position:'absolute',top:'150px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={Thyroid} />
          </View>
        <Text>Thyroid Profile</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:null}



      {test.testId===5684?<View style={{position:'absolute',top:'300px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={Urine} />
          </View>
        <Text>{test.testName}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
          <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:null}



      {test.testId===5635?<View style={{position:'absolute',top:'330px',right:'30px',fontSize:'8px'}}>
      <View style={{display:'flex',flexDirection:'row'}}>
        <View style={{width:'10px'}}>
          <Image src={`${myUser.about!==undefined?myUser.about.icon:null}`} />
          </View>
        <Text>{myUser.test_name}</Text>
        </View>
        <View style={{marginTop:'10px',color:'gray',padding:'5px',border:'2px solid gray',borderRadius:'5px',width:'150px',display:'flex',flexDirection:'column',fontWeight:'400',fontSize:'6px'}}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:'4'}}>
         <Text style={{textAlign:'center'}}>Test Name</Text>
          {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_name}</Text>)}
          </View>
          <View style={{flex:'2',borderLeft:'1px solid red',textAlign:'center'}}>
            <Text>Result</Text>
            {test.testValues.map(d=><Text style={{marginTop:'5px'}}>{d.parameter_value} {d.unit}</Text>)}
          </View>
          </View>
          <Text style={{marginTop:'5px',textAlign:'center'}}>{`${critical?'Please Watch Out':'all looks good'}`}</Text>
        </View>
      </View>:<></>}


      </Page>


  <Page style={{fontFamily:'Lato'}}>

  <View style={{position:'absolute',bottom:'0px', left:'50%'}} render={({ pageNumber }) => (
    //detect if user is NOT on an even page:
        <Text>{`[${pageNumber}]`}</Text>
      )} />

      <View style={{position:'absolute',top:'20px',left:'20px'}}>
          <Text style={{color:'#0c4a6e',fontWeight:'700'}}>Health Advisory</Text>
      </View>

      <View style={{position:'absolute',top:'50px',right:'70px',fontSize:'8px'}}>
        <View style={{display:'flex',flexDirection:'row',gap:'5px',justifyContent:'center',alignItems:'center'}}>
          <View style={{width:'8px'}}>
            <Image src={Gsignal} />
            </View>
          <Text>{`Normal(N)`}</Text>
          <View style={{width:'8px'}}>
            <Image src={Rsignal} />
            </View>
          <Text>{`Low(L)`}</Text>
          <View style={{width:'8px'}}>
            <Image src={Ysignal} />
            </View>
          <Text>{`BorderLine(BL)`}</Text>
          <View style={{width:'8px'}}>
            <Image src={Rsignal} />
            </View>
          <Text>{`High(H)`}</Text>
        </View>

      </View>


      <View style={{position:'absolute',top:'80px',left:'40px'}}>
      <View style={{width:'500px',minHeight:'80px',backgroundColor:'skyblue',borderTopLeftRadius:'5px',borderTopRightRadius:'5px',display:'flex',flexDirection:'row',alignItems:'center',paddingHorizontal:'20px',gap:'4px'}}>
          <View style={{width:'50px'}}>
            <Image src={`${myUser.about!==undefined?myUser.about.icon:null}`} />
          </View>
        
          <View style={{width:'400px'}}>
              <Text style={{fontWeight:'700',fontSize:'16px'}}>{test.testName}</Text>
              <Text style={{fontWeight:'400',fontSize:'12px'}}>{`${myUser.about!==undefined?myUser.about.description:''}`}</Text>
          </View>
      </View>

      {criticalValues.map(d=><View style={{marginTop:'10px',width:'500px',height:'120px',backgroundColor:'#EBEBEB'}}>
        <Text style={{fontSize:'14px',padding:'5px'}}>{d.parameter_name} {d.parameter_value}{d.unit}</Text>

        <View style={{position:'absolute',top:'5px',right:'35px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',gap:'5px',fontSize:'8px'}}>
          <View style={{width:'8px'}}>
            {d.impression==="N"?<Image src={Gsignal} />:
            d.impression==="H"||d.impression==="L"?<Image src={Rsignal} />
            :<Image src={Ysignal} />}
            </View>
            <Text>{d.impression==="N"?'Normal':d.impression==="L"?'Low':d.impression==="H"?'High':"BorderLine"}</Text>
        </View>
          
          <View style={{marginTop:'24px',display:'flex',flexDirection:'row',gap:'5px',marginLeft:'90px'}}>
                <View style={{position:'relative'}}>
                <View style={{position:'absolute',top:'3px',left:'3px',width:'14px',height:'14px',transform:'rotate(45deg)',backgroundColor:'#B80000'}}></View>
                <View style={{position:'absolute',left:'10px' ,width:'100px',height:'20px',backgroundColor:'#B80000',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>
                  <Text style={{position:'absolute',top:'0px',fontSize:'12px'}}>{`< ${d.lower_bound}`}</Text>
                </View>
                </View>

                {d.impression==="L"?<View style={{position:'absolute',top:'25px',left:'50px',width:'30px',height:'12px', backgroundColor:'black'}}>
                <Text style={{position:'absolute', color:'white',fontSize:'10px',left:'8px'}}>{d.parameter_value}</Text>
                </View>:null}

                <View style={{position:'relative',left:'100px'}}>
                <View style={{position:'absolute',left:'10px' ,width:'100px',height:'20px',backgroundColor:'#65B741',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>
                      <Text style={{position:'absolute',top:'0px',fontSize:'12px'}}>{`${d.display_value}`}</Text>
                </View>
                </View>

                {d.impression==="N"?<View style={{position:'absolute',top:'25px',left:'150px',width:'30px',height:'12px', backgroundColor:'black'}}>
                <Text style={{position:'absolute', color:'white',fontSize:'10px',left:'8px'}}>{d.parameter_value}</Text>
                </View>:null}

                <View style={{position:'relative',left:'200px'}}>
                <View style={{position:'absolute',top:'3px',left:'103px',width:'14px',height:'14px',transform:'rotate(45deg)',backgroundColor:'#B80000'}}></View>
                <View style={{position:'absolute',left:'10px' ,width:'100px',height:'20px',backgroundColor:'#B80000',color:'white',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{position:'absolute',top:'0px',fontSize:'12px'}}>{`${d.upper_bound} >`}</Text>
                </View>
                </View>

                {d.impression==="H"?<View style={{position:'absolute',top:'25px',left:'250px',width:'30px',height:'12px', backgroundColor:'black'}}>
                <Text style={{position:'absolute', color:'white',fontSize:'10px',left:'8px'}}>{d.parameter_value}</Text>
                </View>:null}

          </View>
      </View>)}
      <View style={{backgroundColor:'#EBEBEB',padding:'10px',fontSize:'12px'}}>
      <View style={{padding:'5px',border:'1px solid #B9B8B8',borderRadius:'5px'}}>
        <Text style={{fontWeight:'700',marginBottom:'10px'}}>Diet and Lifestyle tips</Text>
        <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:'5px'}}>
        {myUser.about!==undefined?myUser.about.positive.map(d=><View style={{display:'flex',flexDirection:'row',gap:'5px'}}>
          <View style={{width:'35px'}}>
            <Image src={d.pointIcon} />
            </View>
            <View style={{fontSize:'6px',width:'100px'}}>
              <Text>{d.point}</Text>
            </View>
            </View>):null}
        </View>
        </View>
      </View>

      </View>



  </Page>

    </Document>
  </PDFViewer>:<LoadingPage />}
  </div>
  </div>)
};

export default Pdf;