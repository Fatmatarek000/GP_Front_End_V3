import { Link, useParams } from "react-router-dom";
import "./category.css";
import Charts from "../../Components/Chart/Charts";
import PublishIcon from '@mui/icons-material/Publish';
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from './../../Components/navbar/Navbar';
import { useContext ,useEffect,useState} from 'react';
import CategoryContext from "../../context/CategoryContext";

export default function Category() {
   const {categoryId} = useParams(); 
   const {handleupdate,getCategoryById} = useContext (CategoryContext);
   const [catdata,setCatdata] = useState({
    categoryName: "string",
    categoryDescription: "string"
  });

 const handleSubmit = (e) =>
 {
   e.preventDefault();
   handleupdate(categoryId,catdata);

 }
 const handleChange = (e) =>
 {
    const categoryData = {...catdata}
    categoryData[e.target.name] = e.target.value ;
    setCatdata(categoryData);
    console.log(catdata)
 }
 async function getCategory ()
{


  const category = await getCategoryById(categoryId);
  console.log('====================================');
  console.log(category);
  console.log('====================================');
  setCatdata(category.data);

} 


useEffect(() => {
   
  getCategory();
    
  
  },[])
   console.log('====================================');
   console.log(categoryId);
   console.log('====================================');
  return (
    <div className="list">
   <Sidebar/>
    <div className="listContainer">
     <Navbar/>
    <div className="category">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">category</h1>
        <Link to="/category/newcategory">
          <button className="categoryAddButton">Create</button>
        </Link>
      </div>
      <div className="categoryTop">
          <div className="categoryTopLeft">
          <form className="categoryForm" onSubmit={handleSubmit}>
          <div className="categoryFormLeft">
              
              <input type="text" onChange={handleChange} placeholder="categoryName" name="categoryName" value={catdata.categoryName}/>
          
          </div>
          <div className="categoryFormLeft">
              
              <input type="text" onChange={handleChange} placeholder="categoryDescription" name="categoryDescription" value={catdata.categoryDescription} />
            
          </div>
          <button className="categoryAddButton">Update</button>
      </form>
          </div>

          <div className="categoryTopRight">
              <div className="categoryInfoTop">

            <p className="categoryName"><span className="spanform">categoryName:</span> {catdata.categoryName}</p>

            <p className=""><span className="spanform">categoryDescription: </span>{catdata.categoryDescription}</p>
              </div>
              
          </div>
      </div>
    
    </div>
    </div>
    </div>
  );
}
