/**
 * Created by kono on 2014/01/24.
 */

'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('cyViewerApp')
    .factory('Network', ['$resource', function ($resource) {
        return $resource('data/:filename', {filename: '@filename'});
    }]
);