import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    closeForm: () => void;
    activity: Activity | undefined;
    createOrEdit: (activity: Activity) =>void;
}

export default function ActivityForm({closeForm,activity : selectedActivity,createOrEdit}:Props) {

    const initialState = selectedActivity ?? { // inicijalno stanje je selectedActivity, ako je ima, a ako nema onda postavimo strukturu sa praznim stringovima!
        id: '',
        title:'',
        category:'',
        description:'',
        date: '',
        city:'',
        venue:''
    }

    const [activity,setActivity] = useState(initialState);

    function handleSubmit(){
        createOrEdit(activity);
    }

    function handleinputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){  // | je unija, tj. znači da event može biti ili Input elem ili TextArea elem!
        const {name, value} = event.target;
        setActivity({...activity, [name]: value}) // iz html input polja trazimo 'name' u activity strukturi i dodjelimo mu 'value' vrijednost
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >                
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleinputChange}/>
                <Form.TextArea placeholder='Description'value={activity.description} name='description' onChange={handleinputChange}/>
                <Form.Input placeholder='Category'value={activity.category} name='category' onChange={handleinputChange}/>
                <Form.Input placeholder='Date'value={activity.date} name='date' onChange={handleinputChange}/>
                <Form.Input placeholder='City'value={activity.city} name='city' onChange={handleinputChange}/>
                <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handleinputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm } floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
}