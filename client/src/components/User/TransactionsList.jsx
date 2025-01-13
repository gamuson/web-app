import React from 'react';

function TransactionList({ transactions }) {
  if (!transactions.length) {
    return <p>No hay transacciones para mostrar.</p>;
  }

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          <p>
            <strong>Fecha:</strong>
            {' '}
            {new Date(transaction.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Monto:</strong>
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
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
