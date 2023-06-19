import React, {useEffect} from 'react';
import {Typography} from "antd";
import styles from './NewsList.module.scss'
import NewsCard from "../../components/NewsCard/NewsCard.tsx";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import {getAllNewsQuery} from "../../../redux/slices/news.ts";
import {Link} from "react-router-dom";

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.auth)
  const {news, status} = useAppSelector(state => state.news)
  const {Title, Text} = Typography
  const newsIsLoading = status === 'loading'

  useEffect(() => {
    dispatch(getAllNewsQuery())
  }, [])

  return (
    <div className={styles.News}>
      <div className={styles.Header}>
        <Title level={3} className={styles.Title}>
          Новости общественного контроля
        </Title>

        {user?.role === 'admin' && <Link to='/news/add'><Text className={styles.Text}>Добавить новость</Text></Link>}
      </div>

      <div className={styles.NewsList}>
        {newsIsLoading ? (
          <Title>Загрузка данных...</Title>
        ) : news.map(({_id, title, text, createdAt, author, viewsCount, imageUrl}) => (
          <NewsCard
            key={_id}
            _id={_id}
            title={title}
            text={text}
            createdAt={createdAt}
            author={author}
            viewsCount={viewsCount}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;