import React, { Component }   from 'react';
import Header                 from  './Header';
import Popup                  from  'react-popup';

/**
 * MainLayout Component
 */
class MainLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="wrapper" >
              	<Header />
                <div className="content-wrapper">
                    {this.props.children}
                </div>
                <Popup/>
            </div>
        );
    }
}
export default MainLayout;