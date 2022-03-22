export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    return [
      this._userName.textContent,
      this._userAbout.textContent
    ];
  }

  setUserInfo([userName, userAbout]) {
    this._userName.textContent = userName;
    this._userAbout.textContent = userAbout;
  }
}