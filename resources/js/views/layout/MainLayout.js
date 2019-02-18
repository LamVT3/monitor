import React, { Component }   from 'react';
import Header                 from  './Header';

/**
 * MainLayout Component
 */
class MainLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
              	<Header />
                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default MainLayout;