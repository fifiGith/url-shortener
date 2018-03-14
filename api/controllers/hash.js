var base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPKRSTUVWXYZ"

module.exports.encode = function(num) {
	var str = '';
	var base = 62;

	while (num > 0) {
		str = base62[num % base] + str;
		num = Math.floor(num / base);
		console.log(num);
	}

	console.log(str);
	return str;
}

module.exports.decode = function(str) {
	var n = str.length;

	while (n) {

	}
}