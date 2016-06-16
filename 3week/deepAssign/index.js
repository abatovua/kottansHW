'use strict';

const isEnum = Object.prototype.propertyIsEnumerable;

const deepAssign = function(to, ...from) {

  if (!isObject(to)) throw new TypeError(`${to} is not an Object`);

  from.forEach(src => {
    Reflect.ownKeys(src)
      .filter(key => isEnum.call(src, key))
      .forEach(prop => {
        if (to[prop] && isObject(src[prop])) {
          deepAssign(to[prop], src[prop]);

        } else if (src[prop] instanceof Date || src[prop] instanceof RegExp ||
                   src[prop] instanceof Map || src[prop] instanceof Set) {
          to[prop] = new src[prop].constructor(src[prop]);

        } else {
          to[prop] = src[prop];
        }
      });
  });

  return to;
};

function isObject(value) {
	return Object.prototype.toString.call(value).slice(8, -1) === 'Object';
}