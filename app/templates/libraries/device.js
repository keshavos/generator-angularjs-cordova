/**
 * Platform specific code
 * @device Android 4+
 * @author A.Hill
 */

NUMERO.Hardware.handleOKCancel = function(btnIndex){
    var button = {
		1: 'OK',
		2: 'Cancel'
	};
	
    if(button[btnIndex]!=undefined){
        return button[btnIndex];
    } else {
        throw new Error('Button index not defined.');
    }
}

NUMERO.Device = NUMERO.Device || {};

NUMERO.Device.logout = function(){
	injector.invoke(['MenuModel', function(MenuModel){
		MenuModel.close();
	}]);
}