import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Preloader from "../../Shared/Preloader/Preloader";
import { Box } from "@mui/system";
import DoneIcon from "@mui/icons-material/Done";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [control, setControl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    document.title = "Manage Orders | Dashboard";
    axios.get(`https://hand-craft-backend.herokuapp.com/orders`).then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [control]);

  const handleDelete = (id) => {
    setDeleteLoading(id);
    axios
      .delete(`https://hand-craft-backend.herokuapp.com/cancelOrder/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setControl(!control);
          setDeleteLoading(false);
        }
      });
  };

  const handleUpdate = (id) => {
    setUpdateLoading(id);
    axios
      .put(`https://hand-craft-backend.herokuapp.com/changeStatus/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setControl(!control);
          setUpdateLoading(false);
        }
      });
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Cormorant", textAlign: "center", mt: 3, mb: 2 }}
      >
        Manage All Orders
      </Typography>
      {loading ? (
        <Preloader></Preloader>
      ) : orders.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.name}
                  </TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.product.name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {deleteLoading === order._id ? (
                      <CircularProgress />
                    ) : (
                      <DeleteIcon
                        sx={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "5px",
                          color: "white",
                          backgroundColor: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                          mr: 1,
                        }}
                        onClick={() => handleDelete(order._id)}
                      />
                    )}
                    {updateLoading === order._id ? (
                      <CircularProgress />
                    ) : (
                      <DoneIcon
                        sx={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "5px",
                          color: "white",
                          backgroundColor: "green",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUpdate(order._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography
            variant="h3"
            sx={{ fontFamily: "Cormorant", textAlign: "center" }}
          >
            No Order Found :(
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ManageOrders;
