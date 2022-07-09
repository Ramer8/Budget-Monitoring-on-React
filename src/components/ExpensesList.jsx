import React from 'react'
import Expense from './Expense'

const ExpensesList = ({ expenses, setEditExpense, setDeleteExpense, filtered, filter }) => {
    return (
        <div className='listado-gastos contenedor'>
            {filter !== '' ?
                <>
                    <h2>{filtered.length ? 'Expenses Filtered' : 'Not expenses yet'}
                    </h2>
                    {(filtered.map(expense => (
                        <Expense
                            key={expense.id}
                            expense={expense}
                            setEditExpense={setEditExpense}
                            setDeleteExpense={setDeleteExpense} />
                    )))}
                </> :
                <><h2>{expenses.length ? 'Expenses' : 'Not expenses yet'}
                </h2>
                    {expenses.map(expense => (
                        <Expense
                            key={expense.id}
                            expense={expense}
                            setEditExpense={setEditExpense}
                            setDeleteExpense={setDeleteExpense} />
                    ))}
                </>
            }
        </div>
    )
}

export default ExpensesList