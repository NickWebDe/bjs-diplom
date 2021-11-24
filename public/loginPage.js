"use strict" 

let user = new UserForm(); //Содаем обьект для нового логина пользователя

user.loginFormCallback = data => {
	ApiConnector.login(data, response => {
	if(response.success) {
	    location.reload();
	    return;
	} user.setLoginErrorMessage(response.error) //Выводим в консоль ошибку, информацию об ошибке берем из свойства колбэка
	});
};


user.registerFormCallback = data => {
	ApiConnector.register(data, response => {
		if(response.success) {
			location.reload();
			return;
		}
		user.setRegisterErrorMessage(response.error); //Выводим в консоль ошибку, информацию об ошибке берем из свойства колбэка
	});
}



