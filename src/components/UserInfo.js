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

  setUserInfo({ userName, userAbout }) {
    // console.log(avatarLink);
    // console.log(this._userImage);
    this._userName.textContent = userName;
    this._userAbout.textContent = userAbout;
    // this._userImage.style.backgroundImage = `url('${avatarLink}')`;
  }

  setUserAvatar(avatarLink) {
    this._userImage.style.backgroundImage = `url('${avatarLink}')`;
  }
}