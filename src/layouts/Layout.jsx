import { Outlet } from 'react-router-dom';
import FloatingMenu from '../components/common/FloatingMenu/FloatingMenu';

function Layout() {
  return (
    <>
      {/*<header>Header 영역</header>*/}
      <main>
        <FloatingMenu />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
