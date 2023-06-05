import React from 'react';
import {NavLink} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import styles from './Navigation.module.scss'

interface NavParams {
path: string, label: string
}

const Navigation: React.FC = () => {
    const changeActiveStyle = ({ isActive }: {isActive: boolean}) => ({color: isActive ? '#DF3B09' : '#898989'})

    const navParams: NavParams[]  = [
        {
            path: 'news',
            label: 'Новости'
        },
        {
            path: 'docs',
            label: 'Нормативно-правовые документы'
        },
        {
            path: 'votes',
            label: 'Голосования'
        },
        {
            path: 'tos',
            label: 'ТОС'
        },
        {
            path: 'reports',
            label: 'Отчеты'
        },
    ]

    return (
        <div className={styles.Navigation}>
            {navParams.map(({path, label}) => (
                <NavLink to={path} style={changeActiveStyle}>
                    <Title level={4} className={styles.Text} >{label}</Title>
                </NavLink>
            ))}

        </div>
    );
};

export default Navigation;