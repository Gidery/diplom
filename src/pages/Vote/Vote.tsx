import React, {useEffect, useState} from 'react';
import {Button, Image, notification, Space, Typography} from "antd";
import {useParams} from "react-router-dom";
import type {Vote} from "../../../redux/slices/votes.ts";
import ReactMarkdown from "react-markdown";
import NewsInfo from "../../components/NewsInfo/NewsInfo.tsx";
import styles from "./Vote.module.scss";
import axios from "../../../axios.ts";
import {useAppSelector} from "../../../redux/hooks/reduxHooks.ts";

const Vote: React.FC = () => {
  const {voteId} = useParams()
  const {Title, Text} = Typography
  const [notificationApi, contextHolder] = notification.useNotification();
  const {user} = useAppSelector(state => state.auth)

  const [voteIsLoading, setVoteIsLoading] = useState(true)
  const [voteData, setVoteData] = useState<Vote>()
  const [optionId, setOptionId] = useState('')

  const alreadyVoted = voteData?.voterIds.includes(user?._id)
  const isValid = user !== null && optionId !== '' && !alreadyVoted

  const onVote = async () => {
    try {
      if (!isValid) return

      const {} = await axios.patch(`/votes/${voteData?._id}/vote`, {optionId})
      const {data} = await axios.get(`/votes/${voteId}`)
      setVoteData(data)

      notificationApi.success({
        message: 'Вы успешно проголосовали',
        description: `${voteData?.options.find(({_id}) => optionId).label}`
      })
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: `Ошибка при получении голосования #${voteId}`,
        description: `${e}`
      })
    }
  }

  useEffect(() => {
    try {
      axios.get(`/votes/${voteId}`).then(({data}) => {
        setVoteData(data)
        setVoteIsLoading(false)
      })
    } catch (e) {
      console.warn(e)
      notificationApi.error({
        message: `Ошибка при получении голосования #${voteId}`,
        description: `${e}`
      })
    }
  }, [])

  if (voteIsLoading) return (
    <Title>Загрузка данных...</Title>
  )

  return voteData === undefined ? (
    <Title>Ошибка при получении данных</Title>
  ) : (
    <div className={styles.News}>
      {contextHolder}
      <div className={styles.ImageWrap}>
        {voteData?.imageUrl !== undefined && (
          <Image
            preview={false}
            width='72rem'
            src={voteData.imageUrl}
          />
        )}
      </div>
      <div className={styles.NewsText}>
        <Title>{voteData.title}</Title>
        <ReactMarkdown className={styles.Text}>{voteData.text}</ReactMarkdown>

        <Space direction='vertical' className={styles.Options}>
          {voteData.options.map(({_id, label, votesNumber}) => (
            <div
              key={_id}
              style={_id === optionId ? {borderColor: '#DF3B09'} : undefined}
              className={styles.OptionItem}
              onClick={!alreadyVoted ? () => setOptionId(_id === optionId ? '' : _id) : undefined}
            >
              <Text>
                {label}
              </Text>
              <Text className={styles.Votes}>{`${votesNumber} голосов`}</Text>
            </div>
          ))}
          {alreadyVoted ? <Text>Вы уже проголосовали</Text> :
            <Button disabled={!isValid} onClick={onVote}>Оставить голос</Button>}
        </Space>

        <NewsInfo author={voteData.author} createdAt={voteData.createdAt} viewsCount={voteData.viewsCount}/>
      </div>
    </div>
  );
};

export default Vote;