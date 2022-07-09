import { useState, useEffect } from 'react'
import ExpensesList from './components/ExpensesList'
import Filters from './components/Filters'
import Header from './components/Header'
import Modal from './components/Modal'
import { generateId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0)

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [])

  const [isValidBudget, setIsValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animationModal, setAnimationModal] = useState(false)

  const [editExpense, setEditExpense] = useState([])

  const [deleteExpense, setDeleteExpense] = useState([])

  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])


  useEffect(() => {
    if (Object.keys(deleteExpense).length > 0) {
      const reloadExpenses = expenses.filter(deleted => deleted.id !== deleteExpense.id)
      setExpenses(reloadExpenses)
      setDeleteExpense({})
    }
  }, [deleteExpense])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimationModal(true)
      }, 240)
    }
  }, [editExpense])
  //Local Storage for Budget
  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    const budgetLS = (Number(localStorage.getItem('budget')) ?? 0)
    if (budgetLS > 0) {
      setIsValidBudget(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect(() => {
    if (filter) {
      const filtered = expenses.filter(exp => exp.category === filter)
      setFiltered(filtered)
    }
  }, [filter])


  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})
    setTimeout(() => {
      setAnimationModal(true)
    }, 500)
  }
  const saveExpense = expense => {

    if (expense.id) {
      const UpdateExpense = expenses.map(expenseState => expenseState.id ===
        expense.id ? expense : expenseState)
      setExpenses(UpdateExpense)
      setEditExpense({})
    } else {
      //nuevo gasto 
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }
    setAnimationModal(false)
    setTimeout(() => {
      setModal(false)
    }, 250)
  }
  const generateId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              setDeleteExpense={setDeleteExpense}
              filtered={filtered}
              filter={filter}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="Icon new spend "
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animationModal={animationModal}
        setAnimationModal={setAnimationModal}
        saveExpense={saveExpense} //llamo la funcion para el modal
        editExpense={editExpense}
        setEditExpense={setEditExpense}

      />}
    </div>
  )
}

export default App
