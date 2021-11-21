"use strict" 

let user = new UserForm(); //Содаем обьект для нового логина пользователя

user.loginFormCallback = data => {
	ApiConnector.login(data, response => {
	console.log(response)
	if(response.success) {
		location.reload();
	} user.setLoginErrorMessage(response.error) //Выводим в консоль ошибку, информацию об ошибке берем из свойства колбэка
	});
};

user.registerFormCallback = data => {
	ApiConnector.register(data, response => {
		if(response.success) {
			user.setRegisterErrorMessage('Вы успешно зарегистрировались!');
			setTimeout(() => location.reload(), 1500);
			return;
		}
		user.setRegisterErrorMessage(response.error); //Выводим в консоль ошибку, информацию об ошибке берем из свойства колбэка
	}
	);
}

ApiConnector.current(data => {
	if(true) {
		ProfileWidget.showProfile(data);
		console.log('debugging')
	}
	console.log('nothing'); 
});


