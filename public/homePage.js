// Logout Btn
const logoutButton = new LogoutButton();
logoutButton.action = function() { 
  ApiConnector.logout((response) => {
   // console.log(result);
    if(response.success) {
      location.reload();
     } else {
       alert(response.error);
     }
  });
};


// User Profile
ApiConnector.current((response) => {
  // console.log(response);
  if(response.success) {
    ProfileWidget.showProfile(response.data);
    
   } else {
     alert(response.error);
   }
});

// Currency Rates
const ratesBoard = new RatesBoard();
ratesBoard.loadStocks = function() {
  ApiConnector.getStocks((response) => {
    //console.log(response);
    if(response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      alert(result.error);
    }
  });
};

ratesBoard.loadStocks();
setInterval(ratesBoard.loadStocks, 60000);

// Money Manager
const moneyManager = new MoneyManager();



moneyManager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, (response) => {
    // console.log(response);
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(response.success, 'Пополнение счета выполнено успешно!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function(data) {
  // console.log(data);
  ApiConnector.convertMoney(data, (response) => {
    // console.log(response);
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(response.success, 'Конвертация выполнена успешно!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
};

moneyManager.sendMoneyCallback = function(data) {
  // console.log(data);
  ApiConnector.transferMoney(data, (response) => {
    // console.log(response);
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(response.success, 'Перевод выполнен успешно!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
};

// Favorites
const favoritesWidget = new FavoritesWidget(); 

ApiConnector.getFavorites((response) => {
  // console.log(response);
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    alert(response.error);
  }
});

favoritesWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data,(response) => {
    // console.log(response);
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      this.setMessage(response.success, 'Пользователь добавлен в избранное!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = function(data) {
  ApiConnector.removeUserFromFavorites(data,(response) => {
    // console.log(response);
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      this.setMessage(response.success, 'Пользователь удален из избранного');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
};