import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        street: '',
        postalCode: ''
    }
    render() {
        return (<div className={classes.ContactData}>
            <form action="post">
                <h2>Enter your Contact Data</h2>
                <input className={classes.Input} type='text' placeholder='Your Name' />
                <input className={classes.Input} type='text' placeholder='Your Email' />
                <input className={classes.Input} type='text' placeholder='Street' />
                <input className={classes.Input} type='text' placeholder='Postal Code' />
                <Button btnType='Success'>ORDER</Button>
            </form>
        </div>);
    }
}

export default ContactData;