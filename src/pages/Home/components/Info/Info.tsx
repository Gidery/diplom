import React from 'react';
import {NotificationFilled} from "@ant-design/icons";
import {Typography} from 'antd'
import styles from './Info.module.scss'

const Info: React.FC = () => {
    const { Text } = Typography

    return (
        <div className={styles.Info}>
                <div className={styles.InfoItem}>
                    <div className={styles.IconWrap}>
                        <NotificationFilled className={styles.Icon}/>
                    </div>
                    <div className={styles.TextWrapper}>
                        <Text strong className={styles.Title}>
                            Освещение новостей
                        </Text>
                        <Text>
                            Информация о мероприятиях для некомерческих организаций и гражданских активиситов
                        </Text>
                    </div>
                </div>

                <div className={styles.InfoItem}>
                    <div className={styles.IconWrap}>
                        <NotificationFilled className={styles.Icon}/>
                    </div>
                    <div className={styles.TextWrapper}>
                        <Text strong className={styles.Title}>
                            Освещение новостей
                        </Text>
                        <Text>
                            Информация о мероприятиях для некомерческих организаций и гражданских активиситов
                        </Text>
                    </div>
                </div>

                <div className={styles.InfoItem}>
                    <div className={styles.IconWrap}>
                        <NotificationFilled className={styles.Icon}/>
                    </div>
                    <div className={styles.TextWrapper}>
                        <Text strong className={styles.Title}>
                            Освещение новостей
                        </Text>
                        <Text>
                            Информация о мероприятиях для некомерческих организаций и гражданских активиситов
                        </Text>
                    </div>
                </div>
            </div>
    );
};

export default Info