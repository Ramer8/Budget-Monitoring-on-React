import { useState, useEffect } from 'react'
import CloseBtn from '../img/cerrar.svg'
import Expense from './Expense'
import Message from './Message'

const Modal = ({ setModal, animationModal, setAnimationModal, saveExpense, editExpense, setEditExpense }) => {

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [ammount, setAmmount] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (!Object.keys(editExpense).length == 0) {
            setName(editExpense.name)
            setAmmount(editExpense.ammount)
            setCategory(editExpense.category)
            setId(editExpense.id)
            setDate(editExpense.date)
        }
    }, [])

    const hideModal = () => {
        setAnimationModal(false)
        setEditExpense({})
        setTimeout(() => {
            setModal(false)
        }, 250)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if ([name, ammount, category].includes('')) {
            setMessage("All fields are required")
            setTimeout(() => {
                setMessage("")
            }, 1500);
            return
        }

        saveExpense({ name, ammount, category, id, date })

    }
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img src={CloseBtn}
                    alt="close modal"
                    onClick={hideModal}
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario  ${animationModal ? "animar" : ''}`}>
                <legend>{editExpense.name ? "Edit Expense" : "New Expense"}</legend>
                {message && <Message tipo="error">{message}</Message>}

                <div className='campo'>
                    <label htmlFor='nombre'> Spend Name</label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='Enter Expense Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='nombre'> Ammount</label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Enter Ammount Expense, eg. $300'
                        value={ammount}
                        onChange={e => setAmmount(Number(e.target.value))} />
                </div>
                <div className='campo'>
                    <label htmlFor='categoria'>Category</label>
                    <select
                        id="categoria"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value=''>--Select--</option>
                        <option value='Saving'>--Saving--</option>
                        <option value='Food'>--Food--</option>
                        <option value='Home'>--Home--</option>
                        <option value='Bills'>--Bills--</option>
                        <option value='Leisure'>--Leisure--</option>
                        <option value='Health'>--Health--</option>
                        <option value='Subscriptions'>--Subscriptions--</option>
                    </select>

                </div>
                <input
                    type="submit"
                    value={editExpense.name ? "Save Changes" : "Add Expense"}

                />
            </form>
        </div>
    )
}

export default Modal