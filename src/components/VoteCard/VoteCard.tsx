import React from 'react';
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Popconfirm, Space, Typography} from "antd";
import NewsInfo from "../NewsInfo/NewsInfo.tsx";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import {removeVoteQuery, Vote} from "../../../redux/slices/votes.ts";
import styles from "./VoteCard.module.scss";
import ReactMarkdown from "react-markdown";

const VoteCard: React.FC<Vote> = ({_id, imageUrl, title, text, author, createdAt, viewsCount, options}) => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.auth)
  const {  Title, Text} = Typography
  const onDeleteVote = () => dispatch(removeVoteQuery(_id))

  return (
    <div className={styles.VoteCard}>
      <div className={styles.VotesContent}>
        {imageUrl && (
          <img width={300} src={imageUrl}/>
        )}
        <div className={styles.TextWrap}>
          <div className={styles.Header}>
            <Link to={`/votes/${_id}`}>
              <Title level={3} className={styles.Title}>{title}</Title>
            </Link>

            {user?.role === 'admin' && (
              <div className={styles.Controls}>
                <EditOutlined/>
                <Popconfirm
                  title='Удалить голосование'
                  description='Вы уверены, что хотите удалить это голосование?'
                  okText="Да"
                  cancelText="Нет"
                  onConfirm={onDeleteVote}
                >
                  <DeleteOutlined/>
                </Popconfirm>
              </div>
            )}
          </div>

          <div className={styles.Paragraph}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>

          <NewsInfo author={author} viewsCount={viewsCount} createdAt={createdAt}/>
        </div>
      </div>

      <Space style={{width: '100%'}} direction='vertical'>
        <Text strong underline >Варианты:</Text>
        {options.map(({_id, label, votesNumber}) => (
          <div
            key={_id}
            className={styles.OptionItem}
          >
            <Text>
              {label}
            </Text>
            <Text className={styles.Votes}>{`${votesNumber} голосов`}</Text>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default VoteCard