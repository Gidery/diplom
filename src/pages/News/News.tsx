import React from 'react';
import Title from "antd/lib/typography/Title";
import styles from './News.module.scss'
import NewsCard from "../../components/NewsCard/NewsCard.tsx";

const News: React.FC = () => {
    return (
        <div className={styles.News}>
            <Title level={3} className={styles.Header}>
               Новости общественного контроля
            </Title>

            <div className={styles.NewsList}>

                <NewsCard
                    imgHref='/public/news/new2.jpeg'
                    title='Поздравление с Днем Великой Победы!'
                    text='1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области. 1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области. 1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области. 1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области.'
                />

                <NewsCard
                    imgHref='/public/news/news1.jpg'
                    title='В Ростове прошел гала-концерт «Российская студенческая весна» -2023'
                    text='1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области. 1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области. 1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области. 1 февраля 2019 года в г. Новочеркасске, на площадке Общественной палаты города, было организовано и проведено выездное рабочее совещание Общественной палаты Ростовской области с целью проведения мониторинга исполнения рекомендаций, направленных в сентябре 2018 года в адрес органов местного самоуправления в рамках работы по созданию и обеспечению эффективного функционирования территориального общественного самоуправления (ТОС) на территории Ростовской области.'
                />

            </div>
        </div>
    );
};

export default News;