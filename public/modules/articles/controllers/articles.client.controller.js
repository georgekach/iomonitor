'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','$mdToast', '$animate',
	function($scope, $stateParams, $location, Authentication, Articles,$mdToast, $animate) {
		$scope.authentication = Authentication;
		
		// Toastr

		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};

		//2. the method looks for the position that we want to display the toast
		$scope.getToastPosition = function() {
			return Object.keys($scope.toastPosition)
				.filter(function(pos) { return $scope.toastPosition[pos]; })
				.join(' ');
		};

		//1. The send button will call this method
		$scope.sendMail = function() {
			$mdToast.show(
				$mdToast.simple()
					.content('Thanks for your Message  You Rock!')
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
		};


		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);