import { useState, useEffect } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const App = () => {
  const getInitialData = () => {
    const temp = localStorage.getItem('expenses');
    const savedData = JSON.parse(temp);
    return savedData || [];
  };

  const [expenses, setExpense] = useState(getInitialData());

  const addExpenseHandler = (expenseData) => {
    setExpense((prevExpense) => {
      return [expenseData, ...prevExpense];
    });
  };

  useEffect(() => {
    // storing expense items
    const temp = JSON.stringify(expenses);
    localStorage.setItem('expenses', temp);
  }, [expenses]);

  useEffect(() => {
    const temp = localStorage.getItem('expenses');
    const loadedExpenses = JSON.parse(temp);

    if (loadedExpenses) {
      setExpense(loadedExpenses);
    }
  }, [setExpense]);

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
