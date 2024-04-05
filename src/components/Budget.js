import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const { expenses } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);


    const handleBudgetChange = (event) => {
        if (event.target.value > 20000) {
            alert("The budget cannot exceed 20000");
            setNewBudget("20000");
            dispatch({
                type: 'SET_BUDGET',
                payload: 20000,
            })
            return;
        }
        if (event.target.value < totalExpenses) {
            alert("You cannot reduce the budget to less than the spending");
            setNewBudget(totalExpenses);
            dispatch({
                type: 'SET_BUDGET',
                payload: totalExpenses,
            })
            return;
        }
        setNewBudget(event.target.value);
        dispatch({
            type: 'SET_BUDGET',
            payload: event.target.value,
        });
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}</span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
        </div>
    );
};
export default Budget;
