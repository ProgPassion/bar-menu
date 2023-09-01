import { Outlet, useRoutes } from 'react-router-dom';
import { BarMenu } from './components/BarMenu';
import { Login } from './components/Login';
import './App.css'
import { MyLayout } from './components/MyLayout';
import { Dashboard } from './components/Dashboard';
import { Suspense } from 'react';
import { MySpin } from './components/MySpin';

function App() {

  const AppRoute = ({withLayout = true}) => {
    return(
      <>
        <MyLayout visible={withLayout}>
          <Suspense
            fallback={
              <div
                style={{
                  width: 'fit-content',
                  height: 'fit-content',
                  margin: 'auto'
                }}>
                  <MySpin props={{ size: 'large' }} iconSize={70} />
              </div>
            }>
              <Outlet />
          </Suspense>
        </MyLayout>
      </>
    );
  }

  const routes = useRoutes([
    {
      path: '/',
      element: <BarMenu />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/admin',
      element: <AppRoute />,
      children: [
        {path: "", element: <Dashboard />}
      ]
    }
  ]);

  return (
    <div>
      {routes}
    </div>
  );
}

export default App
