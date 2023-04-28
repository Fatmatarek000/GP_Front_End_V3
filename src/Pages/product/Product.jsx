import { Link ,useParams} from "react-router-dom";
import "./product.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from './../../Components/navbar/Navbar';
import { useContext ,useEffect,useState} from 'react';
import AllproductContext from "../../context/AllproductContext";


export default function Product() {
    const {productId} = useParams(); 
    const {handleupdate,getProductById} = useContext (AllproductContext);
    const [prodata,setProdata] = useState({});

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    handleupdate(productId,prodata);
 
  }
  const handleChange = (e) =>
  {
     const productData = {...prodata}
     productData[e.target.name] = e.target.value ;
     setProdata(productData);
     console.log(prodata)
  }
  async function getproduct ()
 {
 
 
   const product = await getProductById(productId);
   console.log('====================================');
   console.log(product);
   console.log('====================================');
   setProdata(product.data);
 
 } 
 
 
 useEffect(() => {
    
    getproduct();
     
   
   },[])
  return (
    <div className="list">
   <Sidebar/>
    <div className="listContainer">
     <Navbar/>
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/products/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
          <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
          <input type="text" onChange={handleChange} placeholder="productName" name="productName" value={prodata.productName}/>

          </div>
          <div className="productFormLeft">
          <input type="text" onChange={handleChange} placeholder="productDescription" name="productDescription" value={prodata.productDescription}/>

          </div>
          <div className="productFormLeft">
          <input type="number" onChange={handleChange} placeholder="purchasePrice" name="purchasePrice" value={prodata.purchasePrice}/>

          </div>
          <div className="productFormLeft">
          <input type="number" onChange={handleChange} placeholder="salesPrice" name="salesPrice" value={prodata.salesPrice}/>

          </div>
         
          <div className="productFormLeft">
          <input type="number" onChange={handleChange} placeholder="categoryId" name="categoryId" value={prodata.categoryId}/>

          </div>
          
          <button className="productAddButton">Update</button>

      </form>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <p className="categoryName"><span className="spanform">productName:  </span>{prodata.productName}</p>

                  <p className="paddorder"><span className="spanform">productDescription:  </span>{prodata.productDescription}</p>
                  <p className="paddorder"><span className="spanform">purchasePrice:  </span>{prodata.purchasePrice}</p>
                  <p className="paddorder"><span className="spanform">salesPrice:  </span>{prodata.salesPrice}</p>
                  <p className="paddorder"><span className="spanform">categoryId:  </span>{prodata.categoryId}</p>
              </div>
           
          </div>
      </div>
     
    </div>
    </div>
    </div>
  );
}
