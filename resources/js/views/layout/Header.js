import React, { Component } from 'react';
import {Link} from "react-router-dom";

/**
 * Header Component
 */
class Header extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b> <i className="fa fa-dashboard"></i></b></span>
                    <span className="logo-lg"><b> Monitor</b> NTL</span>
                </Link>

                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown notifications-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-bell-o"></i>
                                    <span className="label label-warning">10</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 10 notifications</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-aqua"></i> 5 new members joined today
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-warning text-yellow"></i> Very long description
                                                    here that may not fit into the
                                                    page and may cause design problems
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-red"></i> 5 new members joined
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-user text-red"></i> You changed your username
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer"><a href="#">View all</a></li>
                                </ul>
                            </li>
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <span className="hidden-xs">Admin</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-footer">
                                        {/*<div className="pull-left">*/}
                                            {/*<a href="#" className="btn btn-default btn-flat">Profile</a>*/}
                                        {/*</div>*/}
                                        <div className="pull-right">
                                            <a href="/logout" className="btn btn-default btn-flat">Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </nav>
            </header>

        );
    }
}

export default Header;
