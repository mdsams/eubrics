import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './card.css';

const Card = ({ name }: any) => {
    const [clicked, setClicked] = useState(false);
    return (
        <button className='cards'>
            <Link className='link' to='/todo' state={name.type}>
                {name.type}
            </Link>
        </button>
    );
};

export default Card;
