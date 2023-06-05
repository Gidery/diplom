import React from 'react';
import Title from "antd/lib/typography/Title";
import styles from './Reports.module.scss'

const Reports: React.FC = () => {
    return (
        <div className={styles.Reports}>
            <Title level={3} className={styles.Header}>
                Аналитические отчеты
            </Title>

            <div className={styles.Wrapper}>
                <ol type='1' className={styles.List}>
                    <li className={styles.Item}>
                        АНАЛИТИЧЕСКИЙ ОТЧЕТ за отчетный период с 01.11.2018 по 31.01.2019
                    </li>
                    <li className={styles.Item}>
                        АНАЛИТИЧЕСКИЙ ОТЧЕТ за отчетный период с 01.02.2019 по 30.06.2019
                    </li>
                    <li className={styles.Item}>
                        АНАЛИТИЧЕСКИЙ ОТЧЕТ за отчетный период с 01.07.2019 по 30.11.2019
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Reports