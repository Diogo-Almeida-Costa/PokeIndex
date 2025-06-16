import React from 'react';
import {Link} from 'react-router-dom';

export const Header: React.FC = () =>
{
    return(
        <header className="menu-superior">
            <div className="forma-azul"></div>
            <div className="forma-rosa"></div>
            <Link to="/" className="botao-central">
                <img src="/img/PokeIndex.gif"/>
            </Link>
            <div className="avatar-container">
                <img src="/img/Logo - Pokedex.png" className="avatar"/>
            </div>
        </header>        
    );
};