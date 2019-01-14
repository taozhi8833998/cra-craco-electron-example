export interface Image {
  filename: string
  url: string
}
export default class CommonManager {
  userName: string = ''

  setUserName(userName: string) {
    this.userName = userName
  }

  getUserName() {
    return this.userName
  }

  getValueByKeys(keys: string[], originObj: any, defaultValue: any = null) {
    return keys.reduce((obj: any, key: string) => (obj && obj[key] != null) ? obj[key] : defaultValue, originObj)
  }
}