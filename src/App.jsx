import './App.css';
import { HashRouter, NavLink, Routes, Route, useNavigate } from 'react-router-dom';

// useNavigate 這個 Hook，useNavigate() 可以用在路由的切換，舉例像是進入到個人資訊頁面會先檢查是否有登入，沒有登入的話就會導回 /login。
const Logout = () => {
  const navigate = useNavigate();
  /*
  按下登出按鈕後，導回navigate('/login')，頁面
  使用 replace 屬性：在登出或登入的場景，有時候我們不希望使用者點擊瀏覽器的「上一頁」又回到剛才的頁面
  原本：[首頁] -> [Login] -> [Todo]
  執行後：[首頁] -> [Login] -> [Todo] -> [Login]（清單變長了）
  使用replace 屬性
  原本：[首頁] -> [Login] -> [Todo]
  執行後：[首頁] -> [Login] -> [Login]（（最後一張 Todo 被抽換成 Login 了）
  */
  return <button onClick={() => navigate('/login', { replace: true })}>登出</button>;
};

const Todo = () => {
  return (
    <>
      <p>這是 Todo 頁面</p>
      <Logout />
    </>
  );
};
const Login = () => {
  return <p>這是登入頁面</p>;
};
const Register = () => {
  return <p>這是註冊頁面</p>;
};

function App() {
  return (
    <div className="container">
      <HashRouter>
        <div className="nav-link">
          <NavLink to="/">
            <p>回到首頁</p>
          </NavLink>
          <NavLink to="/register">
            <p>註冊頁面</p>
          </NavLink>
          <NavLink to="/login">
            <p>登入頁面</p>
          </NavLink>
          <NavLink to="/todo">
            <p>Todo 頁面</p>
          </NavLink>
        </div>
        {/* Routes, Route 練習區 */}
        <Routes>
          <Route path="/" element={<p>這是首頁</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          {/* 404 路由：當網址找不到對應路徑時顯示 */}
          <Route path="*" element={<p>找不到頁面</p>} />
        </Routes>
        {/* 練習區 */}
      </HashRouter>
    </div>
  );
}

export default App;
