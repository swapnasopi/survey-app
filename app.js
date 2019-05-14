var app = angular.module('surveyapp', []);

app.directive('survey', function(surveyFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = surveyFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('surveyFactory', function() {
	var questions = [
		{
			question: "Which is the correct website of convene services ltd",
			options: ["www.convene-tech.com", "www.convene.com", "www.convene.in", "www.convenetech.com"],
			answer: 0
		},
		{
			question: "Which of the given services is not in convene",
			options: ["CLOUD", "MOBILE", "TRAFFIC", "DEVOPS"],
			answer: 2
		},
		{
			question: "Which was the first country to issue paper currency?",
			options: ["USA", "France", "Italy", "China"],
			answer: 3
		},
		{
			question: "Which city hosted the 1996 Summer Olympics?",
			options: ["Atlanta", "Sydney", "Athens", "Beijing"],
			answer: 0
		},
		{	
			question: "Who invented telephone?",
			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
			answer: 1
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});