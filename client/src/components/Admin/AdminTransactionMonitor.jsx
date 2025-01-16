import React from 'react';

function AdminTransactionMonitor({ transactions }) {
  return (
    <div>
      <h2>Monitor de Transacciones</h2>
      {transactions.map((transaction) => (
        <div key={transaction._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <p>
            <strong>Fecha:</strong>{' '}
            {new Date(transaction.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Cambio:</strong> {transaction.amountChanged}
          </p>
          <p>
            <strong>Total:</strong> {transaction.finalBalance}
          </p>
          <p>
            <strong>Mensaje:</strong> {transaction.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminTransactionMonitor;
