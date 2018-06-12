import React from 'react';
import {connect} from 'react-redux'

import PropTypes from 'prop-types';
import {Dropdown, Image, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {goto} from "../actions/index";
//import {CONTEXT_PATH} from "../api-config";
import MD5 from 'md5';

class HeaderMenu extends React.Component {

    _handleItemClick = (e, { name }) => {
        this.props.handleItemClick(this.props.portal.widgets.filter(w => w.name === name)[0]);
    };

    render() {

        const trigger = (
            <Menu.Item className='owms-header-menu-item item'>
                <Image src={'https://www.gravatar.com/avatar/'+MD5(/*this.props.user.email*/'bla')+'?d=monsterid&s=200'} avatar/>
                {/*this.props.user.given_name + ' ' + this.props.user.family_name*/ 'anonymous'}
            </Menu.Item>
        );

        return (
            <Menu>
                {
                this.props.portal.widgets && this.props.portal.widgets.map((w, i) =>
                    w.menuItems ? (
                        <Menu.Item
                        key={i}
                        className='owms-header-menu-item link item'
                        name={w.name}
                        active={this.props.activeItem.name === w.name}
                        >
                            <Dropdown text={w.name} className='item'>
                                <Dropdown.Menu>
                                    {w.menuItems.map((mi, j) => (
                                        mi.route && <Link to={mi.route} key={j}>
                                            <Dropdown.Item>{mi.name}</Dropdown.Item>
                                        </Link>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    ) : (
                        <Menu.Item
                        key={i}
                        className='owms-header-menu-item link item'
                        name={w.name}
                        active={this.props.activeItem.name === w.name}
                        onClick={this._handleItemClick}
                        >
                            {w.name}
                        </Menu.Item>
                    )
                )
                }

                <Menu.Item position='right' className='owms-header-menu-item'>
                    <Dropdown trigger={trigger} className='item'>
                        <Dropdown.Menu>
                            <Dropdown.Header>
                                <p><Image src={'https://www.gravatar.com/avatar/'+MD5(/*this.props.user.email*/'bla')+'?d=monsterid&s=120'}/>{/*this.props.user.given_name + ' ' + this.props.user.family_name*/'anonymous'}</p>
                            </Dropdown.Header>
                            <Dropdown.Divider/>
                            <Dropdown.Item>Help</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item icon='log out' text='Log out' onClick={this.props.logout}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        )
    }
}

HeaderMenu.propTypes = {
    user: PropTypes.object,
    routes: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => (
    {
        error: state.error,
        success: state.success,
        activeItem: state.activeItem,
        routes: state.routes,
        portal: state.portal,
    }
);

const mapDispatchToProps = (dispatch, props) => (
    {
        handleItemClick: (widget) => {
            dispatch({
                type: "HEADER_ITEM_CLICK",
                widget: widget
            });
            dispatch(goto([widget.routes[0]]))
        },
        handleModuleClick: () => {
            dispatch({
                type: "HEADER_ITEM_CLICK",
                widget: {name: 'Module'}
            });
            dispatch(goto([{ hash: '/' }]))
        },
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderMenu);