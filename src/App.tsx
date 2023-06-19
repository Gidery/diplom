import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Reports from "./pages/Reports/Reports.tsx";
import VotesList from "./pages/VotesList/VotesList.tsx";
import Home from "./pages/Home/Home.tsx";
import NewsList from "./pages/NewsList/NewsList.tsx";
import Docs from "./pages/Docs/Docs.tsx";
import Tos from "./pages/Tos/Tos.tsx";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import News from "./pages/News/News.tsx";
import AddNews from "./pages/AddNews/AddNews.tsx";
import Vote from "./pages/Vote/Vote.tsx";
import AddVote from "./pages/AddVote/AddVote.tsx";
import styles from './App.module.scss'
import 'dayjs/locale/ru.js'

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='news' element={<NewsList/>}/>
          <Route path='news/:newsId' element={<News/>}/>
          <Route path='news/:newsId/edit' element={<AddNews/>}/>
          <Route path='news/add' element={<AddNews/>}/>
          <Route path='docs' element={<Docs/>}/>
          <Route path='votes' element={<VotesList/>}/>
          <Route path='votes/:voteId' element={<Vote/>}/>
          <Route path='votes/add' element={<AddVote/>}/>
          <Route path='tos' element={<Tos/>}/>
          <Route path='reports' element={<Reports/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
