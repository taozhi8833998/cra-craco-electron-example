import * as React from 'react'
import { Component } from 'react'
import { Input, Spin } from 'antd'
import { Query } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { StoreConsumer, ContextStore } from '../../store'
import { Project } from '../../store/project'
import ProjectCom from './project'
import { PROJECT_LIST } from '../../queries'
import "./index.css"

interface Props extends RouteComponentProps<any> {
}

@(withRouter as any)
class Projects extends Component<Props, {}> {

  render() {
    return <StoreConsumer>
      {
        (context: ContextStore) => {
          return <Query query={PROJECT_LIST} variables={{ limit: 10, offset: 0 }}>
            {
              ({ loading, data, error }) => {
                if (loading) return <div className="loading"><Spin size="large" /></div>
                if (error) return <div>{error && error.message}</div>
                const projects = context.store.commonManager.getValueByKeys([ 'projects'], data, [])
                return <div className="projects">
                {
                    projects.map((project: Project) => <ProjectCom key={project.name} project={project} store={context.store}/>)
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

export default Projects