import React from 'react';
import dayjs from "dayjs";
import {Typography} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {Author} from "../../../redux/slices/news.ts";
import styles from "./NewsInfo.module.scss";

interface NewsInfoProps {
  createdAt: string,
  author: Author,
  viewsCount: number
}

const NewsInfo: React.FC<NewsInfoProps> = ({createdAt, author, viewsCount }) => {
  const { Text} = Typography

  return (
    <div className={styles.NewsInfo}>
      <div className={styles.InfoWrap}>
        <Text>{dayjs(createdAt).locale('ru').format('D MMMM YYYY г.')}</Text>
        <Text>{`${author.surname} ${author.name}`}</Text>
      </div>

      <div className={styles.InfoWrap}>
        <EyeOutlined/>
        <Text>{viewsCount}</Text>
      </div>
    </div>
  );
};

export default NewsInfo;