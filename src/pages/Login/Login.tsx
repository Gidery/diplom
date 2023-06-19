import React, {ChangeEvent, useState} from 'react';
import {Button, Input, Typography} from "antd";
import {Link, Navigate} from "react-router-dom";
import {loginQuery, LoginRbo} from "../../../redux/slices/auth.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import styles from './Login.module.scss'

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth)
    const {Title, Text} = Typography

    const [rbo, setRbo] = useState<LoginRbo>({
        email: '',
        password: ''
    })
    const isValid = RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g).test(rbo.email) && (rbo.password?.length ?? 0) > 4

    const onLogin = () => {
        if (!isValid) return;
        dispatch(loginQuery(rbo))
    }

    const onSetRbo = (field: keyof LoginRbo, value: string) => setRbo((prevState) => ({
        ...prevState,
        [field]: value
    }))

    return auth.status === 'success' ?
        <Navigate to='/'/> : (
            <div className={styles.Docs}>
                <Title level={3} className={styles.Header}>Авторизация</Title>

                <div className={styles.Main}>
                    <div className={styles.Form}>
                        <Text className={styles.Title}>E-mail:</Text>
                        <Input value={rbo.email} className={styles.Input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('email', e.target.value)}/>

                        <Text className={styles.Title}>Пароль:</Text>
                        <Input.Password value={rbo.password} className={styles.Input}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('password', e.target.value)}/>
                    </div>

                    <div className={styles.Buttons}>
                        <Link to='/register'>
                            <Text className={styles.Link}>Регистрация</Text>
                        </Link>
                        <Button disabled={!isValid} onClick={onLogin}>Авторизоваться</Button>
                    </div>
                </div>
            </div>
        );
};

export default Login