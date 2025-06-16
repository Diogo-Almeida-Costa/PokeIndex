import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuLateral: React.FC = () =>
{
    return(
        <aside className="menu-lateral">
            <nav className="menu">
                <NavLink to="/login"> Login </NavLink>
                <NavLink to="/meus-times"> Meus Times </NavLink>
                <NavLink to="/sobre"> Sobre </NavLink>
                <NavLink to="/pokedex"> Pokedex </NavLink>
                <NavLink to="/escolher-pokemon"> Selecionar time </NavLink>
            </nav>
            <div className="pokemon-img mt-auto">
                <img src="/img/bulbasaur - durp.png"/>
            </div>
            <div className="joystick-area">
                <img src="/img/joystick.png"/>
            </div>
        </aside>
    );
};