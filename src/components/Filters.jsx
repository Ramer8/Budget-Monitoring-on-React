import { useEffect, useState } from 'react'

const Filters = ({ filter, setFilter }) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filter by</label>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value=''>All Categories</option>
                        <option value='Saving'>Saving</option>
                        <option value='Food'>Food</option>
                        <option value='Home'>Home</option>
                        <option value='Bills'>Bills</option>
                        <option value='Leisure'>Leisure</option>
                        <option value='Health'>Health</option>
                        <option value='Subscriptions'>Subscriptions</option>
                    </select>
                </div>

            </form>
        </div>
    )
}

export default Filters