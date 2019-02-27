import React, { Component }   from 'react';
import Header                 from  './Header';
import Popup                  from  'react-popup';
import Sidebar from "./Sidebar";

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
              	<Sidebar />
                <div className="content-wrapper">
                    {this.props.children}
                </div>
                <Popup/>
            </div>
        );
    }
}
export default MainLayout;