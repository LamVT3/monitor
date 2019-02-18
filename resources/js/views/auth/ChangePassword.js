/**
 * ChangePassword.js
 * Màn hình HomePage [S200]
 * 
 * Author: AnhLH2
 * Created : 2017/07/17
 * Modified: 2017/07/24
 * 
 * Copyright (c)-2017 TOPICA EDTECH GROUP (www.topica.asia)
 *****************************************************************************/
import React, { Component } from 'react'
import axios                from 'axios'

import Header               from  '../layout/Header';
import Footer               from  '../layout/Footer';

import ComponentBase        from '../layout/ComponentBase';
import LogActions           from '../../actions/LogActions';

const Log = new LogActions(); 

/**
 * ChangePassword Component 
 * @Properties:
 *  - props.<tên của prop> : <Miêu tả thêm về prop ở đây>
 */
class ChangePassword extends ComponentBase {
    
    /**
     * HTML Render 
     */    
    constructor(props) {
        super(props)
        /*
         * Set states
         */

        /*
         * Binding functions
         */
    }

    /**
     * HTML Render 
     */
    render() {
        return (
          <div>
            ChangePassword
          </div>
        );
   }
}

export default ChangePassword;
