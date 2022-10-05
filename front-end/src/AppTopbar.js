import React  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const AppTopbar = (props) => {

    return (
        <div className="layout-topbar" style={{backgroundColor: '#1ABC9C'}}>
            <Link to="/" className="layout-topbar-logo">
                <div class="logo">
                    <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/nf1.png' : 'assets/layout/images/logo.jpg'}  alt="logo"/>
                    <div class="logoDes">
                        <h4 class='tit'>NANO'S FERRETERÍA</h4>
                        <h4>PRODUCTOS DE CALIDAD</h4>
                    </div>
                </div>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" style={{color: 'black' }} />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" style={{color: 'black' }} />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar" style={{color: 'black' }}/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog" style={{color: 'black' }}/>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user" style={{color: 'black' }}/>
                            <span>Profile</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}
