import React, {ChangeEvent, useMemo, useRef, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {Button, Image, Input, notification, Typography, Space} from "antd";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import SimpleMdeReact from "react-simplemde-editor";
import axios from "../../../axios.ts";
import {Option} from "../../../redux/slices/votes.ts";
import styles from './AddVote.module.scss'
import 'easymde/dist/easymde.min.css';
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";

interface VoteData {
  title: string,
  text: string,
  imageUrl?: string,
  options: Omit<Option, 'votesNumber'>[]
}

const AddVote: React.FC = () => {
  const navigate = useNavigate()
  const [notificationApi, contextHolder] = notification.useNotification();
  const {Title, Text} = Typography
  const {user} = useAppSelector(state => state.auth)

  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [voteData, setVoteData] = useState<VoteData>({
    title: '',
    text: '',
    options: []
  })
  const onSetVoteData = (field: keyof VoteData, value: VoteData[keyof VoteData]) => setVoteData(prevState => ({
    ...prevState,
    [field]: value
  }))

  console.log('voteData', voteData)

  const openInput = () => inputRef.current?.click()
  const removeImage = () => onSetVoteData('imageUrl', undefined)
  const changeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData()
      const file = e.target.files?.[0]
      if (file === undefined) return
      formData.append('image', file)
      const {data} = await axios.post('/upload', formData)
      onSetVoteData('imageUrl', data.url)
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: 'Ошибка при загрузке изображения',
        description: `${e}`
      })
    }
  }

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => onSetVoteData('title', e.target.value)
  const changeText = React.useCallback((text: string) => onSetVoteData('text', text), []);
  const addOption = () => {
    onSetVoteData('options', [...voteData.options, {_id: String(dayjs().unix()), label: inputValue}])
    setInputValue('')
  }

  const isValid = voteData.title.trim().length > 2 && voteData.title.length < 201 && voteData.text.trim().length > 9 && voteData.text.length < 10001 && voteData.options.length > 0 && voteData.options.length < 6
  const addVote = async () => {
    try {
      if (!isValid) return
      const createRbo = {
        ...voteData,
        options: voteData.options.map(({label}) => ({label}))
      }
      const {data} = await axios.post('/votes', createRbo)
      navigate(`/votes/${data._id}`)
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: 'Ошибка при создании голосования',
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
        uniqueId: 'autosave MDE vote',
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return user === null ? (
    <Navigate to='/'/>
  ) : (
    <div className={styles.AddVote}>
      {contextHolder}
      <Title level={3} className={styles.Header}>
        Создание голосования
      </Title>

      <div className={styles.Wrapper}>
        <div className={styles.ImageControl}>
          {!voteData.imageUrl ? (
            <>
              <Button icon={<UploadOutlined/>} className={styles.Button} onClick={openInput}>
                Загрузить
                изображение
              </Button>
              <input hidden ref={inputRef} type='file' accept='image/*' onChange={changeInput}/>
            </>
          ) : (<>
            <Button danger icon={<DeleteOutlined/>} className={styles.Button} onClick={removeImage}>Удалить
              изображение</Button>
            <Image
              height={400}
              src={voteData.imageUrl}
            />
          </>)}
        </div>

        <Input size="large" placeholder='Введите заголовок статьи...' value={voteData.title} onChange={changeTitle}/>
        <SimpleMdeReact options={options} value={voteData.text} onChange={changeText}/>

        <Space direction='vertical' className={styles.Options}>
          {voteData.options.map(({_id, label}) => (
            <div key={_id} className={styles.OptionItem}>
              <Text>{label}</Text>
              <Button icon={<DeleteOutlined/>} onClick={() => {
                onSetVoteData('options', voteData.options.filter(item => item._id !== _id))
              }}/>
            </div>
          ))}
          <Space.Compact block>
            <TextArea
              disabled={!(voteData.options.length < 5)}
              value={inputValue}
              placeholder='Добавьте название опции'
              autoSize={{maxRows: 4}}
              style={{maxWidth: '40rem'}}
              onChange={(e) => setInputValue(e.target.value)}/>
            <Button disabled={!(voteData.options.length < 5)} onClick={addOption}>Добавить опцию голосования</Button>
          </Space.Compact>
        </Space>

        <div className={styles.Controls}>
          <Button disabled={!isValid} type='primary' onClick={addVote}>Создать голосование</Button>
          <Button danger onClick={() => navigate('/votes')}>Отмена</Button>
        </div>
      </div>
    </div>
  );
};

export default AddVote