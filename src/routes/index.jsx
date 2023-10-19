import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { BarMenu } from '../components/BarMenu';
import { Login } from '../components/Login';
import { MyLayout } from '../components/MyLayout';
import { Dashboard } from '../components/Dashboard';
import { Suspense, useEffect } from 'react';
import { MySpin } from '../components/MySpin';
import storage from '../utils/storage';
import { Category } from '../components/Category';
import { Product } from '../components/Product';
import { checkAuth } from '../auth';
import { SingUp } from '../components/SingUp';



const useCheckAuth = () => {
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [location]);
}

const privateRoutes = (user) => {
    if(user) {
      return [
        {
          path: '/admin',
          element: <AppRoute />,
          children: [
            {path: "", element: <Dashboard />},
            {path: "categories", element: <Category />},
            {path: "products", element: <Product />},
          ]
        },
        {
          path: '*',
          element: <Navigate to={"/admin"} />
        }
      ]    
    }
    return [];
};

const publicRoutes = (user) => {
  if(!user) {
    return [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SingUp />
      },
      {
        path: '*',
        element: <Navigate to={"/login"} />
      }
    ];
  }

  return [];
}

const AppRoute = ({withLayout = true}) => {
  useCheckAuth();
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


export const getRoutes = () => {

  return [
    {
      path: '/menu/:linkCode',
      element: <BarMenu />
    },
    ...privateRoutes(storage.getUser()),
    ...publicRoutes(storage.getUser()),
  ]; 
}