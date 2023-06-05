import React from 'react';
import { Typography } from "antd";
import styles from './Docs.module.scss'


const Docs: React.FC = () => {
    const { Title } = Typography

    return (
        <div className={styles.Docs}>
            <Title level={3} className={styles.Header}>
                Нормативно-правовые документы
            </Title>

            <div className={styles.Wrapper}>
                <ol type='1' className={styles.List}>
                    <li className={styles.Item}>
                        Указ Президента РФ от 07.05.2012г. №600
                    </li>
                    <li className={styles.Item}>
                        ПРОФЕССИОНАЛЬНО-ЭТИЧЕСКИЙ КОДЕКС общественного жилищного инспектора
                    </li>
                    <li className={styles.Item}>
                        ПОЛОЖЕНИЕ об организации деятельности общественных жилищных инспекторов на территории Ростовской области
                    </li>
                    <li className={styles.Item}>
                        Методические рекомендации о порядке осуществления общественного жилищного контроля в форме общественных проверок общественными жилищными инспекторами (экспертами) Рабочей группы Общественной палаты Ростовской области по общественному жилищному контролю
                    </li>
                    <li className={styles.Item}>
                        Постановление Правительства РФ от 26.12.2016 N 1491 "О порядке осуществления общественного жилищного контроля" (вместе с "Правилами осуществления общественного жилищного контроля")
                    </li>
                    <li className={styles.Item}>
                        Запрос о привлечении для проведения общественной проверки
                    </li>
                    <li className={styles.Item}>
                        Запрос о привлечении для проведения общественной экспертизы
                    </li>
                </ol>
            </div>

        </div>
    );
};

export default Docs