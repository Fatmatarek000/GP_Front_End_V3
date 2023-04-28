import { Link ,useParams} from "react-router-dom";
import "./rawmatrial.css";
import Charts from "../../Components/Chart/Charts";
import PublishIcon from '@mui/icons-material/Publish';
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from './../../Components/navbar/Navbar';
import { useContext ,useEffect,useState} from 'react';
import RawMatrialContext from "../../context/RawMatrialContext";

export default function RawMatrial() {
  const {materialId} = useParams(); 
  const {handleupdate,getRawmatrialById} = useContext (RawMatrialContext);
  const [rawdata,setRawdata] = useState({});

const handleSubmit = (e) =>
{
  e.preventDefault();
  handleupdate(materialId,rawdata);

}
const handleChange = (e) =>
{
   const rawmatrialData = {...rawdata}
   rawmatrialData[e.target.name] = e.target.value ;
   setRawdata(rawmatrialData);
   console.log(rawdata)
}
async function getRawmatrial ()
{


 const rawmatrial = await getRawmatrialById(materialId);
 console.log('====================================');
 console.log(rawmatrial);
 console.log('====================================');
 setRawdata(rawmatrial.data);

} 


useEffect(() => {
  
  getRawmatrial();
   
 
 },[])
  return (
    <div className="list">
   <Sidebar/>
    <div className="listContainer">
     <Navbar/>
    <div className="rawmatrial">
      <div className="rawmatrialTitleContainer">
        <h1 className="rawmatrialTitle">RawMatrial</h1>
        <Link to="/rawmatrial/newrawmatrial">
          <button className="rawmatrialAddButton">Create</button>
        </Link>
      </div>
      <div className="rawmatrialTop">
          <div className="rawmatrialTopLeft">
          <form className="rawmatrialForm"  onSubmit={handleSubmit}>
              <div className="rawmatrialFormLeft">
              <input type="text" onChange={handleChange} placeholder="materialName" name="materialName" value={rawdata.materialName}/>

              </div>
              <div className="rawmatrialFormLeft">
              <input type="text" onChange={handleChange} placeholder="materialDescription" name="materialDescription" value={rawdata.materialDescription}/>

              </div>
              <button className="rawmatrialAddButton">Update</button>

          </form>
          </div>
          <div className="rawmatrialTopRight">
              <div className="rawmatrialInfoTop">
              <p className="rawmatrialName"><span className="spanform">materialName:</span> {rawdata.materialName}</p>

              </div>
              <p className="paddraw"><span className="spanform">materialDescription:</span> {rawdata.materialDescription}</p>

          </div>
      </div>
  
    </div>
    </div>
    </div>
  );
}
