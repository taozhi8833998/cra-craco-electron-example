import gql from 'graphql-tag'

const LOGIN = gql`
  mutation Login($name: String!, $password: String!) {
    signIn(name: $name, password: $password) {
      name
    }
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

const LOGOUT = gql`
  mutation {
    signOut
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

export {
  LOGIN,
  USRINFO,
  SERVICE_LIST,
  UPDATE_SERVICE,
  LOGOUT,
  CREATE_SERVICE,
  DELETE_SERVICE,
}