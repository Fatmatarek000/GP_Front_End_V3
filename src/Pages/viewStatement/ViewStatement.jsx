import "./ViewStatement.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { statementCoulm } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import StatementContext from "../../context/StatementContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ViewStatement() {
  const { detailData, getStatementById, handleDelete } =
    useContext(StatementContext);

  

  const { staId } = useParams();
  const [data, setData] = useState({
    staId: staId,
    staName: detailData.staName,
    staBalance: detailData.staBalance,
    staDate: detailData.staDate,
  });

  useEffect(() => {
    getStatementById(staId);
  }, [staId]);

  const columnsaccount = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/statement/" + params.row.staId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.staId)}
            />
          </div>
        );
      },
    },
  ];





  const [Statement, setStatement] = useState({
    accName: "",
    staId: staId,
  });
  const [AccountStatement, setAccountStatement] = useState([]);

  const handleInputChange = (e) => {
    const StatementData = { ...Statement };

    StatementData[e.target.name] = e.target.value;

    setStatement(StatementData);
  };

  async function sendData() {
    const StatementData = { ...Statement };
    

    const res = await axios.post(
      `https://localhost:44393/api/FmsAddStatementAccount?staID=${staId}&accName=${Statement.accName}`,
      StatementData
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    sendData();
  };

  async function getAllAccountStatement() {
    const accountObject = await axios.get(
      `https://localhost:44393/api/FmsGetStatementAccounts?staID=${staId}`
    );

    setAccountStatement(accountObject.data);
  }

  useEffect(() => {
    getAllAccountStatement();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable1">
          <div className="datatableTitle">
            Statement Name: {data.staName}
            <br></br>
            Statement Id: {data.staId}
          </div>

          <DataGrid
            className="datagrid"
            getRowId={(row) => row.staId}
            rows={[data]}
            columns={statementCoulm.concat(columnsaccount)}
            pageSize={1}
            rowsPerPageOptions={[1]}
            disableSelectionOnClick
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="catdev">
          <h2>there is {AccountStatement.length} Accounts : </h2>
          {AccountStatement.map((Statement) => (
            <div className="AccountStatement">
              <h3>Account Name: {Statement.accName}</h3>
              <br />
              <h3>Account Balance: {Statement.accBalance}</h3>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
