import './App.css';
import { HashRouter, NavLink, Routes, Route, useNavigate, Outlet, useParams, useLocation } from 'react-router-dom';
/*
  React Router 核心三大 Hook 總結：
  1. useNavigate: 命令式跳轉。適合用在「按鈕點擊」後要跑邏輯再切換頁面的情境。
  2. useParams: 抓取網址上的「動態變數」。如 /post/:postId，冒號後面的東西就是變數名。
  3. useLocation: 監聽目前「人在哪裡」。回傳一個物件包含目前完整的 pathname。
  
  巢狀路由 (Nested Routes):
  - 在 Routes 中將 Route 寫在另一個 Route 裡面。
  - 母元件必須使用 <Outlet /> 來預留子元件顯示的位置。
*/
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
const Post = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 邏輯：檢查目前網址是否包含 '/post/post123'，如果包含代表現在是「打開」的狀態
  const isDetailOpen = location.pathname.includes('/post/post123');

  return (
    <div>
      <h3>Post 詳細資料頁面</h3>
      {/* 將連結放在這裡，點擊按鈕後後網址變成 /post/post123，下方的 Outlet 就會顯示 PostId 元件 */}
      {/* 邏輯：如果是打開的(isDetailOpen為真)，點擊就導回 /post (關閉)；否則就導向 /post/post123 (打開) */}
      <button onClick={() => isDetailOpen ? navigate('/post', { replace: true }) : navigate('/post/post123')}>
        {isDetailOpen ? "關閉詳細頁面" : "Post 詳細頁面"}
      </button>
      <Outlet />
    </div>
  );
};
const PostId = () => {
  let { postId } = useParams();
  return <p>Post ID 是 {postId}</p>;
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
          <NavLink to="/post">
            <p>Post 頁面</p>
          </NavLink>
        </div>
        {/* Routes, Route 練習區 */}
        <Routes>
          <Route path="/" element={<p>這是首頁</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/post" element={<Post />}>
            <Route path=":postId" element={<PostId />} />
          </Route>
          {/* 404 路由：當網址找不到對應路徑時顯示 */}
          <Route path="*" element={<p>找不到頁面</p>} />
        </Routes>
        {/* 練習區 */}
      </HashRouter>
    </div>
  );
}

export default App;
