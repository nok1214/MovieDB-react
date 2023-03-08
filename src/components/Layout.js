import { Outlet, Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Menu } from "semantic-ui-react";

export default function Layout({ isLogin, user, setIsLogin, setUser }) {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    setUser(false);
  };

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      return;
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <Menu>
        <Menu.Item>
          <Link to='/' onClick={handleHomeClick}>
            HOME
          </Link>
        </Menu.Item>
        {isLogin && (
          <>
            <Menu.Item>
              <Link to='/favorite'>FAVORITE</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/rated'>RATED</Link>
            </Menu.Item>
            <Menu.Item position='right'>
              <span>welcome, {user.username}</span>
              <Button variant='contained' onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          </>
        )}
        {!isLogin && (
          <Menu.Item position='right'>
            <Link to='/login'>
              <Button variant='contained'>Login</Button>
            </Link>
          </Menu.Item>
        )}
      </Menu>
      <Outlet />
    </div>
  );
}
