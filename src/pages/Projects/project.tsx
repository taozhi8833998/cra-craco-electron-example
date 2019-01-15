import * as React from 'react'
import { PureComponent } from 'react'
import { Input, Button, Popconfirm, Form, Select, Modal, DatePicker, Spin, message } from 'antd'
import mo from 'moment'
import { FormComponentProps } from 'antd/lib/form/Form'
import { Query, Mutation } from 'react-apollo'
import { Project } from '../../store/project'
import { Store } from '../../store'
import { UPDATE_PROJECT, PROJECT_LIST, DELETE_PROJECT, PROJECT_TYPES, PROJECT_BY_NAME } from '../../queries'
import "./index.css"
import PicturesWall from '../../components/PicturesWall'

const { RangePicker } = DatePicker
const { Option } = Select

interface Props extends FormComponentProps {
  project: Project
  store: Store
}

interface State {
  edit: boolean
  showButton: boolean
}

class ServiceCom extends PureComponent<Props, State> {

  state = {
    edit: false,
    showButton: false
  }

  fileList: any[] = []
  projectName: string = ''
  projectDesc: string = ''

  processDesc(desc: string) {
    const len = desc.length
    return
  }

  edit = () => {
    this.setState((state) => ({edit: !state.edit}))
  }

  getImagesFromFileList = () => {
    return this.fileList && this.fileList.map(file => ({
      filename: file.filename || file && file.response && file.response.data || file.name
    }))
  }

  save = (updateProject: any) => async () => {
    const { form } = this.props
    const variables: any = {
      name: this.props.project.name
    }

    form.validateFields(async (err: any, values: any) => {
      if (err) return message.error(`${err.message}`)
      const format = 'YYYY-MM-DD'
      const start_time = values.project_time && values.project_time[0] && values.project_time[0].format(format)
      const end_time = values.project_time && values.project_time[0] && values.project_time[1].format(format)
      if (values.name !== this.props.project.name) {
        values.project_name = values.name
        values.name = this.props.project.name
      }
      const images = this.getImagesFromFileList()
      try {
        await updateProject({ variables: { ...values, start_time, end_time, images } })
      } catch (err) {
        return console.error('update Project error = ', err.message)
      }
      this.edit()
      form.resetFields()
    })
    try {
      await updateProject({
        variables
      })
    } catch(err) {
      console.error('error==', err)
    }
  }

  onNameChange = (e: any) => {
    this.projectName = e.target.value
  }

  onDescChange = (e: any) => {
    this.projectDesc = e.target.value
  }

  onMouseToggle = () => {
    this.setState((state) => ({ showButton: !state.showButton }))
  }

  setFileList = (fileList: any[]) => this.fileList = fileList

  updateModal = (updateProject: any) => {
    const { form, project: originProject } = this.props
    return <Query query={PROJECT_BY_NAME} variables={{ name: originProject.name }}>
      {
        ({loading, data, error}) => {
          const project = data.projectByName || {}
          this.setFileList(project.images)
          const formCom = <Form>
            <Form.Item label="项目名称">
              {form.getFieldDecorator("name", {
                rules: [{ required: true }],
                initialValue: project.name
              })(<Input placeholder='请输入项目名称' />)}
            </Form.Item>
            <Form.Item label="项目类型">
              {form.getFieldDecorator("type", {
                rules: [{ required: true }],
                initialValue: project.type
              })(<Select>
                {
                  PROJECT_TYPES.map(type => <Option key={type} value={type}>{type}</Option>)
                }
              </Select>)}
            </Form.Item>
            <Form.Item label="项目图片">
              {form.getFieldDecorator("content", {
                rules: [{ required: false }],
                initialValue: project.images
              })(<PicturesWall setFileList={this.setFileList} />)}
            </Form.Item>
            <Form.Item label="项目描述">
              {form.getFieldDecorator("desc_cn", {
                rules: [{ required: true }],
                initialValue: project.desc_cn
              })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }} />)}
            </Form.Item>
            <Form.Item label="项目英文描述">
              {form.getFieldDecorator("desc_en", {
                rules: [{ required: true }],
                initialValue: project.desc_en
              })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }} />)}
            </Form.Item>
            <Form.Item label="项目时间">
              {form.getFieldDecorator("project_time", {
                rules: [{ required: true }],
                initialValue: [mo(project.start_time, 'YYYY-MM-DD'), mo(project.end_time, 'YYYY-MM-DD')]
              })(<RangePicker style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="项目信息">
              {form.getFieldDecorator("content", {
                rules: [{ required: false }],
                initialValue: project.content
              })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }} />)}
            </Form.Item>
          </Form>
          return <Modal
            onOk={this.save(updateProject)}
            onCancel={this.edit}
            title='修改项目'
            confirmLoading={loading}
            visible={this.state.edit}
          >
            {
              loading
                ? <div className="loading"><Spin size="large" /></div>
                : error
                ? <div>{error && error.message}</div>
                : formCom
            }

          </Modal>
        }
      }
      </Query>
  }

  deleteProject = (deleteProject: any) => async () => {
    try {
      await deleteProject({
        variables: {
          name: this.props.project.name
        }
      })
    } catch (err) {
      console.error('error:', err)
    }
  }

  refetchQueries = () => {
    return [
      {
        query: PROJECT_BY_NAME, variables: { name: this.props.project.name }
      }
    ]
  }

  render() {
    const { project, store } = this.props
    const { showButton } = this.state

    return <Mutation mutation={UPDATE_PROJECT} refetchQueries={this.refetchQueries}>
    {
        (updateProject, { loading }) => {
          const imgUrl = store.commonManager.getValueByKeys(['images', '0', 'url'], project, '')
          return <div className='project'>
          {
              this.updateModal(updateProject)
          }
            <div className='project-img' style={{ backgroundImage: `url(${imgUrl})` }} onMouseEnter={this.onMouseToggle} onMouseLeave={this.onMouseToggle}>
            {
                showButton ? (<div className='project-button'>
                  <Button onClick={this.edit} style={{ marginLeft: '10px' }}>编辑</Button>
                  <Mutation mutation={DELETE_PROJECT} refetchQueries={this.refetchQueries}>
                    {
                      (deleteProject, { loading }) => {
                        return <Popconfirm title={`确认要删除 ${project.name} 项目吗？`} onConfirm={this.deleteProject(deleteProject)} okText="Yes" cancelText="No">
                          <Button style={{ marginLeft: '10px' }}>删除</Button>
                        </Popconfirm>
                      }
                    }
                  </Mutation>
                </div>) : <div className='project-text'>{project.name}</div>
            }
            </div>
          </div>
        }
    }
    </Mutation>
  }
}

export default Form.create<Props>()(ServiceCom)