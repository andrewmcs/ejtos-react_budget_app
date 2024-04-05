import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const { expenses } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const handleBudgetChange = (event) => {
        if (event.target.value > 20000) {
            alert("The budget cannot exceed 20000");
            setNewBudget("20000");
            return;
        }
        if (event.target.value < totalExpenses) {
            alert("You cannot reduce the budget to less than the spending");
            setNewBudget(totalExpenses);
            return;
        }
        setNewBudget(event.target.value);
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: £</span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
        </div>
    );
};
export default Budget;
