import * as React from 'react'
import { Component } from 'react'
import gql from 'graphql-tag'
import { Icon, Input, Spin } from 'antd'
import { Query } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { StoreConsumer, ContextStore } from '../../store'
import { Service } from '../../store/service'
import ServiceCom from './service'
import { SERVICE_LIST } from '../../queries'
import "./index.css"

const Search = Input.Search

interface Props extends RouteComponentProps<any> {
  form?: any
}

@(withRouter as any)
class Services extends Component<Props, {}> {

  render() {
    return <StoreConsumer>
      {
        (context: ContextStore) => {
          return <Query query={SERVICE_LIST} variables={{ limit: 10, offset: 0 }}>
            {
              ({ loading, data, error }) => {
                if (loading) return <div className="loading"><Spin size="large" /></div>
                if (error) return <div>{error && error.message}</div>
                const services = context.store.commonManager.getValueByKeys([ 'services'], data, [])
                return <div className="services">
                {
                    services.map((service: Service) => <ServiceCom key={service.name} service={service} />)
                }
                </div>
              }
            }
          </Query>
        }
      }
    </StoreConsumer>
  }
}

export default Services