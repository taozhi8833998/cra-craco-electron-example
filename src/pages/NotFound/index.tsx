import * as React from 'react'
import { PureComponent } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import './index.css'

interface Props extends RouteComponentProps<any>{
}

@(withRouter as any)
class NotFound extends PureComponent<Props, {}> {
  componentDidMount() {
    setTimeout(
      () => {
        return this.props.history.push('/home')
      },
      1500
    )
  }

  render() {
    return (
      <div className='not-founded'>
        <div className="not-founded-bg" />
      </div>
    )
  }
}

export default NotFound
