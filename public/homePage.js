"use strict"
let objLogout = new LogoutButton();
let excRates = new RatesBoard();
let moneyOperation = new MoneyManager();
let favoritList = new FavoritesWidget();


objLogout.action = () => ApiConnector.logout(response => {
	if(response.success) { 
		location.reload();
	}
});

ApiConnector.current(response => {
	if(response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

const excange = () => ApiConnector.getStocks(response => {
	if(response.success) {
		excRates.clearTable();
		excRates.fillTable(response.data);
	}
});

excange();

setInterval(excange,60000)

moneyOperation.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
	if(response.success) {
		ProfileWidget.showProfile(response.data);
		moneyOperation.setMessage(response.success, 'Баланс успешно пополнен');
	}   moneyOperation.setMessage(response.success, response.error);
});

moneyOperation.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
	if(response.success) {
		ProfileWidget.showProfile(response.data);
		moneyOperation.setMessage(response.success, 'Конвертация выполнена успешно');
		return;
	} moneyOperation.setMessage(response.success, response.error)
});

moneyOperation.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
	console.log(data);
	if(response.success) {
		ProfileWidget.showProfile(response.data);
		moneyOperation.setMessage(response.success, 'Перевод выпонен успешно');
		return;
	} moneyOperation.setMessage(response.success, response.error)

});

ApiConnector.getFavorites(response => {
	if(response.success) {
		favoritList.clearTable();
		favoritList.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
	}
});

favoritList.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
	console.log(response);
	if(response.success) {
		favoritList.clearTable();
		favoritList.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
		favoritList.setMessage(response.success, 'Пользователь успешно добавлен');
		return;
	} favoritList.setMessage(response.success, response.error);		
});

favoritList.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, response => {
	console.log(response);
	if(response.success) {
		favoritList.clearTable();
		favoritList.fillTable(response.data);
		moneyOperation.updateUsersList(response.data);
		favoritList.setMessage(response.success, 'Пользователь успешно удален');
		return;
	} favoritList.setMessage(response.success, response.error);		
});