export class UserInfo {
  constructor({ userTitleSelector, userTextSelector, avatarSelector }) {
    this._name = document.querySelector(userTitleSelector);
    this._info = document.querySelector(userTextSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      info: this._profileText.textContent,
      avatar: this._avatar.src
    };
  }
  
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data.id
  }

  getUserId() {
    return this._userId
  }
}
