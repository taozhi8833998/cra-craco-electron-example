export default class CommonManager {
  userName: String = ''

  setUserName(userName: String) {
    this.userName = userName
  }

  getUserName() {
    return this.userName
  }

}