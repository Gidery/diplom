import React from 'react';
import styles from "./NewsCard.module.scss";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";

interface NewsCardProps {
    imgHref: string
    title: string
    text: string
}

const NewsCard: React.FC<NewsCardProps> = ({imgHref, title, text}) => {
    return (
        <div className={styles.NewsCard}>
            <img width={300} src={imgHref}/>
            <div>
                <Title level={3} className={styles.Title}>{title}</Title>

                <Paragraph ellipsis={{ rows: 6 }}>
                    {text}
                </Paragraph>
            </div>
        </div>
    );
};

export default NewsCard;