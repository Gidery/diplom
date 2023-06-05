import React from 'react';
import Navigation from "../Header/components/Navigation/Navigation.tsx";
import Title from "antd/lib/typography/Title";
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
    return (
        <footer className={styles.Footer}>
            <div style={{width: "100%"}}>
                <Navigation/>
            </div>

            <div className={styles.ContactInfo}>
                <Title level={4} className={styles.Text}>
                    © Региональный общественный жилищный контроль
                </Title>

                <Title level={4} className={styles.Text}>
                    344002, г.Ростов-на-Дону, ул.Московская 51/15
                </Title>

                <Title level={4} className={styles.Text}>
                    8 (863) 269-89-43
                </Title>
            </div>
        </footer>
    );
};

export default Footer;