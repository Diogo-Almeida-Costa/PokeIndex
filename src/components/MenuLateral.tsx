import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuLateral: React.FC = () =>
{
    return(
        <aside className="menu-lateral">
            <nav className="menu">
                <NavLink to="/login" className="btn btn-custom-menu-lateral mb-2"> Login </NavLink>
                <NavLink to="/meus-times" className="btn btn-custom-menu-lateral mb-2"> Meus Times </NavLink>
                <NavLink to="/sobre" className="btn btn-custom-menu-lateral mb-2"> Sobre </NavLink>
                <NavLink to="/EscolherPokemons" className="btn btn-custom-menu-lateral mb-2"> Novo time + </NavLink>
                <NavLink to="/Pokedex" className="btn btn-custom-menu-lateral mb-2"> Pokedex </NavLink>
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