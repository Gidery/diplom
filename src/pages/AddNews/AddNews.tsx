import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate, Navigate, useParams} from "react-router-dom";
import {Button, Image, Input, notification, Typography} from "antd";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import SimpleMdeReact from "react-simplemde-editor";
import axios from "../../../axios.ts";
import {useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import styles from './AddNews.module.scss'
import 'easymde/dist/easymde.min.css';

interface NewsData {
  title: string,
  text: string,
  imageUrl?: string,
}

const AddNews: React.FC = () => {
  const navigate = useNavigate()
  const [notificationApi, contextHolder] = notification.useNotification();
  const {Title} = Typography
  const {user} = useAppSelector(state => state.auth)

  const inputRef = useRef<HTMLInputElement>(null)
  const [newsData, setNewsData] = useState<NewsData>({
    title: '',
    text: '',
  })
  const onSetNewsData = (field: keyof NewsData, value: NewsData[keyof NewsData]) => setNewsData(prevState => ({
    ...prevState,
    [field]: value
  }))

  const {newsId} = useParams()
  const editMode = Boolean(newsId)

  const openInput = () => inputRef.current?.click()
  const removeImage = () => onSetNewsData('imageUrl', undefined)
  const changeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData()
      const file = e.target.files?.[0]
      if (file === undefined) return
      formData.append('image', file)
      const {data} = await axios.post('/upload', formData)
      onSetNewsData('imageUrl', data.url)
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: 'Ошибка при загрузке изображения',
        description: `${e}`
      })
    }
  }

  const changeNewsTitle = (e: ChangeEvent<HTMLInputElement>) => onSetNewsData('title', e.target.value)
  const changeNewsText = React.useCallback((text: string) => onSetNewsData('text', text), []);

  const isValid = newsData.title.trim().length > 2 && newsData.title.length < 201 && newsData.text.trim().length > 9 && newsData.text.length < 10001
  const addNews = async () => {
    try {
      if (!isValid) return

      const {data} = editMode ?
        await axios.patch(`/news/${newsId}`, newsData) :
        await axios.post('/news', newsData)

      navigate(`/news/${editMode ? newsId : data._id}`)
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: 'Ошибка при создании новости',
        description: `${e}`
      })
    }
  }

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст статьи...',
      status: false,
      autosave: {
        uniqueId: 'autosave MDE news',
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  useEffect(() => {
    if (editMode) {
      try {
        axios.get(`news/${newsId}`).then(({data}) => {
          const {title, text, imageUrl} = data
          setNewsData({title, text, imageUrl})
        })
      } catch (e) {
        console.warn(e)
        notificationApi.error({
          message: 'Ошибка при получении новости',
          description: `${e}`
        })
      }
    }
  }, [])

  return user === null ? (
    <Navigate to='/'/>
  ) : (
    <div className={styles.EditNews}>
      {contextHolder}
      <Title level={3} className={styles.Header}>
        Создание новости
      </Title>

      <div className={styles.Wrapper}>
        <div className={styles.ImageControl}>
          {!newsData.imageUrl ? (
            <>
              <Button icon={<UploadOutlined/>} className={styles.Button} onClick={openInput}>Загрузить
                изображение</Button>
              <input hidden ref={inputRef} type='file' accept='image/*' onChange={changeInput}/>
            </>
          ) : (<>
            <Button danger icon={<DeleteOutlined/>} className={styles.Button} onClick={removeImage}>Удалить
              изображение</Button>
            <Image
              height={400}
              src={newsData.imageUrl}
            />
          </>)}
        </div>

        <Input size="large" placeholder='Введите заголовок статьи...' value={newsData.title}
               onChange={changeNewsTitle}/>
        <SimpleMdeReact options={options} value={newsData.text} onChange={changeNewsText}/>

        <div className={styles.Controls}>
          <Button disabled={!isValid} type='primary'
                  onClick={addNews}>{editMode ? 'Редактировать новость' : 'Создать новость'}</Button>
          <Button danger onClick={() => navigate('/news')}>Отмена</Button>
        </div>
      </div>
    </div>
  );
};

export default AddNews