import express from 'express';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/addTransaction', addTransaction);
router.post('/getTransactions', getTransactions);
router.post('/deleteTransaction/:id', deleteTransaction);
router.put('/updateTransaction/:id', updateTransaction);

export default router;