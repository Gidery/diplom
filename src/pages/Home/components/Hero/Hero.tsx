import React from 'react';
import Title from "antd/lib/typography/Title";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {

    return (
        <div className={styles.Hero}>
            <Title className={styles.Text}>
                Региональный общественный жилищный контроль
            </Title>
        </div>
    );
};

export default Hero