import React, {ChangeEvent, useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {Button, Input, Typography} from "antd";
import {registerQuery, RegisterRbo} from "../../../redux/slices/auth.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import styles from './Register.module.scss'

const Register: React.FC = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.auth)
    const {Title, Text} = Typography

    const [rbo, setRbo] = useState<RegisterRbo>({
        name: '',
        surname: '',
        passportData: {
            series: '',
            number: ''
        },
        actualAddress: '',
        email: '',
        password: ''
    })

    const checkAvailability = () => {
        let result = true
        for (const field in rbo) {
            if (field === 'passportData') break
            if (rbo[field as keyof RegisterRbo] == '') result = false
        }
        return result
    }
    const isValid = checkAvailability() && rbo.passportData?.number !== undefined && rbo.passportData?.number.length === 6
        && rbo.passportData?.series !== undefined && rbo.passportData?.series.length === 4 && RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g).test(rbo.email)
        && (rbo.password?.length ?? 0) > 4

    const onRegister = () => {
        if (!isValid) return
        dispatch(registerQuery(rbo))
    }

    const onSetRbo = (field: keyof Omit<RegisterRbo, 'passportData'>, value: string) => setRbo((prevState) => ({
        ...prevState,
        [field]: value
    }))
    const onSetPassportData = (field: keyof RegisterRbo["passportData"], value: string) => {
        const maxLength = field === 'series' ? 4 : 6
        if (Number.isNaN(Number(value)) || value.length > maxLength) return

        setRbo((prevState) => ({
            ...prevState,
            passportData: {
                ...prevState.passportData,
                [field]: value,
            }
        }))
    }

    return auth.status === 'success' ?
        <Navigate to='/'/> : (
            <div className={styles.Docs}>
                <Title level={3} className={styles.Header}>Регистрация</Title>

                <div className={styles.Main}>
                    <div className={styles.Form}>
                        <Text className={styles.Title}>Имя:</Text>
                        <Input value={rbo.name} className={styles.Input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('name', e.target.value)}/>

                        <Text className={styles.Title}>Фамилия:</Text>
                        <Input value={rbo.surname} className={styles.Input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('surname', e.target.value)}/>

                        <Text className={styles.Title}>Серия и номер паспорта:</Text>
                        <div className={styles.PassportInputs}>
                            <Input value={rbo.passportData.series}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => onSetPassportData('series', e.target.value)}/>
                            <Input value={rbo.passportData.number}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => onSetPassportData('number', e.target.value)}/>
                        </div>

                        <Text className={styles.Title}>Адрес фактического проживания:</Text>
                        <Input value={rbo.actualAddress} className={styles.Input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('actualAddress', e.target.value)}/>

                        <Text className={styles.Title}>E-mail:</Text>
                        <Input value={rbo.email} className={styles.Input}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('email', e.target.value)}/>

                        <Text className={styles.Title}>Пароль:</Text>
                        <Input.Password value={rbo.password} className={styles.Input}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => onSetRbo('password', e.target.value)}/>
                    </div>

                    <div className={styles.Buttons}>
                        <Link to='/login'>
                            <Text className={styles.Link}>Авторизация</Text>
                        </Link>
                        <Button disabled={!isValid} onClick={onRegister}>Зарегистрироваться</Button>
                    </div>

                </div>
            </div>
        );
};

export default Register