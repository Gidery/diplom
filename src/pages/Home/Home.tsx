import React, {useEffect, useState} from "react";
import Info from "./components/Info/Info.tsx";
import Hero from "./components/Hero/Hero.tsx";
import {notification, Typography} from "antd";
import styles from './Home.module.scss'
import NewsCard from "../../components/NewsCard/NewsCard.tsx";
import {Link} from "react-router-dom";
import {News} from "../../../redux/slices/news.ts";
import axios from "../../../axios.ts";

const Home: React.FC = () => {
  const {Text, Title} = Typography
  const [notificationApi, contextProvider] = notification.useNotification();
  const [popularNews, setPopularNews] = useState<[News, News] | null>(null)

  useEffect(() => {
    try {
      axios.get('popular-news').then(({data}) => setPopularNews(data))
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: 'Ошибка при получении популярных новостей',
        description: `${e}`
      })
    }
  }, [])

  return (
    <div className={styles.Home}>
      {contextProvider}
      <Hero/>
      <Info/>

      <div className={styles.ActualNews}>
        <div className={styles.Header}>
          <Text strong className={styles.Title}>АКТУАЛЬНЫЕ НОВОСТИ</Text>
          <Link to='/news'>
            <Text className={styles.Link}>Читать все новости</Text>
          </Link>
        </div>

        <div className={styles.Main}>
          {popularNews === null ? (
            <Title>Загрузка данных...</Title>
          ) : popularNews.map(({_id, title, text, author, createdAt, viewsCount, imageUrl}) => (
            <NewsCard
              _id={_id}
              title={title}
              text={text}
              author={author}
              createdAt={createdAt}
              viewsCount={viewsCount}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </div>

      <div className={styles.ActualNews}>
        <div className={styles.Header}>
          <Text strong className={styles.Title}>ЧЛЕНЫ ОБЩЕСТВЕННОЙ ПАЛАТЫ</Text>
        </div>

        <div className={styles.Main}>
          <div className={styles.Peoples}>
            <div className={styles.PeopleCard}>
              <img width={200} height={200} src='/public/img/people/peope1.jpg'/>
              <Text strong className={styles.Name}>Васильева Василиса Витальевна</Text>
              <Text className={styles.Text}>
                Председатель регионального общественного жилищного контроля
              </Text>
            </div>

            <div className={styles.PeopleCard}>
              <img width={200} height={200} src='/public/img/people/people2.jpg'/>
              <Text strong className={styles.Name}>Васильева Василиса Витальевна</Text>
              <Text className={styles.Text}>
                Председатель регионального общественного жилищного контроля
              </Text>
            </div>

            <div className={styles.PeopleCard}>
              <img width={200} height={200} src='/public/img/people/people3.jpg'/>
              <Text strong className={styles.Name}>Васильева Василиса Витальевна</Text>
              <Text className={styles.Text}>
                Председатель регионального общественного жилищного контроля
              </Text>
            </div>

            <div className={styles.PeopleCard}>
              <img width={200} height={200} src='/public/img/people/people4.jpg'/>
              <Text strong className={styles.Name}>Васильева Василиса Витальевна</Text>
              <Text className={styles.Text}>
                Председатель регионального общественного жилищного контроля
              </Text>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;