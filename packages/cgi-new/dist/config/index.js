"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const fs = require('fs');
const path = require('path');
let c = null;
function getConfig() {
    if (c) {
        return c;
    }
    const env = process.env.ENV || process.env.NODE_ENV || 'dev';
    const defaultConfig = require('./default');
    const devConfig = require('./dev');
    const preConfig = require('./dev');
    const prodConfig = require('./prod');
    let config = Object.assign({}, defaultConfig);
    if (env === 'prod') {
        config = Object.assign(Object.assign({}, config), prodConfig);
    }
    else if (env === 'pre') {
        config = Object.assign(Object.assign({}, config), preConfig);
    }
    else {
        config = Object.assign(Object.assign({}, config), devConfig);
    }
    c = config;
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb25maWcvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFFYixTQUFnQixTQUFTO0lBQ3ZCLElBQUksQ0FBQyxFQUFFO1FBQ0wsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUVELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztJQUM3RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFckMsSUFBSSxNQUFNLHFCQUFRLGFBQWEsQ0FBRSxDQUFDO0lBQ2xDLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtRQUNsQixNQUFNLG1DQUFRLE1BQU0sR0FBSyxVQUFVLENBQUUsQ0FBQztLQUN2QztTQUFNLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtRQUN4QixNQUFNLG1DQUFRLE1BQU0sR0FBSyxTQUFTLENBQUUsQ0FBQztLQUN0QztTQUFNO1FBQ0wsTUFBTSxtQ0FBUSxNQUFNLEdBQUssU0FBUyxDQUFFLENBQUM7S0FDdEM7SUFFRCxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ1gsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXRCRCw4QkFzQkMifQ==