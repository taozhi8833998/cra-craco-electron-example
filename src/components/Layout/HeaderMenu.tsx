import * as React from 'react'
import { PureComponent } from 'react'
import { Menu, Icon } from 'antd'
import CreateProject from '../Create/project'
import CreateService from '../Create/service'
import "./index.css"

const { SubMenu } = Menu

interface Props {
  form?: any
}

interface State {
  collapsed: boolean
}

const createTypes = [
  {
    name: '服务',
    key: 'service',
    com: CreateService
  },
  {
    name: '项目',
    key: 'project',
    com: CreateProject
  },

]

class HeaderMenu extends PureComponent<Props, State> {

  state = {
    collapsed: false
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  menuClick = (item: any) => {
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
            createTypes.map(item => <Menu.Item key={item.key}><item.com name={item.name}/></Menu.Item>)
          }
        </SubMenu>
        <SubMenu className="topSelectMenuItem" title={<span className="submenu-title-wrapper"><Icon type="file-unknown" />帮助</span>}>
          <Menu.Item key="Help_System">系统介绍</Menu.Item>
          <Menu.Item key="Help_Tutorial">使用教程</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default HeaderMenu