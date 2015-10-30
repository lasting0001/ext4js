# cache4js
A extension for js/nodejs API.

##How to use ?   
1、install  
npm install ext4js   
2、init
````javascript
var CACHE_TYPE = {
    TEST_CACHE: {RECYCLE_TIME: 1000 * 5, SHOW_LOG: true},
    TEST_CACHE_1: {RECYCLE_TIME: 1000 * 10, SHOW_LOG: true}
};
var cache = require('cache4js')(CACHE_TYPE);
````
for global use:
````javascript
global.CACHE_TYPE = {
    TEST_CACHE: {RECYCLE_TIME: 1000 * 5, SHOW_LOG: true},
    TEST_CACHE_1: {RECYCLE_TIME: 1000 * 10, SHOW_LOG: true}
};
global._Cache = require('cache4js')(CACHE_TYPE);
````
3、common use:   
````javascript
cache.add(CACHE_TYPE.TEST_CACHE, 1, {value:'abc'});
cache.add(CACHE_TYPE.TEST_CACHE_1, 1, {value:'abc'});

var obj = cache.get(CACHE_TYPE.TEST_CACHE, 1);
console.log(obj.value); //print:abc

setTimeout(function () {
    var obj = cache.get(CACHE_TYPE.TEST_CACHE, 1);
    console.log(obj && obj.value || 'null'); //print:null,already recycled in 5s
}, 6000);
````
4、exact time use    
````javascript
var obj = cache.get(CACHE_TYPE.TEST_CACHE, 1);
// time in ms
if (obj && obj.__time + 5000 > Date.now()) {
    // do sth
    console.log(obj.value);
}
````
5、for multi-use   
````javascript
var CACHE_TYPE = {
    TEST_CACHE: {RECYCLE_TIME: 1000 * 5, SHOW_LOG: true},
    TEST_CACHE_1: {RECYCLE_TIME: 1000 * 10, SHOW_LOG: true}
};
var cache1 = require('cache4js')(CACHE_TYPE);
var cache2 = require('cache4js')(CACHE_TYPE);
````
cache1 and cache2 are totally seperated.   


##API
1、config type
````javascript
var CACHE_TYPE = {
    TEST_CACHE: {RECYCLE_TIME: 1000 * 5, SHOW_LOG: true},
    TEST_CACHE_1: {RECYCLE_TIME: 1000 * 10, SHOW_LOG: true,VALID_CHECK:false}
};
var cache = require('cache4js')(CACHE_TYPE);
````
RECYCLE_TIME: the life time of the special cache obj,count in milliseconds.Default:600000ms;   
-------------------------------------------|------------------------------------------------------------------------------------------------------------   
SHOW_LOG: it will show the log when the cache obj be recycled only if this config is true;   
-------------------------------------------|------------------------------------------------------------------------------------------------------------   
VALID_CHECK: it will not recycle anything only if this config is false and has no RECYCLE_TIME config;   
-------------------------------------------|------------------------------------------------------------------------------------------------------------   
2、interface   
````javascript
add(type,key,obj);   
get(type,key);   
del(type,key);   
addType(type);   
getType(type);   
delType(type);   
clearType(type);   
````
For more details,please refer to the code.   
   
   
## Contributing   
Contributions welcome   
   
## License   
The original cache4js was distributed under the Apache 2.0 License, and so is this. I've tried to   
keep the original copyright and author credits in place, except in sections that I have rewritten   
extensively.   
   
