import * as React from 'react'
import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Form, Icon, Input, Button, message } from 'antd'
import './index.css'
import { Store, StoreConsumer, ContextStore } from '../../store'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { LOGIN } from '../../queries'

const FormItem = Form.Item

interface Props extends RouteComponentProps<any>{
  form?: any
}

@(withRouter as any)
class Login extends Component<Props, {}> {

  hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  handleSubmit = (signIn: any, store: Store) => async (e: any) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (err: any, values: any) => {
      if (err) return message.error(`${err.message}`)
      try {
        const { data: { signIn: { name } } } = await signIn({
          variables: values
        })
        store.commonManager.setUserName(name)
        form.resetFields()
        this.props.history.push('/home')
      }catch(error) {
        return console.error(`Login Failed = ${error.message}`, 3)
      }
    })
  }

  validateItem = (config: any = {}, component = <div />) => {
    const { getFieldDecorator } = this.props.form
    const { name, options } = config
    return getFieldDecorator(name, options)(component)
  }

  render() {
    const { getFieldsError } = this.props.form
    return (
      <StoreConsumer>
        {
          (context: ContextStore) => <div className='loginCon'>
            <Mutation mutation={LOGIN}>
              {(signIn, { loading }) => {
                return (
                  <Form onSubmit={this.handleSubmit(signIn, context.store)} className='login-form'>
                    <FormItem>
                      {
                        this.validateItem(
                          {
                            name: 'name',
                            options: {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your Username!'
                                }
                              ],
                            }
                          },
                          <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
                        )
                      }
                    </FormItem>
                    <FormItem>
                      {
                        this.validateItem(
                          {
                            name: 'password',
                            options: {
                              rules: [
                                {
                                  required: true,
                                  message: 'Please input your Password!'
                                }
                              ],
                            }
                          },
                          <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
                        )
                      }
                    </FormItem>
                    <FormItem>
                      <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: '100%' }}
                        loading={loading}
                        disabled={this.hasErrors(getFieldsError())}
                      >
                        Login
              </Button>
                    </FormItem>
                  </Form>)
              }}
            </Mutation>
          </div>
        }
      </StoreConsumer>
    )
  }
}

export default Form.create()(Login as any)