import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";

export default observer( function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {loading,createActivity,updateActivity,loadActivity,loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity,setActivity] = useState({
        id: '',
        title:'',
        category:'',
        description:'',
        date: '',
        city:'',
        venue:''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    },[id, loadActivity]);  // zadnji parametar je dependency, i njega moramo postaviti jer u suprotnom
                            // imamo loop kada se pozove setActiviti ->komponenta se renderira i zove se 
                            // setActivity i onda se komponenta reRenderira i tako u krug...ali kako imamo podtavljen
                            // dependency onda  izvršavamo kod unurat sideEffect smo ako se jedan od dependency parametara 
                            // promijenio

    function handleSubmit(){
        if(activity.id.length === 0 ){
            let newActivity= {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        }else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    function handleinputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){  // | je unija, tj. znači da event može biti ili Input elem ili TextArea elem!
        const {name, value} = event.target;
        setActivity({...activity, [name]: value}) // iz html input polja trazimo 'name' u activity strukturi i dodjelimo mu 'value' vrijednost
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity ...'/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >                
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleinputChange}/>
                <Form.TextArea placeholder='Description'value={activity.description} name='description' onChange={handleinputChange}/>
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handleinputChange}/>
                <Form.Input type='date' placeholder='Date'value={activity.date} name='date' onChange={handleinputChange}/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={handleinputChange}/>
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handleinputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
})