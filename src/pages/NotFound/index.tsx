import * as React from 'react'
import { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

interface Props {
}

class NotFound extends PureComponent<Props, {}> {
  // componentDidMount() {
  //   const { location } = this.props
  //   const hash = location.pathname
  //   setTimeout(
  //     () => {
  //       const currentHash = (window as any).location.hash.slice(1)
  //       if (currentHash === hash) return this.props.history.push('/home')
  //     },
  //     2000
  //   )
  // }

  render() {
    return (
      <div className='not-founded'>
        <div className="not-founded-bg" />
        <div>
          <div><Link to="/home" >Home</Link></div>
        </div>
      </div>
    )
  }
}

export default NotFound
