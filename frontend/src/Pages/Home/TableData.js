import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { deleteTransactions, editTransactions } from "../../utils/ApiRequest";
import axios from "axios";

const TableData = ({ data, user, handleRefresh }) => { // Destructure handleRefresh from props
  const [show, setShow] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currId, setCurrId] = useState(null);

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEditClick = (itemKey) => {
    const editTran = data.filter((item) => item._id === itemKey);
    setCurrId(itemKey);
    setEditingTransaction(editTran);
    // Pre-fill form
    setValues({
      title: editTran[0].title,
      amount: editTran[0].amount,
      description: editTran[0].description,
      category: editTran[0].category,
      date: moment(editTran[0].date).format("YYYY-MM-DD"),
      transactionType: editTran[0].transactionType,
    });
    setShow(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(`${editTransactions}/${currId}`, {
            ...values,
        });

        if (data.success === true) {
            setShow(false);
            handleRefresh(); // Tell Home.js to refresh the data
        } else {
            console.log("Error updating");
        }
    } catch (error) {
        console.log(error);
    }
  };

  const handleDeleteClick = async (itemKey) => {
    try {
        const { data } = await axios.post(`${deleteTransactions}/${itemKey}`, {
            userId: user._id,
        });

        if (data.success === true) {
            handleRefresh(); // Tell Home.js to refresh the data
        } else {
            console.log("Error deleting");
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Container>
      <Table responsive="md" className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {data.map((item, index) => (
            <tr key={index}>
              <td>{moment(item.date).format("YYYY-MM-DD")}</td>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td>{item.transactionType}</td>
              <td>{item.category}</td>
              <td>
                <div className="icons-handle">
                  <EditNoteIcon
                    sx={{ cursor: "pointer" }}
                    key={`edit-${item._id}`}
                    onClick={() => handleEditClick(item._id)}
                  />
                  <DeleteForeverIcon
                    sx={{ color: "red", cursor: "pointer" }}
                    key={`delete-${item._id}`}
                    onClick={() => handleDeleteClick(item._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="text" value={values.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control name="amount" type="number" value={values.amount} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={values.category} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Tip">Tip</option>
                <option value="Food">Food</option>
                <option value="Medical">Medical</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" type="text" value={values.description} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select name="transactionType" value={values.transactionType} onChange={handleChange}>
                <option value="expense">Expense</option> 
                <option value="credit">Income</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control name="date" type="date" value={values.date} onChange={handleChange} />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TableData;