import React, { useContext, useState } from "react"
import axios from 'axios'

// L'URL de ton backend (vérifie le port, souvent 5000 ou 3000)
const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // --- À AJOUTER PAR TOI (Student B) ---

    // 1. Fonction pour AJOUTER une dépense
    const addTransaction = async (income) => {
        try {
            // On envoie les données au backend
            await axios.post(`${BASE_URL}add-transaction`, income)
                .catch((err) =>{
                    setError(err.response.data.message)
                })
            // IMPORTANT : On recharge la liste après l'ajout pour voir le changement
            getTransactions() 
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    // 2. Fonction pour SUPPRIMER une dépense
    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-transaction/${id}`)
            // On recharge la liste
            getTransactions()
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const updateTransaction = async (id) => {
        try{
            await axios.delete(`${BASE_URL}update-transaction/${id}`)
            getTransactions()
        } catch(error){
            setError(error.response.data.message)
        }
    }
    
    // (Student C fera la fonction getTransactions ici)
    const getTransactions = async () => {
        // ... code de Student C ...
    }

    return (
        <GlobalContext.Provider value={{
            addTransaction,      // On rend ta fonction disponible partout
            deleteTransaction,   // Celle-là aussi
            updateTransaction,
            incomes,
            expenses,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}