import React, { Component } from 'react';

/**
 * Sidebar Component
 */
class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-pie-chart"></i>
                                <span>Helios</span>
                                <span className="pull-right-container">
                                  <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="/helios-table"><i className="fa fa-circle-o"></i> Table</a>
                                </li>
                                <li><a href="/helios-report"><i className="fa fa-circle-o"></i> Report</a>
                                </li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-phone"></i>
                                <span>IP Phone</span>
                                <span className="pull-right-container">
                                  <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="/ipphone-table"><i className="fa fa-circle-o"></i> Table</a>
                                </li>
                            </ul>
                        </li>
                        {/*<li><a href="#"><i className="fa fa-book"></i> <span>Documentation</span></a></li>*/}
                    </ul>
                </section>
            </aside>
        );
    }
}

export default Sidebar;
