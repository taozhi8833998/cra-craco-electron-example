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
    name: "服务",
    icon: 'user',
    key: 'service',
    child: [
      {
        name: "服务管理",
        key: '/home/service'
      }
    ]
  }, {
    name: "项目",
    icon: 'laptop',
    key: 'project',
    child: [
      {
        name: "项目管理",
        key: '/home/project'
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
        defaultSelectedKeys={[]}
        defaultOpenKeys={['service']}
        selectedKeys={[location.pathname]}
      >
        {this.renderMenuItem(menuList)}
      </Menu>
    </div>
    )
  }
}


export default SiderMenu