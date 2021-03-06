import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import Admin from 'pages/admin/Index';
import Productos from 'pages/admin/Productos';
import Usuarios from 'pages/admin/Usuarios';
import Ventas from 'pages/admin/Ventas';
import Index from 'pages/Index';
import Login from 'pages/Login';
import Registro from 'pages/Registro';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'styles/App.css';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain="marroking.us.auth0.com"
      clientId="6IRaE8TRqsy5BFwdOhfhSJ6m9siibjpH"
      redirectUri='http//https://guarded-lake-84556.herokuapp.com/admin'
    > 
      <Router>
        <Switch>

          <Route path={['/admin','/admin/ventas','/admin/productos','/admin/usuarios']}>
            <PrivateLayout>
              <Switch>
                <Route path='/admin/ventas'>
                  <Ventas/>
                </Route>
                <Route path='/admin/productos'>
                  <Productos/>
                </Route>
                <Route path='/admin/usuarios'>
                  <Usuarios/>
                </Route>
                <Route path='/admin'>
                  <Admin/>
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>

          <Route path={['/login','/registro']}>
            <AuthLayout>
              <Switch>
                <Route path='/login'>
                  <Login/>
                </Route>
                <Route path='/registro'>
                  <Registro/>
                </Route>
              </Switch>
            </AuthLayout>
          </Route>

          <Route path ={['/']}>
            <PublicLayout>
              <Switch>
                <Route path = '/'>
                <Index/>
                </Route>
              </Switch>
            </PublicLayout>
          </Route>

        </Switch>
      </Router>
    </Auth0Provider>
  );
}

export default App;