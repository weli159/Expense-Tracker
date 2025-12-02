import express from 'express';
// On utilise import et on ajoute l'extension .js si c'est un fichier local
// Tu devras t'assurer d'utiliser les noms exacts de tes fonctions dans le contrôleur (addTransactionController, etc.)
import { addTransactionController, deleteTransactionController, updateTransactionController } from '../controllers/transactionController.js'; 

const router = express.Router();

router.post('/add-transaction', addTransactionController);
router.delete('/delete-transaction/:id', deleteTransactionController);

// N'oublie pas d'ajouter la route de modification (PUT)
router.put('/update-transaction/:id', updateTransactionController);

// On utilise export default
export default router;