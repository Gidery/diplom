import React from 'react';
import {Typography} from 'antd'
import styles from './Auth.module.scss'
import {Link} from "react-router-dom";

const Auth: React.FC = () => {
    const { Text } = Typography

    return (
            <div className={styles.Auth}>
                <Link to='/register'>
                    <Text className={styles.Text}>Регистрация</Text>
                </Link>
                /
                <Link to='/login'>
                    <Text className={styles.Text}>Авторизация</Text>
                </Link>
            </div>
    );
};

export default Auth