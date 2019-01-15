import gql from 'graphql-tag'

const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    signIn(name: $name, password: $password) {
      name
    }
  }
`

const LOGOUT = gql`
  mutation {
    signOut
  }
`

const USRINFO = gql`
  query {
    userInfo {
      name
    }
  }
`

const SERVICE_LIST = gql`
  query ServiceList($limit: Int, $offset: Int) {
    services(limit: $limit, offset: $offset) {
      name,
      desc,
    }
  }
`

const CREATE_SERVICE = gql`
  mutation CreateServce($name: String!, $desc: String!) {
    addService(name: $name, desc: $desc) {
      name,
      desc
    }
  }
`

const UPDATE_SERVICE = gql`
  mutation UpdateService($name: String!, $service_name: String, $desc: String) {
    updateService(name: $name, service_name: $service_name, desc: $desc)
  }
`

const DELETE_SERVICE = gql`
  mutation DeleteService($name: String!) {
    deleteService(name: $name)
  }
`


const PROJECT_LIST = gql`
  query ProjectList($limit: Int, $offset: Int) {
    projects(limit: $limit, offset: $offset) {
      name,
      images {
        filename,
        url,
      },
    }
  }
`

const PROJECT_BY_NAME = gql`
  query ProjectName($name: String!) {
    projectByName(name: $name) {
      name,
      desc_cn,
      desc_en,
      start_time,
      end_time,
      type,
      content,
      images {
        filename,
        url
      }
    }
  }
`

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $desc_cn: String!, $desc_en: String!, $start_time: String!, $type: String!, $end_time: String!, $content: String!, $images: [ImageInput!]!) {
    addProject(name: $name, desc_cn: $desc_cn, desc_en: $desc_en, start_time: $start_time, end_time: $end_time, content: $content, images: $images, type: $type) {
      name,
      images {
        filename,
        url,
      },
    }
  }
`

const UPDATE_PROJECT = gql`
  mutation UpdateProject($name: String!, $project_name: String, $desc_cn: String, $desc_en: String, $content: String, $images: [ImageInput], $start_time: String, $type: String, $end_time: String) {
    updateProject(name: $name, project_name: $project_name, desc_cn: $desc_cn, desc_en: $desc_en, content: $content, start_time: $start_time, end_time: $end_time, type: $type, images: $images)
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($name: String!) {
    deleteProject(name: $name)
  }
`

const PROJECT_TYPES = [
  '商业建筑',
  '居住建筑',
  '文化建筑',
  '教育建筑',
  '办公建筑',
  '酒店建筑',
  '康养建筑',
  '城市规划',
  '景观园林',
  '室内设计',
  '乡建设计',
  '古建设计',
  '建筑策划',
  '建筑咨询'
]

export {
  LOGIN,
  LOGOUT,
  USRINFO,
  SERVICE_LIST,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  PROJECT_LIST,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_TYPES,
  PROJECT_BY_NAME,
}