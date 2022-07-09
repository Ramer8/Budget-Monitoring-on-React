import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({ budget, expenses, setBudget, setExpenses, setIsValidBudget }) => {

    const [percentage, setpercentage] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.ammount + total, 0)
        const totalAvailable = budget - totalSpent
        setSpent(totalSpent)
        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2)
        setTimeout(() => {
            setpercentage(newPercentage)
        }, 1300);
        setAvailable(totalAvailable)
    }, [expenses])

    const format = (ammount) => {
        return ammount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    const HandleResetApp = () => {
        const response = confirm('Are you sure reset the App?')
        if (response) {
            setBudget(0)
            setExpenses([])
            setIsValidBudget(false)
        }
    }
    return (

        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: percentage >= 0 && percentage < 50 ? '#55bc3b' :
                            percentage >= 50 && percentage < 75 ? '#f9f017' :
                                percentage >= 75 && percentage < 100 ? '#f47f01 ' : '#DC2626',
                        trailColor: '#1a16e1',
                        textColor: '#0C48D9'
                    })}
                    value={percentage}
                    text={`Spent ${percentage}%`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button className='reset-app'
                    type='button'
                    onClick={HandleResetApp}>
                    Reset App
                </button>
                <p>
                    <span>Budget: </span> {format(budget)}
                </p>

                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Available: </span> {format(available)}
                </p>

                <p>
                    <span>Spent: </span> {format(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl