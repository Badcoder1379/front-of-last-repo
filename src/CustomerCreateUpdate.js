import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            customersService.getCustomer(params.pk).then((c) => {
                this.refs.firstName.value = c.first_name;
                this.refs.lastName.value = c.last_name;
                this.refs.email.value = c.email;
                this.refs.phone.value = c.phone;
                this.refs.address.value = c.address;
                this.refs.description.value = c.description;
            })
        }
    }

    handleCreate() {
        let data = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }
        
        customersService.createCustomer(
            data
        ).then((result) => {
            alert("Customer created!");
        }).catch((error) => {
            console.log(error);
            alert('There was an error! Please re-check your form.');
        });
    }
    handleUpdate(pk) {
        customersService.updateCustomer(
            {
                "pk": pk,
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value
            }
        ).then((result) => {
            console.log(result);
            alert("Customer updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }
    handleSubmit(event) {
        const { match: { params } } = this.props;

        if (params && params.pk) {
            this.handleUpdate(params.pk);
        }
        else {
            this.handleCreate();
        }

        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        First Name:</label>
                    <input className="form-control" type="text" ref="firstName" name='firstName' onChange={this.handleInputChange}/>

                    <label>
                        Last Name:</label>
                    <input className="form-control" type="text" ref="lastName" name='lastName' onChange={this.handleInputChange}/>

                    <label>
                        Phone:</label>
                    <input className="form-control" type="text" ref="phone" name='phone' onChange={this.handleInputChange}/>

                    <label>
                        Email:</label>
                    <input className="form-control" type="text" ref="email" name='email' onChange={this.handleInputChange}/>

                    <label>
                        Address:</label>
                    <input className="form-control" type="text" ref="address" name='address' onChange={this.handleInputChange}/>

                    <label>
                        Description:</label>
                    <textarea className="form-control" ref="description" name='description' onChange={this.handleInputChange}></textarea>


                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default CustomerCreateUpdate;