/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';

  static setCurrent(user) {
    window.localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    window.localStorage.removeItem( 'user' );
  }

  static current() {
    return window.localStorage.user;
  }
  static fetch( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/current',
      data: data,
      responseType: 'json',
      method: 'GET'
   }, response => {
        this.setCurrent(response.user);
        callback();
   });
  }
  static login( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST'
   }, response => {
        this.setCurrent(response.user);
        callback(response);
   });
  }
  static register( data, callback = f => f ) {
    createRequest({
      url: this.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST'
   }, response => {
        this.setCurrent(response.user);
        callback(response);
   });
  }
  static logout( data, callback = f => f ) {
    createRequest({ method: 'POST', URL: this.URL + '/logout', data: data }, () => {
      this.unsetCurrent();
      App.setState( 'init' );
    });
  }
}
