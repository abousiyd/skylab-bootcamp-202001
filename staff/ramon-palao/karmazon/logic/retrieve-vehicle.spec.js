'use strict';

describe('retrieveVehicle', function () {
    it('should succeed on matching id', function (done) {
        retrieveVehicle('FJV58', function (results) {
            expect(results).toBeDefined();

            done();
        });
    });

    it('should fail on non-string id', function () {
        expect(function () {
            retrieveVehicle(undefined, function () { });
        }).toThrowError(TypeError, 'undefined is not a string');

        expect(function () {
            retrieveVehicle(1, function () { });
        }).toThrowError(TypeError, '1 is not a string');

        expect(function () {
            retrieveVehicle(true, function () { });
        }).toThrowError(TypeError, 'true is not a string');

        expect(function () {
            retrieveVehicle({}, function () { });
        }).toThrowError(TypeError, '[object Object] is not a string');
    });

    it('should fail on non-function callback', function () {
        expect(function () {
            retrieveVehicle('', undefined);
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function () {
            retrieveVehicle('', 1);
        }).toThrowError(TypeError, '1 is not a function');

        expect(function () {
            retrieveVehicle('', true);
        }).toThrowError(TypeError, 'true is not a function');

        expect(function () {
            retrieveVehicle('', {});
        }).toThrowError(TypeError, '[object Object] is not a function');
    });
});