import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemGroup, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
}


export default function ActivityListItem({activity}: Props) {
 
    return (
        <Segment.Group>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to = {`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{activity.date}
                    <Icon name='marker' />{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Atendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}