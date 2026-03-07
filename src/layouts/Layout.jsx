import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      {/*<header>Header 영역</header>*/}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
