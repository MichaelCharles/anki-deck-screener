import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import library from '../../library';

const Home = () => {
    const [decks, setDecks] = useState([])

    const propagateDecks = async () => {
        const { result } = await library.api.getAllDecks()
        setDecks(result)
    }

    useEffect(() => {
        propagateDecks();
    }, []);

    return <div>
        <h3>Decks</h3>
        <ul>
            {decks.map(deck => <Link to={`screener/${deck}`}><li>{deck}</li></Link>)}
        </ul>
    </div>
};

export default Home
