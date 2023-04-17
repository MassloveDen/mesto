export class UserInfo {
    constructor({ userTitleSelector, userTextSelector}) {
        this._profileTitle = userTitleSelector
        this._profileText = userTextSelector
    }

    getUserInfo () {
        return { title: this._profileTitle.textContent, text: this._profileText.textContent}
    }

    setUserInfo(title, text) {
        this._profileTitle.textContent = title
        this._profileText.textContent = text
    }
}