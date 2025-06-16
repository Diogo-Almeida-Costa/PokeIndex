import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from './Header';
import {MenuLateral} from './MenuLateral';

export const Layout: React.FC = () =>
{
    return(
        <>
            <Header/>
            <MenuLateral/>
            <main className="ConteudoPrincipal">
                <Outlet/>
            </main>
        </>
    );
};