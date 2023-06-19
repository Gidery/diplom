import React, {useState} from 'react';
import {Typography} from "antd";
import {useAppSelector} from "../../../redux/hooks/reduxHooks.ts";
import FileItem from "../../components/FileItem/FileItem.tsx";
import styles from './Reports.module.scss'

const Reports: React.FC = () => {
  const {user} = useAppSelector(state => state.auth)

  const {Title, Text} = Typography
  const [fileList, setFileList] = useState([
      {
        id: "0",
        name: 'АНАЛИТИЧЕСКИЙ ОТЧЕТ за отчетный период с 01.11.2018 по 31.01.2019',
        url: 'http://op-don.ru/publiccontrol/normpravdoc/profkodeks.doc'
      },
      {
        id: "1",
        name: 'АНАЛИТИЧЕСКИЙ ОТЧЕТ за отчетный период с 01.02.2019 по 30.06.2019',
        url: 'http://op-don.ru/publiccontrol/normpravdoc/profkodeks.doc'
      },
      {
        id: "2",
        name: 'АНАЛИТИЧЕСКИЙ ОТЧЕТ за отчетный период с 01.07.2019 по 30.11.2019',
        url: 'http://op-don.ru/publiccontrol/normpravdoc/profkodeks.doc'
      }
    ]
  )

  const deleteFile = (fileId: string) => setFileList(prevState => prevState.filter(({id}) => id !== fileId ))

  return (
        <div className={styles.Reports}>
          <div className={styles.Header}>
            <Title level={3} className={styles.Title}>
              Аналитические отчеты
            </Title>

            {user?.role === 'admin' && <Text className={styles.Text}>Добавить документ</Text>}
          </div>

            <div className={styles.Wrapper}>
                <ol type='1' className={styles.List}>
                  {fileList.map(file => (
                    <li>
                      <FileItem file={file} onDelete={deleteFile}/>
                    </li>
                  ))}
                </ol>
            </div>
        </div>
    );
};

export default Reports