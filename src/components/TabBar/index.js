import * as React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './index.module.scss';
const menus = [
  {
    key: 'teacher',
    title: '教师列表',
    path: '/teacher',
    icon: 'appstore',
  },
];

class TabBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: [],
    };
  }
  genMenu(menuChildren) {
    return menuChildren.map(menuItem => {
      if (menuItem.children !== undefined) {
        // SubMenu
        return (
          <Menu.SubMenu
            key={menuItem.key}
            title={
              <span>
                {menuItem.icon && <Icon type={menuItem.icon} />}
                <span>{menuItem.title}</span>
              </span>
            }
          >
            {this.genMenu(menuItem.children)}
          </Menu.SubMenu>
        );
      } else {
        // MenuItem
        return (
          <Menu.Item key={menuItem.key}>
            <NavLink exact to={menuItem.path}>
              {menuItem.icon && <Icon type={menuItem.icon} />}
              <span>{menuItem.title}</span>
            </NavLink>
          </Menu.Item>
        );
      }
    });
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    let keyPath = [];
    const findPath = (menuChildren, pathname) => {
      for (const menuItem of menuChildren) {
        if (menuItem.children !== undefined) {
          keyPath.push(menuItem.key);
          const targetItem = findPath(menuItem.children, pathname);
          if (targetItem) {
            break;
          }
        } else {
          keyPath.push(menuItem.key);
          if (menuItem.path === pathname) {
            return menuItem.key;
          } else {
            keyPath.pop();
          }
        }
      }
    };
    findPath(menus, pathname);
    this.setState({
      selectedKeys: [keyPath.pop()],
      openKeys: keyPath,
    });
  }
  render() {
    return (
      <div className={styles.TabBar}>
        <Menu
          openKeys={this.state.openKeys}
          selectedKeys={this.state.selectedKeys}
          onSelect={({ key }) => {
            this.setState({
              selectedKeys: [key],
            });
          }}
          onOpenChange={openKeys => {
            this.setState({
              openKeys,
            });
          }}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
        >
          {this.genMenu(menus)}
        </Menu>
      </div>
    );
  }
}

export default withRouter(TabBar);
