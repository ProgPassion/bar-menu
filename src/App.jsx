import './App.css'
import { Notifications } from './components/Notifications';
import { ConfigProvider } from 'antd'; 
import { getRoutes } from './routes';
import { useRoutes } from 'react-router-dom';

function App() {

  const routes = getRoutes();
  
  return (
    <div>
      <ConfigProvider>
        <Notifications />
        {useRoutes(routes)}
      </ConfigProvider>
    </div>
  );
}

export default App
