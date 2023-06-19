import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import {Typography} from "antd";
import styles from './VotesList.module.scss'
import VoteCard from "../../components/VoteCard/VoteCard.tsx"
import {getAllVotesQuery} from "../../../redux/slices/votes.ts";
import {Link} from "react-router-dom";

const VotesList: React.FC = () => {
  const dispatch = useAppDispatch()
  const {user} = useAppSelector(state => state.auth)
  const {votes, status} = useAppSelector(state => state.votes)
  const {Title, Text} = Typography

  useEffect(() => {
    dispatch(getAllVotesQuery())
  }, [])

  return (
    <div className={styles.Votes}>
      <div className={styles.Header}>
        <Title level={3} className={styles.Title}>
          Текущие голосования
        </Title>

        {user?.role === 'admin' && <Link to='/votes/add'><Text className={styles.Text}>Добавить голосование</Text></Link>}
      </div>

      <div className={styles.NewsList}>
        {
          status === 'loading' ? (
            <Title>Загрузка данных...</Title>
          ) : votes.map(({_id, title, text, createdAt, author, viewsCount, options, voterIds, imageUrl,}) => (
            <VoteCard
              key={_id}
              _id={_id}
              title={title}
              text={text}
              createdAt={createdAt}
              author={author}
              viewsCount={viewsCount}
              imageUrl={imageUrl}
              options={options}
              voterIds={voterIds}
            />
          ))
        }
      </div>
    </div>
  );
};

export default VotesList;