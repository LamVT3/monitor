import React, { Component } from 'react'
import axios                from 'axios'

/**
 * Login Component 
 * @Properties:
 *  - props.<tên của prop> : <Miêu tả thêm về prop ở đây>
 */
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let uri = '/auth/redirect';
        axios.get(uri, this.state).then((response) => {
            if (response.data.result) {
                localStorage.setItem('jwt', response.data.result);
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (

            <div className="login-box">
                <div className="login-logo">
                    <a href="/"><b> Monitor</b> NTL</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <div className="social-auth-links text-center">
                        <a href="#" onClick={this.handleSubmit} className="btn btn-block btn-social btn-google btn-flat">
                            <i className="fa fa-google-plus"> </i> Sign in using Google+</a>
                    </div>
                </div>
            </div>
        );
   }
}

export default Login;
