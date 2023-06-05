import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Reports from "./pages/Reports/Reports.tsx";
import Votes from "./pages/Votes/Votes.tsx";
import Home from "./pages/Home/Home.tsx";
import News from "./pages/News/News.tsx";
import Docs from "./pages/Docs/Docs.tsx";
import Tos from "./pages/Tos/Tos.tsx";
import styles from './App.module.scss'
import Register from "./pages/Register/Register.tsx";

function App() {
  return (
      <div className={styles.App}>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home/>} />
                  <Route path='register' element={<Register/>}/>
                  <Route path='login' element={<Register/>}/>
                  <Route path='news' element={<News/>} />
                  <Route path='docs' element={<Docs/>} />
                  <Route path='votes' element={<Votes/>} />
                  <Route path='tos' element={<Tos/>} />
                  <Route path='reports' element={<Reports/>} />
              </Route>
          </Routes>
      </div>
  )
}

export default App
