import React from 'react';

function TransactionList({ transactions, filter, onFilterChange }) {
  const filteredTransactions = transactions.filter((t) => t.message.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por mensaje"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      {filteredTransactions.map((transaction) => (
        <div key={transaction._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <p>
            <strong>Fecha:</strong>
            {' '}
            {new Date(transaction.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Saldo Inicial:</strong>
            {' '}
            {transaction.initialBalance}
          </p>
          <p>
            <strong>Cambio:</strong>
            {' '}
            {transaction.amountChanged}
          </p>
          <p>
            <strong>Saldo Final:</strong>
            {' '}
            {transaction.finalBalance}
          </p>
          <p>
            <strong>Mensaje:</strong>
            {' '}
            {transaction.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
