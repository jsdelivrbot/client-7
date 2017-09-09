import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
    class Authentication extends Component {
        // Authentication.contextTypes
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/');
            }
        }
        
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/');
            }
        }

        render() {
            console.log('Authenticated: ', this.props.authenticated);
            console.log('Context: ', this.context);
            return <ComposedComponent {...this.props} />
        };
    }

    const mapStateToProps = (state) => {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
}

// In some other location...Not in this file...
// We want to use this HOC
// import Authentication // This is my HOC
// import Resources // This is the component I want to wrap

// const  ComposedComponent = Authentication(Resources);

// In some render method...
// <ComposedComponent resources={resourcesList} />