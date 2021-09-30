import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const[activities, setActivities] = useState<Activity[]>([]); 
  const[selectdActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode,setEditMode] = useState(false); 


  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
    })
  }, [])

  function handleSelecteActivity(id: String) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelecteActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? : string) {
    id ? handleSelecteActivity(id) : handleCancelSelecteActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id),activity]) // imamo activity.id pa se radi o editiranju ... p.s. filtrirj sve različite od našega activity.id-ja!
      : setActivities([...activities,{...activity, id: uuid()}]) //nemamo id, pa dodaj novu , dakle radi se o createActivity, p.s. napravi spread activity.ja kojeg prosljeđujemo i generiraj uuid za novi activity
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectdActivity}
          selectActivity={handleSelecteActivity}
          cancelSelectActivity={handleCancelSelecteActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;