import * as React from 'react'
import { PureComponent } from 'react'
import { Input, Button, Popconfirm } from 'antd'
import { Mutation } from 'react-apollo'
import { Service } from '../../store/service'
import { UPDATE_SERVICE, SERVICE_LIST, DELETE_SERVICE } from '../../queries'
import "./index.css"


interface Props {
  service: Service
}

interface State {
  edit: boolean
}

class ServiceCom extends PureComponent<Props, State> {

  state = {
    edit: false
  }

  serviceName: string = ''
  serviceDesc: string = ''

  processDesc(desc: string) {
    const len = desc.length
    return
  }

  edit = () => {
    this.setState((state) => ({edit: !this.state.edit}))
  }

  save = (updateService: any) => async () => {
    console.log('this.serviceName==', this.serviceName, this.serviceDesc)
    if (!this.serviceName && !this.serviceDesc) return this.setState((state) => ({ edit: !this.state.edit }))
    const variables: any = {
      name: this.props.service.name
    }
    if(this.serviceName) {
      variables.service_name = this.serviceName
    }
    if(this.serviceDesc) {
      variables.desc = this.serviceDesc
    }
    try {
      await updateService({
        variables
      })
    } catch(err) {
      console.error('error==', err)
    }
  }

  onNameChange = (e: any) => {
    this.serviceName = e.target.value
  }

  onDescChange = (e: any) => {
    this.serviceDesc = e.target.value
  }

  update = (cache: any, { data: { updateService } }: any) => {
    const { services } = cache.readQuery({ query: SERVICE_LIST, variables: { limit: 100, offset: 0 } })
    cache.writeQuery({
      query: SERVICE_LIST,
      variables: { limit: 100, offset: 0 },
      data: { services: services.map((service: Service) => {
        if(service.name === this.props.service.name) {
          if(this.serviceName) service.name = this.serviceName
          if(this.serviceDesc) service.desc = this.serviceDesc
          this.serviceName = ''
          this.serviceDesc = ''
        }
        return service
      })}
    })
  }

  deleteService = (deleteService: any) => async () => {
    try {
      await deleteService({
        variables: {
          name: this.props.service.name
        }
      })
    } catch (err) {
      console.error('error==', err)
    }
  }

  refetchQueries = () => {
    return [
      { query: SERVICE_LIST, variables: { limit: 100, offset: 0 } }
    ]
  }

  render() {
    const { service } = this.props
    const { edit } = this.state
    const buttonName = edit ? '保存' : '编辑'

    return <Mutation mutation={UPDATE_SERVICE} update={this.update}>
    {
        (updateService, { loading }) => {
          const clickFun = edit ? this.save(updateService) : this.edit
          return <div className='service'>
            <div className='service-header'>
              {
                edit
                  ? <Input defaultValue={service.name} onChange={this.onNameChange}/>
                  : <p className='service-name'>{service.name}</p>
              }
              <div>
                <Button onClick={clickFun} style={{ marginLeft: '10px' }}>{buttonName}</Button>
                <Mutation mutation={DELETE_SERVICE} refetchQueries={this.refetchQueries}>
                {
                  (deleteService, { loading }) => {
                    return <Popconfirm title={`确认要删除 ${service.name} 服务吗？`} onConfirm={this.deleteService(deleteService)} okText="Yes" cancelText="No">
                      <Button style={{ marginLeft: '10px' }}>删除</Button>
                    </Popconfirm>
                  }
                }
                </Mutation>
              </div>
            </div>
            {
              edit
                ? <Input.TextArea defaultValue={service.desc} autosize={{ minRows: 3, maxRows: 10 }} onChange={this.onDescChange}/>
                : <p className='service-desc'>{service.desc}</p>
            }

          </div>
        }
    }
    </Mutation>
  }
}

export default ServiceCom