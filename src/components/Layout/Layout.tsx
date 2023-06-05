import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import styles from './Layout.module.scss'

const Layout: React.FC = () => {
    return (
        <div className={styles.Layout}>
            <Header/>
            <main className={styles.Main}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;