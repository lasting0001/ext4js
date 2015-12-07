/**
 * Created by jun.li on 10/30.
 */
'use strict';
//系统库函数的扩展
//var _iconvLite = require('iconv-lite');
//_iconvLite.extendNodeEncodings();// 扩展系统编码

var _util = require('util');


// 时间格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

// 日期加天数
Date.prototype.addDate = function (count) {
    if (!isNaN(count)) {
        this.setDate(this.getDate() + count);
        return this;
    }
};

// 日期复制
Date.prototype.clone = function () {
    return new Date(this);
};

// 静态方法，检测日期合法性
Date.checkValid = function (date) {
    if (date && !isNaN(new Date(date).getTime())) {
        return true;
    }
    return false;
};

// 默认参数
Date.DEFAULT_FORMAT = 'yyyy-MM-dd';
Date.DEFAULT_TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss';

// 静态方法，将日期格式化
Date.getDateFormat = function (format, date) {
    if (!format) {
        format = 'yyyyMMddhhmmss'
    } else if (format === '-') {
        format = Date.DEFAULT_TIME_FORMAT;
    }
    return (date || new Date()).format(format);
};

// 日期2字符串(格式：2015-10-30)
Date.prototype.toStr = function () {
    var date = this;
    return Date.getDateFormat(Date.DEFAULT_FORMAT, date);
};


// 删除字符串某字符
String.prototype.deleteCharAt = function (index) {
    var str = this + '';
    if (index < 0 || index > str.length) {
        return this;
    }
    return str.slice(0, index) + str.slice(index + 1);
};

// 是否包含另一字符串
String.prototype.containsIgnoreCase = function (str) {
    if (str && (this + '').match(new RegExp(str, 'i'))) {
        return true;
    }
    return false;
};

// 是否相等(不区分大小写)
String.prototype.equalsIgnoreCase = function (str) {
    if (str && (this + '').match(new RegExp('^' + str + '$', 'i'))) {
        return true;
    }
    return false;
};

//String.prototype.toGbk = function () {
//    return _iconvLite.encode(this, 'gbk');
//};

// 替换所有(参数不能为空)
String.prototype.replaceAll = function (find, rep) {
    return (this + '').replace(new RegExp(find, 'gm'), rep);
};

// 字符串格式化
// 对于sql语句本身就有DATE_FORMAT(date,"%Y-%m-%d")的语句，
// 需更改为双%的形式DATE_FORMAT(date,"%%Y-%%m-%%d")，而且参数个数最多只能一个
String.prototype.format = function () {
    var str = this + '';
    var repls = arguments;
    if (repls.length > 0 && Array.isArray(repls[0])) {
        repls = repls[0];
    }
    for (var i = 0; i < repls.length; i++) {
        var value = repls[i];
        if (typeof value === 'string' || typeof value === 'number') {
            str = _util.format(str, value);
        }
    }
    return str;
};

// 是否包含中文
String.prototype.containsChinese = function () {
    var str = this;
    var pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (!pattern.exec(str)) {
        return false;
    } else {
        return true;
    }
};

// 字符串2日期(格式：2015-10-30)
String.prototype.toDate = function () {
    var str = this;
    return new Date(str.substr(0, 4) || 0, parseInt(str.substr(5, 2) || 0) - 1, str.substr(8, 2) || 0, 0, 0);
};