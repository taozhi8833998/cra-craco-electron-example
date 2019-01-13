export default class CommonManager {
  userName: String = ''

  setUserName(userName: String) {
    this.userName = userName
  }

  getUserName() {
    return this.userName
  }

  getValueByKeys(keys: String[], originObj: any, defaultValue: any = null) {
    return keys.reduce((obj: any, key) => (obj && obj[key.toString()] != null) ? obj[key.toString()] : defaultValue, originObj)
  }
}