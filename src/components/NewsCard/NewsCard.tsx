import React from 'react';
import {Popconfirm, Typography} from 'antd'
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import NewsInfo from "../NewsInfo/NewsInfo.tsx";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import {News, removeNewsQuery} from "../../../redux/slices/news.ts";
import styles from "./NewsCard.module.scss";
import ReactMarkdown from "react-markdown";

const NewsCard: React.FC<News> = ({_id, imageUrl, title, text, createdAt, author, viewsCount }) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const { Title} = Typography

    const onDeleteNews = async () => dispatch(removeNewsQuery(_id))
    return (
        <div className={styles.NewsCard}>
            {imageUrl && (
              <img width={300} src={imageUrl}/>
            )}
            <div className={styles.TextWrap}>
                <div className={styles.Header}>
                    <Link to={`/news/${_id}`}>
                        <Title level={3} className={styles.Title}>{title}</Title>
                    </Link>

                    {user?.role === 'admin' && (
                        <div className={styles.Controls}>
                            <Link to={`/news/${_id}/edit`}><EditOutlined/></Link>
                            <Popconfirm
                                title='Удалить новость'
                                description='Вы уверены, что хотите удалить эту новость?'
                                okText="Да"
                                cancelText="Нет"
                                onConfirm={onDeleteNews}
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
    );
};

export default NewsCard;