(function() {
	var filters = angular.module('filters', []);

	filters.filter('ellipsis', function() {
		return function(input, length) {
			length = length || 125;
			if(!angular.isString(input)) {
				return input;
			}
			if(input.length > length)
				return input.substring(0, length) + '...';
			else
				return input;
		}
	})
})()