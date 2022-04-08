export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userImage = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo({ userId, userName, userAbout, userAvatar }) {
    this._userId = userId;
    if (userName) {
      this._userName.textContent = userName;
    }
    if (userAbout) {
      this._userAbout.textContent = userAbout;
    }
    if (userAvatar) {
      this._userImage.style.backgroundImage = `url('${userAvatar}')`;
    }
  }
}