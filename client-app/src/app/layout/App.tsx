
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router';
import HomePage from '../../features/activities/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import AcivityDetails from '../../features/activities/details/ActivityDetails';
import { useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'} //sve iza / salji dalje
        render={() => (
          <>
          <NavBar/>
          <Container style={{marginTop: '7em'}}>      
            <Switch>      
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={AcivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors/' component={TestErrors}/>
              <Route path='/server-error/' component={ServerError}/>
              <Route component={NotFound} />
            </Switch> 
          </Container>
          </>
        )}
      />
      
    </>
  );
}

export default observer(App);
