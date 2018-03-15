var base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPKRSTUVWXYZ"
var base = 62;

module.exports.encode = function(num) {
	var str = '';

	while (num) {
		str = base62[num % base] + str;
		num = Math.floor(num / base);
	}
	return str;
}

module.exports.decode = function(str) {
	var n = str.length;
	var decoded = 0;

	while (str) {
		var index = base62.indexOf(str[0]);
		var power = str.length - 1; 
		decoded += index * (Math.pow(base, power));
    	str = str.substring(1);
	}
	return decoded;
}