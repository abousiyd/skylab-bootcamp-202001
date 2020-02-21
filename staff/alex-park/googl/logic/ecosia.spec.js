'use strict';

describe('ecosia through proxy', function () {
    it('should return an Array', function (done) {
        ecosia('pepito', function(results) {
            expect(results instanceof Array).toBe(true);

            done();
        });
    });

    it('should show objects inside the main array', function (done) {
        ecosia('pepito', function(results) {
            results.forEach(function(result) {
                expect(result instanceof Object).toBe(true);
            })
            
            done();
        });
    });

    it('should throw a TypeError if the callback is not defined', function (done) {
        expect(function() {
            ecosia('pepito');
        }).toThrowError(TypeError, 'undefined is not a function');

        done();
    })

    it('should throw a TypeError if the callback is not a function', function (done) {
        expect(function() {
            ecosia('pepito', 'a');
        }).toThrowError(TypeError, 'a is not a function');

        done();
    })
});
