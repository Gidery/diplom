import React from 'react';
import Title from "antd/lib/typography/Title";
import Icon from "@ant-design/icons";
import Kremlin from "../../../../../public/icons/Kremlin.tsx";
import Navigation from "./components/Navigation/Navigation.tsx";
import {Link} from "react-router-dom";
import styles from './Header.module.scss'
import Auth from "./components/Auth/Auth.tsx";

const Header: React.FC = () => {
    return (
        <header className={styles.Header}>
            <Link to='/'>
                <Icon component={Kremlin}/>
            </Link>
            <div className={styles.HeaderWrapper}>
                <Title className={styles.Title}>
                    Региональный общественный жилищный контроль
                </Title>
                <div className={styles.SecondaryWrapper}>
                    <Navigation/>
                    <Auth/>
                </div>
            </div>
        </header>
    );
};

export default Header;
