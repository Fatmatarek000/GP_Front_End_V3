import "./ViewAccount.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { accountCoulm } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import AccountContext from "../../context/AccountContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ViewAccount() {
  const { detailData, getAccountById, handleDelete } =
    useContext(AccountContext);

  

  const { accId } = useParams();
  const [data, setData] = useState({
    accId: accId,
    accBalance: detailData.accBalance,
    accDebit: detailData.accDebit,
    accCredit: detailData.accCredit,
    accName: detailData.accName,
    increaseMode: detailData.increaseMode,
  });

  useEffect(() => {
    getAccountById(accId);
  }, [accId]);

  const columnsaccount = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/accounts/" + params.row.accId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.accId)}
            />
          </div>
        );
      },
    },
  ];





  const [category, setcategory] = useState({
    catId: "",
    accId: accId,
  });
  const [AccountCategories, setAccountCategories] = useState([]);

  const handleInputChange = (e) => {
    const categoryData = { ...category };

    categoryData[e.target.name] = e.target.value;

    setcategory(categoryData);
  };

  async function sendData() {
    const categoryData = { ...category };
    

    const res = await axios.post(
      `https://localhost:44393/api/FmsAddAccCat?accID=${accId}&catID=${categoryData.catId}`,
      categoryData
    );
    console.log(res)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    sendData();
  };

  async function getAllAccountCategories() {
    const accountObject = await axios.get(
      `https://localhost:44393/api/FmsGetAccountCategories?accID=${accId}`
    );

    setAccountCategories(accountObject.data);
  }
  console.log(AccountCategories);

  useEffect(() => {
    getAllAccountCategories();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable1">
          <div className="datatableTitle">
            Account Name: {data.accName}
            <br></br>
            Account Id: {data.accId}
          </div>

          <DataGrid
            className="datagrid"
            getRowId={(row) => row.accId}
            rows={[data]}
            columns={accountCoulm.concat(columnsaccount)}
            pageSize={1}
            rowsPerPageOptions={[1]}
            disableSelectionOnClick
          />
        </div>
        <br></br>
        <br></br>
        <div className="container">
          <h1 className="addProductTitle">New category</h1>
          <form className="addProductForm" onSubmit={handleSubmit}>
            <div className="addProductItem">
              <label>Category Id</label>
              <input
                type="number"
                name="catId"
                value={category.catId}
                onChange={handleInputChange}
                placeholder=""
              />
            </div>

            <button className="addProductButton">Add Category</button>
          </form>
        </div>
        <div className="catdev">
          <h2>this Account is Listed in {AccountCategories.length} Categories : </h2>
          {AccountCategories.map((category) => (
            <div className="AccountCategories">
              <h3>Category Id: {category.catId}</h3>
              <br />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}