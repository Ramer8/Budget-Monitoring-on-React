import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions

} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { formatDate } from '../helpers'
import IconSave from '../img/icono_ahorro.svg'
import IconHome from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconBills from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSuscriptions from '../img/icono_suscripciones.svg'

const dictionaryIcons = {
    Saving: IconSave,
    Food: IconFood,
    Home: IconHome,
    Bills: IconBills,
    Leisure: IconLeisure,
    Health: IconHealth,
    Subscriptions: IconSuscriptions
}
const Expense = ({ expense, setEditExpense, setDeleteExpense }) => {
    const { category, name, ammount, id, date } = expense
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}
            >
                Edit
            </SwipeAction>
        </LeadingActions>

    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => setDeleteExpense(expense)}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>

    )

    return (

        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img
                            src={dictionaryIcons[category]}
                            alt="Icono Gasto"
                        />
                        <div className='descripcion-gasto'>
                            <p className='categoria'> {category}</p>
                            <p className='nombre-gasto'> {name}</p>
                            <p className='fecha-gasto'>
                                Added: {''}
                                <span>{formatDate(date)}</span>
                            </p>


                        </div>
                    </div>
                    <p className='cantidad-gasto'> ${ammount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>


    )
}

export default Expense