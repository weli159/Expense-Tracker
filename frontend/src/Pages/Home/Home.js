import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";
import Analytics from "./Analytics";
import axios from "axios";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import TableData from "./TableData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Spinner from "../../components/Spinner";

const Home = () => {
  const navigate = useNavigate();

  // State Management
  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false); // Controls data reloading
  const [frequency, setFrequency] = useState("7"); // Default: Last 7 days
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  // Form State
  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleStartChange = (date) => setStartDate(date);
  const handleEndChange = (date) => setEndDate(date);

  // Modal Controls
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Check Login Status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setcUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Handle Form Submit (ADD Transaction)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(addTransaction, {
        title: values.title,
        amount: values.amount,
        description: values.description,
        category: values.category,
        date: values.date,
        transactionType: values.transactionType,
        userId: cUser._id,
      });

      if (data.success === true) {
        handleClose(); // Close the modal
        setRefresh(!refresh); // Trigger a data refresh
        // Clear form
        setValues({
          title: "",
          amount: "",
          description: "",
          category: "",
          date: "",
          transactionType: "",
        });
      } else {
        alert(data.message || "Failed to add transaction");
      }
    } catch (error) {
      console.log(error);
      alert("Error adding transaction. Please check all fields.");
    }
  };

  // Reset Filter
  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  // Fetch Transactions
  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency: frequency,
          startDate: startDate,
          endDate: endDate,
          type: type,
        });
        setTransactions(data.transactions);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (cUser) fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate, cUser]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  }

  return (
    <>
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <Container className="mt-3" style={{ position: "relative", zIndex: "2 !important" }}>
          {/* Filters & Add Button */}
          <div className="filterRow">
            <div className="text-white">
              <div className="form-group mb-0">
                <h6>Select Frequency</h6>
                <select className="form-select" name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                  <option value="7">Last Week</option>
                  <option value="30">Last Month</option>
                  <option value="365">Last Year</option>
                  <option value="custom">Custom</option>
                </select>
                {frequency === "custom" && (
                  <div className="mt-2">
                    <DatePicker selected={startDate} onChange={handleStartChange} selectsStart startDate={startDate} endDate={endDate} placeholderText="Start Date" className="form-control" />
                    <DatePicker selected={endDate} onChange={handleEndChange} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} placeholderText="End Date" className="form-control mt-2" />
                  </div>
                )}
              </div>
            </div>

            <div className="text-white">
              <div className="form-group mb-0">
                <h6>Select Type</h6>
                <select className="form-select" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="all">All</option>
                  <option value="expense">Expense</option>
                  <option value="credit">Income</option>
                </select>
              </div>
            </div>

            <div className="text-white">
              <div className="btn-group">
                <FormatListBulletedIcon sx={{ cursor: "pointer" }} onClick={() => setView("table")} className={`mx-2 ${view === "table" ? "active-icon" : "inactive-icon"}`} />
                <BarChartIcon sx={{ cursor: "pointer" }} onClick={() => setView("analytics")} className={`mx-2 ${view === "analytics" ? "active-icon" : "inactive-icon"}`} />
              </div>
            </div>

            <div>
              <Button onClick={handleShow} className="addNew">Add New</Button>
              <Button onClick={handleReset} className="mobileBtn">Reset</Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="content">
            {view === "table" ? (
              // PASSING THE REFRESH FUNCTION TO THE CHILD
              <TableData data={transactions} user={cUser} handleRefresh={handleRefresh} />
            ) : (
              <Analytics transactions={transactions} user={cUser} />
            )}
          </div>

          {/* Add Transaction Modal */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" type="text" placeholder="Enter Transaction Name" value={values.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control name="amount" type="number" placeholder="Enter your Amount" value={values.amount} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSelect">
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
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" name="description" placeholder="Enter Description" value={values.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSelect1">
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Select name="transactionType" value={values.transactionType} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="credit">Income</option>
                    <option value="expense">Expense</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={values.date} onChange={handleChange} />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default Home;