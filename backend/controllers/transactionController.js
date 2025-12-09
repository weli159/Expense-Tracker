
import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";


export const addTransactionController = async (req, res) => {
    try {
        const {
            title,
            amount,
            description,
            date,
            category,
            userId,
            transactionType,
        } = req.body;

        // console.log(title, amount, description, date, category, userId, transactionType);

        if (
            !title ||
            !amount ||
            !description ||
            !date ||
            !category ||
            !transactionType
        ) {
            return res.status(408).json({
                success: false,
                messages: "Please Fill all fields",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        let newTransaction = await Transaction.create({
            title: title,
            amount: amount,
            category: category,
            description: description,
            date: date,
            user: userId,
            transactionType: transactionType,
        });

        user.transactions.push(newTransaction);

        user.save();

        return res.status(200).json({
            success: true,
            message: "Transaction Added Successfully",
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            messages: err.message,
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const { frequency, selectedDate, type, userId } = req.body;

        // 1. Initialize query with user ID
        const query = {
            user: userId,
        };

        // 2. Add Date Filter
        if (frequency !== 'custom') {
            // Filter by last 7, 30, 365 days
            query.date = {
                $gt: moment().subtract(Number(frequency), "d").toDate()
            };
        } else if (selectedDate) {
            // Filter by custom range
            query.date = {
                $gte: new Date(selectedDate[0]),
                $lte: new Date(selectedDate[1])
            };
        }

        // 3. Add Type Filter (Expense/Income)
        if (type !== 'all') {
            query.type = type;
        }

        // 4. Execute Query
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


export const deleteTransactionController = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.body.userId;

        // console.log(transactionId, userId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const transactionElement = await Transaction.findByIdAndDelete(
            transactionId
        );

        if (!transactionElement) {
            return res.status(400).json({
                success: false,
                message: "transaction not found",
            });
        }

        const transactionArr = user.transactions.filter(
            (transaction) => transaction._id === transactionId
        );

        user.transactions = transactionArr;

        user.save();

        // await transactionElement.remove();

        return res.status(200).json({
            success: true,
            message: `Transaction successfully deleted`,
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            messages: err.message,
        });
    }
};

export const updateTransactionController = async (req, res) => {
    try {
        const transactionId = req.params.id;

        const { title, amount, description, date, category, transactionType } =
            req.body;

        console.log(title, amount, description, date, category, transactionType);

        const transactionElement = await Transaction.findById(transactionId);

        if (!transactionElement) {
            return res.status(400).json({
                success: false,
                message: "transaction not found",
            });
        }

        if (title) {
            transactionElement.title = title;
        }

        if (description) {
            transactionElement.description = description;
        }

        if (amount) {
            transactionElement.amount = amount;
        }

        if (category) {
            transactionElement.category = category;
        }
        if (transactionType) {
            transactionElement.transactionType = transactionType;
        }

        if (date) {
            transactionElement.date = date;
        }

        await transactionElement.save();

        // await transactionElement.remove();

        return res.status(200).json({
            success: true,
            message: `Transaction Updated Successfully`,
            transaction: transactionElement,
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            messages: err.message,
        });
    }
};
