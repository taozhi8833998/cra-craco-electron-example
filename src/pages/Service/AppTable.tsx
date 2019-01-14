import * as React from 'react'
import { Component } from 'react'
import {
  Table, Input, Button,
  Modal, Upload, Icon,
  Select, AutoComplete
} from 'antd'
import { graphql, Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import "./index.css"

// const AppList = require('../../graphql/AppList.gql')
const TextArea = Input.TextArea
const Option = Select.Option

const AppList = gql`
  query AppList {
    appLists {
      test_case_cfg,
      doc_center,
      id,
      name,
      token,
      language,
      gmt_modified,
      author
    }
  }
`
interface Props {
  form?: any
}

interface State {
  searchValue: string,
  isVisible: boolean
}

const taskList = [{
  id: 1,
  name: "js1",
  token: 123,
  language: 'javascript',
  template: 'basic',
  author: 'aaa',
  test_case_cfg: '{ }',
  gmt_modified: "2019-01-04 10:27:10"
},{
  id: 2,
  name: "js2",
  token: 123,
  language: 'javascript',
  template: 'basic',
  author: 'aaa',
  test_case_cfg: '{ }',
  gmt_modified: "2019-01-04 10:27:11"
}]

class AppTable extends Component<Props, State> {

  // @graphql(AppListBySearch, {
  //   options: props => {
  //     return {
  //       variables: {
  //         searchVal: props.match.params.searchVal,
  //       }
  //     };
  //   },
  // })

  state = {
    searchValue: '',
    isVisible: false
  }

  onSearchChange = (e) => {
    this.setState({
      searchValue: e
    })
    this.changeTaskFilter('task_name', e)
  }

  setSearchValue = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  changeTaskFilter (type, value) {
    // const { TaskStore } = this.props
    // TaskStore.setTipsInfo(false)
    // TaskStore.setTaskFilter(type, value.replace(/(^\s*)|(\s*$)/g, ''))
    // TaskStore.setTaskFilter('page_num', 1)
    // TaskStore.getTaskList()
  }

  clickAppEdit = () => {
    this.setState({
      isVisible: true
    })
  }

  onCloseModal = () => {
    this.setState({
      isVisible: false
    })
  }

  setSeach = (value, delVal?: string) => {
    delVal === 'del' && this.setState({
      searchValue: ''
    })
    this.changeTaskFilter('task_name', value)
  }

  renderColumn = (isDidabled = true) => {
    const columes = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        width: "5%"
      },
      {
        title: "名字",
        dataIndex: "name",
        key: "name",
      },{
        title: "token",
        dataIndex: "token",
        key: "token",
      },{
        title: "language",
        dataIndex: "language",
        key: "language",
      },{
        title: "author",
        dataIndex: "author",
        key: "tempauthorlate",
      },{
        title: "测试全局变量",
        dataIndex: "test_case_cfg",
        key: "test_case_cfg",
        width: "15%",
        render: (text, record) => <TextArea rows={3} value={text} readOnly={true}  />
      },{
        title: "最近修改时间",
        dataIndex: "gmt_modified",
        key: "gmt_modified",
        render: (text, record) =>  moment(new Date(text)).format("YYYY-MM-DD HH:mm:ss")
      },{
        title: "操作",
        width: "20%",
        render: (text, record) => <div>
          <Button onClick={this.clickAppEdit}>编辑</Button>
          <Button>删除</Button>
        </div>
      }]

    return columes
  }

  renderContent = () => {
    const fileList:any[] = [{
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return <div>
      <div className="relogin-form">
        <span style={{marginRight: '43px'}}>name:</span>
        <Input placeholder="app name" value='js1' />
      </div>
      <div className="relogin-form">
        <span>token:</span>
        <Input value='123' />
      </div>
      <div>
        <p>images:</p>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
      </div>
    </div>
  }

  renderTable = () => {
    return <Query query={AppList} >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Table
            columns={this.renderColumn()}
            dataSource={data.appLists}
            pagination={false}
            rowKey={record => record.id}
          />
        );
      }}
    </Query>
  }

  render() {
    return (
      <div className="appTableCon">
        {this.renderTable()}
        {
          this.state.isVisible && (
            <Modal
              visible={this.state.isVisible}
              title='App 编辑'
              onCancel={this.onCloseModal}
            >
              {this.renderContent()}
            </Modal>
          )
        }
      </div>
    )
  }
}

export default AppTable