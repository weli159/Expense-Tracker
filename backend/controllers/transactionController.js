import TransactionSchema from "../models/TransactionModel.js";
import moment from "moment";

export const addTransaction = async (req, res) => {
    const { title, amount, category, description, date, transactionType, userId } = req.body;

    const transaction = TransactionSchema({
        title,
        amount,
        category,
        description,
        date,
        transactionType,
        user: userId
    })

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({success: false, message: 'All fields are required!'})
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({success: false, message: 'Amount must be a positive number!'})
        }
        await transaction.save()
        
        res.status(200).json({success: true, message: 'Transaction Added'}) 
        
    } catch (error) {
        console.log("THE ERROR IS:", error);
        res.status(500).json({success: false, message: 'Server Error', error: error.message})
    }
}

export const getTransactions = async (req, res) => {
  try {
    // 1. Destructure the exact fields sent from Home.js
    const { frequency, startDate, endDate, type, userId } = req.body;

    const query = {
      user: userId,
    };

    // 2. Fix Date Filter Logic
    if (frequency !== 'custom') {
      // Standard ranges (7, 30, 365)
      query.date = {
        $gt: moment().subtract(Number(frequency), "d").toDate()
      };
    } else if (startDate && endDate) {
      // Custom Range (Fixed to match Frontend variable names)
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // 3. Fix Type Filter Logic
    if (type !== 'all') {
      // Must search 'transactionType' column, NOT 'type'
      query.transactionType = type;
    }

    // 4. Run Query
    const transactions = await TransactionSchema.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteTransaction = async (req, res) => {
    const {id} = req.params;
    try {
        await TransactionSchema.findByIdAndDelete(id)
        res.status(200).json({success: true, message: 'Transaction Deleted'})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date, transactionType } = req.body;

    try {
        await TransactionSchema.findByIdAndUpdate(id, {
            title,
            amount,
            category,
            description,
            date,
            transactionType // <--- FIXED: match Schema field
        });
        res.status(200).json({ success: true, message: 'Transaction Updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};