/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */

/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return new Date(value);
}

/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  return new Date(date.getFullYear(), 1, 29).getMonth() === 1;
}

/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  return new Date(endDate.getTime() - startDate.getTime()).toISOString().slice(11, -1);
}
/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  let hour = date.getUTCHours();
  if (hour > 12) {
    hour -= 12;
  }

  let angle = Math.abs(hour * 60 - date.getUTCMinutes() * 11);
  if (angle > 360) {
    angle -= 360;
  }
  return (0.5 * angle * Math.PI) / 180;
}

/**
 * Write a function that will help you determine the date
 * if you know the number of the day in the year,
 * as well as whether the year is a leap year or not.
 * The function accepts the day number and a boolean value isLeap as arguments,
 * and returns the corresponding date of the year as a string "Month, day".
 *
 * @param {number} day
 * @param {boolean} isLeap
 * @return {string}
 *
 * @example:
 *    getDay(41, false) => "February, 10"
 *    getDay(60, false) => "March, 1"
 *    getDay(60, true) => "February, 29"
 *    getDay(365, false) => "December, 31"
 *    getDay(366, true) => "December, 31"
 */
// passed
function getDay(day, isLeap) {
  // console.log(day,isLeap);
  const days_of_year = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const temp = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  if (isLeap) {
    days_of_year[1] = 29;
    const temp2 = [31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
    const result = monthDay(day, temp2, days_of_year);
    return result;
  }
  const result = monthDay(day, temp, days_of_year);
  return result;
}
// eslint-disable-next-line consistent-return
function monthDay(day, arr, days_of_year) {
  const info = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
  };
  for (let i = 0; i < 12; i++) {
    if (day <= arr[i]) {
      const month = i + 1;
      date = days_of_year[i] - (arr[i] - day);
      return `${info[month]}, ${date}`;
    }
  }
}

module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
  getDay,
};
