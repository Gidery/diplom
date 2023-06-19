import React from 'react';
import {DeleteOutlined} from "@ant-design/icons";
import styles from './FileItem.module.scss'
import {useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import {Popconfirm} from "antd";

interface FileItemProps {
  file: {
    id: string
    name: string,
    url: string,
  }
  onDelete: (fileId: string) => void
}

const FileItem: React.FC<FileItemProps> = ({file, onDelete}) => {
  const {user} = useAppSelector(state => state.auth)
  const {id, name, url} = file

  return (
    <div className={styles.FileItem}>
      <a href={url} download='Obama loh yopta'>
        <div className={styles.FileName}>
          {name}
        </div>
      </a>

      {user?.role === 'admin' && (
        <Popconfirm
          title='Удалить файл'
          description='Вы действительно хотите удалить файл?'
          okText='Да'
          cancelText='Нет'
          onConfirm={() => onDelete(id)}
        >
          <DeleteOutlined className={styles.Icon}/>
        </Popconfirm>
      )}
    </div>
  );
};

export default FileItem