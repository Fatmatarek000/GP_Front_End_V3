import "./FmsViewCategory.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { fmsCategoryCoulm } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import FmsCategoryContext from "../../context/FmsCategoryContext";

export default function FmsViewCategory() {
  const { detailData, getCategoryById, handleDelete } =
    useContext(FmsCategoryContext);

  const { catId } = useParams();
  useEffect(() => {
    getCategoryById(catId);
  }, [catId]);
  const [data, setData] = useState({
    catId: catId,
    catName: detailData.catName,
    catDescription: detailData.catDescription,
  });

  const columnsaccount = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/category/" + params.row.catId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.catId)}
            />
          </div>
        );
      },
    },
  ];

  const [category, setcategory] = useState({
    accId: "",
    catId: catId,
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
      `https://localhost:44393/api/FmsAddAccCat?accID=${categoryData.accId}&catID=${catId}`,
      categoryData
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    sendData();
  };

  async function getAllCategoriesAccount() {
    const categoryObject = await axios.get(
      `https://localhost:44393/api/FmsGetCategoryAccounts?catID=${catId}`
    );

    setAccountCategories(categoryObject.data);
  }
  console.log(AccountCategories);

  useEffect(() => {
    getAllCategoriesAccount();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable1">
          <div className="datatableTitle">
            Category Name: {data.catName}
            <br></br>
            Category Id: {data.catId}
          </div>

          <DataGrid
            className="datagrid"
            getRowId={(row) => row.catId}
            rows={[data]}
            columns={fmsCategoryCoulm.concat(columnsaccount)}
            pageSize={1}
            rowsPerPageOptions={[1]}
            disableSelectionOnClick
          />
        </div>
        <br></br>
        <br></br>
        <div className="container">
          <h1 className="addProductTitle">New Account</h1>
          <form className="addProductForm" onSubmit={handleSubmit}>
            <div className="addProductItem">
              <label>Account Id</label>
              <input
                type="number"
                name="accId"
                value={category.accId}
                onChange={handleInputChange}
                placeholder=""
              />
            </div>

            <button className="addProductButton">Add Account</button>
          </form>
        </div>
        <div className="catdev">
          <h2>this Category has {AccountCategories.length} Accounts :</h2>
          {AccountCategories.map((Account) => (
            <div className="AccountCategories">
              <h3>Account Id: {Account.accId}</h3>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
