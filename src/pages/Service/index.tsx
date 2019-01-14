import * as React from 'react'
import { Component } from 'react'
import gql from 'graphql-tag'
import { Icon, Input} from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import "./index.css"

const Search = Input.Search

interface Props extends RouteComponentProps<any> {
  form?: any
}

interface State {
}

@(withRouter as any)
class APP extends Component<Props, {}> {

  render() {
    return (
      <div className="service">
      </div>
    )
  }
}

export default APP