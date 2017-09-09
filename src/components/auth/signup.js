import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Opss!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label className="">Email:</label>
                        <input type="email" className="form-control" {...email}  />
                        {email.touched && email.error && <div className="error">{email.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label className="">Password:</label>
                        <input type="password" className="form-control" {...password}  />
                        {password.touched && password.error && <div className="error">{password.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label className="">Password Confirm:</label>
                        <input type="password" className="form-control" {...passwordConfirm}  />
                        {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign up!</button>
                </form>
            </div>
        );
    }
}

const validate = (formProps) => {
    const errors = {};

    Object.keys(formProps).forEach(key => {
        //console.log(key);  // the name of the current key.
        //console.log(formProps[key]); // the value of the current key.

        if(!formProps[key]) {
            switch(key) {
                case 'email': 
                    errors[key] = 'Please enter an email!';
                    break;
                case 'password': 
                    errors[key] = 'Please enter a password!';
                    break;
                case 'passwordConfirm': 
                    errors[key] = 'Please enter a password confirmation!';
                    break;
            }
        }
            
    });

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
}


export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);