import * as React from 'react'
import { Component } from 'react'
import { Input, Modal, Form, message, DatePicker, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { Mutation } from 'react-apollo'
import { CREATE_PROJECT, PROJECT_LIST, PROJECT_TYPES } from '../../queries'
import PicturesWall from '../PicturesWall'

const { RangePicker } = DatePicker
const { Option } = Select

interface Props extends FormComponentProps {
  name: string
}

interface State {
  visible: boolean
}

class ProjectModal extends Component<Props, State> {

  state = {
    visible: false
  }

  fileList: any[] = []

  closeModal = () => {
    this.setState(() => ({visible: false}))
  }

  showModal = () => {
    this.setState(() => ({ visible: true }))
  }

  setFileList = (fileList: any[]) => this.fileList = fileList

  getImagesFromFileList = () => {
    return this.fileList && this.fileList.map(file => ({
      filename: file && file.response && file.response.data
    }))
  }

  onCreateProject = (addProject: any) => async (e: any) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (err: any, values: any) => {
      if (err) return message.error(`${err.message}`)
      const format = 'YYYY-MM-DD'
      const start_time = values.project_time && values.project_time[0] && values.project_time[0].format(format)
      const end_time = values.project_time && values.project_time[0] && values.project_time[1].format(format)
      const images = this.getImagesFromFileList()
      try {
        await addProject({ variables: { ...values, start_time, end_time, images } })
      } catch(err) {
        return console.error('add Project error = ', err.message)
      }
      this.closeModal()
      form.resetFields()
    })
  }

  refetchQueries = () => {
    return [
      { query: PROJECT_LIST, variables: { limit: 10, offset: 0 } }
    ]
  }

  render() {
    const { form, name } = this.props
    return (
    <React.Fragment>
        <Mutation mutation={CREATE_PROJECT} refetchQueries={this.refetchQueries}>
      {
        (addProject, {loading, data}) => {
          return (
            <Modal
              onOk={this.onCreateProject(addProject)}
              onCancel={this.closeModal}
              title='创建项目'
              confirmLoading={loading}
              visible={this.state.visible}
            >
              <Form>
                <Form.Item label="项目名称">
                  {form.getFieldDecorator("name", {
                    rules: [{ required: true }]
                  })(<Input placeholder='请输入项目名称'/>)}
                </Form.Item>
                <Form.Item label="项目类型">
                  {form.getFieldDecorator("type", {
                    rules: [{ required: true }]
                  })(<Select>
                    {
                      PROJECT_TYPES.map(type => <Option key={type} value={type}>{type}</Option>)
                    }
                  </Select>)}
                </Form.Item>
                <Form.Item label="项目图片">
                  {form.getFieldDecorator("content", {
                    rules: [{ required: false }]
                  })(<PicturesWall setFileList={this.setFileList} />)}
                </Form.Item>
                <Form.Item label="项目描述">
                  {form.getFieldDecorator("desc_cn", {
                    rules: [{ required: true }]
                  })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }}/>)}
                </Form.Item>
                <Form.Item label="项目英文描述">
                  {form.getFieldDecorator("desc_en", {
                    rules: [{ required: true }]
                  })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }} />)}
                </Form.Item>
                <Form.Item label="项目时间">
                  {form.getFieldDecorator("project_time", {
                    rules: [{ required: true }]
                  })(<RangePicker style={{width: '100%'}}/>)}
                </Form.Item>
                <Form.Item label="项目信息">
                  {form.getFieldDecorator("content", {
                    rules: [{ required: false }]
                  })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }} />)}
                </Form.Item>
              </Form>
            </Modal>
          )
        }
      }
      </Mutation>
      <div onClick={this.showModal}>{name}</div>
    </React.Fragment>
    )
  }
}

export default Form.create<Props>()(ProjectModal)