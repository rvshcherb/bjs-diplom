const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
  // console.log(data);
  ApiConnector.login(data, (response) => {
    // console.log(response);
    if(response.success) {
      location.reload();
    } else {
      alert(response.error);
    }
  });
};

userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, (response) => {
    if(response.success) {
      location.reload();
    } else {
      alert(response.error);
    }
  });
};