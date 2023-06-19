import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Image, notification, Typography} from "antd";
import NewsInfo from "../../components/NewsInfo/NewsInfo.tsx";
import axios from "../../../axios.ts";
import { News as NewsType } from "../../../redux/slices/news.ts";
import styles from './News.module.scss'
import ReactMarkdown from "react-markdown";

const News: React.FC = () => {
  const {Title} = Typography
  const {newsId} = useParams()
  const [notificationApi, contextProvider] = notification.useNotification();

  const [newsIsLoading, setNewsIsLoading] = useState(true)
  const [newsData, setNewsData] = useState<NewsType>()

  useEffect(() => {
    try {
      axios.get(`/news/${newsId}`).then(({data}) => {
        console.log(data)
        setNewsData(data)
        setNewsIsLoading(false)
      })
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: `Ошибка при получении новости #${newsId}`,
        description: `${e}`
      })
    }
  }, [])

  if (newsIsLoading) return (
    <Title>Загрузка данных...</Title>
  )

  return newsData === undefined ? (
    <Title>Ошибка при получении данных</Title>
  ) : (
    <div className={styles.News}>
      {contextProvider}
      <div className={styles.ImageWrap}>
        {newsData?.imageUrl !== undefined && (
          <Image
            preview={false}
            width='72rem'
            src={newsData.imageUrl}
          />
        )}
      </div>
      <div className={styles.NewsText}>
        <Title className={styles.Title}>{newsData.title}</Title>
        <ReactMarkdown className={styles.Text}>{newsData.text}</ReactMarkdown>
        <NewsInfo author={newsData.author} createdAt={newsData.createdAt} viewsCount={newsData.viewsCount}/>
      </div>
    </div>
  );
};

export default News