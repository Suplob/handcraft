import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Preloader from "../../Shared/Preloader/Preloader";
import { Box } from "@mui/system";
import PrimaryBTN from "../../Shared/PrimaryBTN/PrimaryBTN";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [control, setControl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | HandCraft";
    setLoading(true);
    axios
      .get(`https://hand-craft-backend.herokuapp.com/myOrder/${user.email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
  }, [user.email, control]);

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

  const history = useHistory();

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontFamily: "Cormorant" }}
      >
        Hello {user.displayName}
      </Typography>

      {loading ? (
        <Box sx={{ my: 5 }}>
          <Preloader></Preloader>
        </Box>
      ) : orders.length !== 0 ? (
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    sx={{ fontSize: "20px" }}
                    scope="row"
                  >
                    {order.product.name}
                  </TableCell>
                  <TableCell
                    component="th"
                    sx={{ fontSize: "20px" }}
                    scope="row"
                  >
                    {order.product.price}
                  </TableCell>
                  <TableCell
                    component="th"
                    sx={{ fontSize: "20px" }}
                    scope="row"
                  >
                    {order.status}
                  </TableCell>
                  <TableCell
                    component="th"
                    sx={{ fontSize: "20px" }}
                    scope="row"
                  >
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
                        }}
                        onClick={() => handleDelete(order._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "Cormorant", mt: 5, mb: 2 }}
          >
            You haven't ordered anything :(
          </Typography>
          <Box
            sx={{ width: "200px", margin: "0 auto" }}
            onClick={() => history.push("/allProducts")}
          >
            <PrimaryBTN>Order Now</PrimaryBTN>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default MyOrders;
