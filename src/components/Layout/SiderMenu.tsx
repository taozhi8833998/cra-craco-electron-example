import * as React from 'react'
import { PureComponent } from 'react'
import { Menu, Icon, } from 'antd'
import { Link } from 'react-router-dom'
import "./index.css"

const { SubMenu } = Menu;

interface Props {
  onCollapse: () => void
  openKeys: any[]
  form?: any
}

const menuList = [
  {
    name: "APP",
    icon: 'user',
    key: 'app',
    child: [
      {
        name: "app管理",
        key: '/home/app'
      }
    ]
  }, {
    name: "API",
    icon: 'laptop',
    key: 'api',
    child: [
      {
        name: "api管理",
        key: '/home/api'
      }
    ]
  }, {
    name: "DataSource",
    icon: 'notification',
    key: 'dataSource',
    child: [
      {
        name: "DataSource管理",
        key: '/home/ds'
      }
    ]
  }, {
    name: "TestCase",
    icon: 'user',
    key: 'testCase',
    child: [
      {
        name: "item7",
        key: 'item7'
      }
    ]
  }
]

class SiderMenu extends PureComponent<Props, {}> {

  renderMenuItem = (menuList: any) => {
    const menuItem = menuList.map((item: any) => {
      if (!item.child) {
        return <Menu.Item key={item.key}>
          <Link to={item.key}>
            {item.name}
          </Link>
        </Menu.Item>
      }
      return <SubMenu
        key={item.key}
        title={<span>{item.icon && <Icon type={item.icon} />}{item.name}</span>}
      >
        {this.renderMenuItem(item.child)}
      </SubMenu>
    })
    return menuItem
  }

  render() {
    return (<div className="siderMenuCon">
      <div className='tigger'><Icon type='bars' className='open' onClick={this.props.onCollapse} /></div>
      <Menu
        theme='dark'
        mode='inline'
        // onOpenChange={this.onOpenChange}
        // onClick={this.siderClick}
        // openKeys={this.props.openKeys}
        defaultSelectedKeys={['appManager']}
        defaultOpenKeys={['app']}
        selectedKeys={[location.pathname]}
      // selectedKeys={siderSelectedValue === 'createTask' ? ['taskManage'] : [siderSelectedValue]}
      >
        {this.renderMenuItem(menuList)}
      </Menu>
    </div>
    )
  }
}


export default SiderMenu