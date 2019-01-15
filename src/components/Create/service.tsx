import * as React from 'react'
import { Component } from 'react'
import { Input, Modal, Form, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { Mutation } from 'react-apollo'
import { CREATE_SERVICE, SERVICE_LIST } from '../../queries'

interface Props extends FormComponentProps {
  name: string
}

interface State {
  visible: boolean
}

class ServiceModal extends Component<Props, State> {

  state = {
    visible: false
  }

  closeModal = () => {
    this.setState(() => ({visible: false}))
  }

  showModal = () => {
    this.setState(() => ({ visible: true }))
  }

  onCreateService = (addService: any) => async (e: any) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (err: any, values: any) => {
      if (err) return message.error(`${err.message}`)
      try {
        await addService({ variables: values })
      } catch(err) {
        return console.error('add service error = ', err.message)
      }
      this.closeModal()
      form.resetFields()
    })
  }

  refetchQueries = () => {
    return [
      { query: SERVICE_LIST, variables: { limit: 100, offset: 0 } }
    ]
  }

  render() {
    const { form, name } = this.props
    return (
    <React.Fragment>
        <Mutation mutation={CREATE_SERVICE} refetchQueries={this.refetchQueries}>
      {
        (addService, {loading, data}) => {
          return (
            <Modal
              onOk={this.onCreateService(addService)}
              onCancel={this.closeModal}
              title='创建服务'
              confirmLoading={loading}
              visible={this.state.visible}
            >
              <Form>
                <Form.Item label="服务名称">
                  {form.getFieldDecorator("name", {
                    rules: [{ required: true }]
                  })(<Input placeholder='请输入服务名称'/>)}
                </Form.Item>
                <Form.Item label="描述">
                  {form.getFieldDecorator("desc", {
                    rules: [{ required: true }]
                  })(<Input.TextArea autosize={{ minRows: 3, maxRows: 10 }}/>)}
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

export default Form.create<Props>()(ServiceModal)