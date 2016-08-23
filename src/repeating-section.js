/* global angular */

export default ngModule => {

  ngModule.config([ 'formlyConfigProvider', formlyConfigProvider => {

    var unique = 1;

    formlyConfigProvider.setType({
      name: 'repeatSection',
      template: require('./repeating-section.html'),
      controller: [ '$scope', function($scope) {

        // private functions

        var addNew = function addNew() {
          $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
          var repeatsection = $scope.model[$scope.options.key];
          var lastSection = repeatsection[repeatsection.length - 1];
          var newsection = {};

          if (lastSection) {
            newsection = angular.copy(lastSection);
          }

          repeatsection.push(newsection);
        }

        var copyFields = function copyFields(fields) {
          var addRandomIds = function addRandomIds(fields) {
            var getRandomInt = function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
            }

            unique++;
            angular.forEach(fields, function(field, index) {
              if (field.fieldGroup) {
                addRandomIds(field.fieldGroup);
                return; // fieldGroups don't need an ID
              }

              if (field.templateOptions && field.templateOptions.fields) {
                addRandomIds(field.templateOptions.fields);
              }

              field.id = field.id || (field.key + '_' + index + '_' + unique + getRandomInt(0, 9999));
            });
          }
          fields = angular.copy(fields);
          addRandomIds(fields);
          return fields;
        }

        var init = function init() {
          var defaultTranslations = {
            remove: 'Remove',
            add: 'Add'
          };

          $scope.formOptions = {formState: $scope.formState};
          $scope.addNew = addNew;
          $scope.copyFields = copyFields;
          $scope.to.translations = $scope.to.translations || defaultTranslations;
        }

        init();

      }]

    });

  }]);

}
