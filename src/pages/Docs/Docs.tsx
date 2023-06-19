import React, {ChangeEvent, useRef, useState} from 'react';
import {Typography} from "antd";
import styles from './Docs.module.scss'
import FileItem from "../../components/FileItem/FileItem.tsx";
import {useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import dayjs from "dayjs";


const Docs: React.FC = () => {
  const {user} = useAppSelector(state => state.auth)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileUrl = 'http://op-don.ru/publiccontrol/normpravdoc/profkodeks.doc'

  const {Title, Text} = Typography
  const [fileList, setFileList] = useState([
      {
        id: "0",
        name: 'Указ Президента РФ от 07.05.2012г. №600',
        url: fileUrl
      },
      {
        id: "1",
        name: 'ПРОФЕССИОНАЛЬНО-ЭТИЧЕСКИЙ КОДЕКС общественного жилищного инспектора',
        url: fileUrl
      },
      {
        id: "3",
        name: 'Методические рекомендации о порядке осуществления общественного жилищного контроля общественными жилищными инспекторами',
        url: fileUrl
      },
      {
        id: "4",
        name: 'Постановление Правительства РФ от 26.12.2016 N 1491 "О порядке осуществления общественного жилищного контроля" ',
        url: fileUrl
      },
      {
        id: "5",
        name: 'Запрос о привлечении для проведения общественной проверки',
        url: fileUrl
      },
    ]
  )

  const clickInput = () => inputRef.current?.click()

  const deleteFile = (fileId: string) => setFileList(prevState => prevState.filter(({id}) => id !== fileId ))
  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file === undefined || inputRef.current === undefined) return

    setFileList(prevState => ([
      ...prevState,
      {
        id: String( dayjs().unix()),
        name: file.name,
        url: fileUrl
      }
    ]))

    inputRef.current.value = ''
  }

  return (
    <div className={styles.Docs}>
      <div className={styles.Header}>
        <Title level={3} className={styles.Title}>
          Нормативно-правовые документы
        </Title>

        {user?.role === 'admin' && <Text className={styles.Text} onClick={clickInput}>Добавить документ</Text>}
      </div>

      <div className={styles.Wrapper}>
        <input hidden ref={inputRef} type='file' onChange={changeFile}/>
        <ol type='1' className={styles.List}>
          {fileList.map(file => (
            <li key={file.id}>
              <FileItem file={file} onDelete={deleteFile}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Docs