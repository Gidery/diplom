import React from 'react';
import {Typography} from 'antd'
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks/reduxHooks.ts";
import {resetAuth} from "../../../../../../../redux/slices/auth.ts";
import styles from './Auth.module.scss'

const Auth: React.FC = () => {
    const dispatch = useAppDispatch()
    const {user, status} = useAppSelector(state => state.auth)
    const {Text} = Typography

    const onResetAuth = () => dispatch(resetAuth())

    return (
        <div className={styles.Auth}>
            {status === 'success' ? <>
                <Text>{`${user.surname} ${user.name}`}</Text>
                <Text className={styles.Link} onClick={onResetAuth}>(выйти)</Text>
            </> : <>
                <Link to='/register'>
                    <Text className={styles.Link}>Регистрация</Text>
                </Link>
                /
                <Link to='/login'>
                    <Text className={styles.Link}>Авторизация</Text>
                </Link>
            </>
            }
        </div>
    );
};

export default Auth