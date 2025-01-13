import React, { createContext, useContext, useState } from 'react';
import { getUserTransactions } from '../services/userService';

const TransactionContext = createContext();
const logger = require('../logger');
export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async (token) => {
    try {
      const data = await getUserTransactions(token);
      setTransactions(data);
    } catch (error) {
      

      logger.error(`Error al cargar transacciones: ${error.message}`);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, loadTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
const contextValue = useMemo(() => ({
  transactions,
  loadTransactions,
}), [transactions]);
export const useTransactions = () => useContext(TransactionContext);
