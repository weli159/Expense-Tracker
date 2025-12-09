import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EuroIcon from '@mui/icons-material/Euro'; // <--- CHANGED TO EURO
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Analytics = ({ transactions }) => {
  const TotalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  );

  let totalIncomePercent =
    (totalIncomeTransactions.length / TotalTransactions) * 100;
  let totalExpensePercent =
    (totalExpenseTransactions.length / TotalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnoverIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalTurnoverExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalTurnoverPercent =
    (totalTurnoverIncome / totalTurnover) * 100;
  const totalTurnoverExpensePercent =
    (totalTurnoverExpense / totalTurnover) * 100;

  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const colors = {
    "Groceries": '#FF6384',
    "Rent": '#36A2EB',
    "Salary": '#FFCE56',
    "Tip": '#4BC0C0',
    "Food": '#9966FF',
    "Medical": '#FF9F40',
    "Utilities": '#8AC926',
    "Entertainment": '#1982C4',
    "Transportation": '#6A4C93',
    "Other": '#F15BB5',
  };

  return (
    <>
      <div className="row mt-3 analytics">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Total Transactions:</span>{" "}
              {TotalTransactions}
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">
                Income: <ArrowDropUpIcon /> {totalIncomeTransactions.length}
              </h5>
              <h5 className="card-title text-danger">
                Expense: <ArrowDropDownIcon /> {totalExpenseTransactions.length}
              </h5>
              <div className="d-flex justify-content-center mt-3">
                <CircularProgressBar
                  percentage={totalIncomePercent.toFixed(0)}
                  color="green"
                />
              </div>
              <div className="d-flex justify-content-center mt-3 mb-2">
                <CircularProgressBar
                  percentage={totalExpensePercent.toFixed(0)}
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Total Turnover:</span>{" "}
              {totalTurnover}
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">
                Income: <ArrowDropUpIcon /> {totalTurnoverIncome} <EuroIcon fontSize="small"/>
              </h5>
              <h5 className="card-title text-danger">
                Expense: <ArrowDropDownIcon /> {totalTurnoverExpense} <EuroIcon fontSize="small"/>
              </h5>
              <div className="d-flex justify-content-center mt-3">
                <CircularProgressBar
                  percentage={totalTurnoverPercent.toFixed(0)}
                  color="green"
                />
              </div>
              <div className="d-flex justify-content-center mt-3 mb-2">
                <CircularProgressBar
                  percentage={totalTurnoverExpensePercent.toFixed(0)}
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Categorywise Income</span>{" "}
            </div>
            <div className="card-body">
              {categories.map((category) => {
                const amount = transactions
                  .filter(
                    (t) =>
                      t.transactionType === "credit" &&
                      t.category === category
                  )
                  .reduce((acc, t) => acc + t.amount, 0);
                return (
                  amount > 0 && (
                    <LineProgressBar
                      label={category}
                      percentage={(amount / totalTurnoverIncome) * 100}
                      color={colors[category]}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-black text-white">
              <span style={{ fontWeight: "bold" }}>Categorywise Expense</span>{" "}
            </div>
            <div className="card-body">
              {categories.map((category) => {
                const amount = transactions
                  .filter(
                    (t) =>
                      t.transactionType === "expense" &&
                      t.category === category
                  )
                  .reduce((acc, t) => acc + t.amount, 0);
                return (
                  amount > 0 && (
                    <LineProgressBar
                      label={category}
                      percentage={(amount / totalTurnoverExpense) * 100}
                      color={colors[category]}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;