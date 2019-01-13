import * as React from 'react'
import { PureComponent } from 'react'
import { Menu, Icon } from 'antd'
import "./index.css"

const { SubMenu } = Menu

interface Props {
  form?: any
}

interface State {
  collapsed: boolean
}

const createTypes = ["服务", "项目"]

class HeaderMenu extends PureComponent<Props, State> {

  state = {
    collapsed: false
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Menu
        className="headerMenu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      >
        <SubMenu className="topSelectMenuItem" title={<span className="submenu-title-wrapper"><Icon type="file-add" />新建</span>}>
          {
            createTypes.map(item => <Menu.Item key={item}>{item}</Menu.Item>)
          }
        </SubMenu>
        <SubMenu className="topSelectMenuItem" title={<span className="submenu-title-wrapper"><Icon type="file-unknown" />帮助</span>}>
          <Menu.Item key="Help_Introductory_Tutorial">系统介绍</Menu.Item>
          <Menu.Item key="Help_Internal_Variables">使用教程</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default HeaderMenu