//declaration
// function someName (a) {
//     //тело функции
//     return a + 1;
// };

//expression
// var someOther = function () {
//     //тело функции
// };

//стрелочная функция
//const someOther1 = (a) => a + 1;
//someOther();

const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

const isPalindrome = (string = '') => string.toLowerCase().replace(/\s/g, '') === Array.from(string.toLowerCase()).reverse().join('');
isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');