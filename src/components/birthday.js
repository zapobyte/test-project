import {useMainStore} from '../stores/index';
// • A small cake is provided on the employee’s first working day after their birthday.
// • All employees get their birthdays off
// • The office is closed on weekends
// • If the office is closed on an employee’s birthday, they get the next working day off.
// • If two or more employees share a birthday, we instead provide one large cake to share.
// • Emma’s date of birth is 25th June 1986. She gets a small cake on Monday 28th June 2022.
// • Rob’s date of birth is 4th July 1950. He gets Monday off and a small cake on Tuesday 5th July
// 2022.
// • Sam’s and Kate’s birthdays are both 11th July. They share a large cake on Tuesday 12th July
// 2022.
const switchDates = (date) => {
  const birthday = new Date();
  birthday.setHours(0,0,0,0);
  birthday.setDate(date.getDate());
  birthday.setMonth(date.getMonth());
  const today = new Date();
  today.setHours(0,0,0,0);
  const cakeDay = new Date(birthday);
  cakeDay.setHours(0,0,0,0);
  if(birthday <= today){
    cakeDay.setFullYear(today.getFullYear() + 1);  
    switch(cakeDay.getDay()){
      case 0:
        cakeDay.setDate(cakeDay.getDate() + 2);
        break;
      case 6:
        cakeDay.setDate(cakeDay.getDate() + 3);
        break;
      case 5:
        cakeDay.setDate(cakeDay.getDate() + 3);
        break;
      default:
        cakeDay.setDate(cakeDay.getDate() + 1);
        break;
    }
  } else {
    switch(birthday.getDay()){
      case 0:
        cakeDay.setDate(birthday.getDate() + 2);
        break;
      case 6:
        cakeDay.setDate(birthday.getDate() + 3);
        break;
      case 5:
        cakeDay.setDate(birthday.getDate() + 3);
        break;
      default:
        cakeDay.setDate(birthday.getDate() + 1);
        break;
    }
  }
  return cakeDay.toISOString().split('T')[0];
}

const getSmallCake = (date) => {
  const birthday = new Date(date.valueOf());
  const cake = switchDates(birthday);
  return cake;
};

const getBigCake = (date) => {
  const birthday = new Date(date.valueOf());
  const store = useMainStore();
  const users = store.getUsers;
  const hasSameBirthday = users.find((item)=> {
    const userDate = new Date(item.dob);
    return userDate.getDate() === birthday.getDate() && userDate.getFullYear() === birthday.getFullYear() && userDate.getMonth() === birthday.getMonth();
  })
  if(hasSameBirthday){
    const cake = switchDates(birthday);
    return cake;
  } else {
    return false;
  }
}

export const birthdayCakeDecider = (date) => {
  const birthday = new Date(date);
  const smallCakeDate = getSmallCake(birthday);
  const bigCakeDate = getBigCake(birthday);
  if(bigCakeDate) {
    return {
      size:'big',
      date: bigCakeDate,
    };
  } else {
    return {
      size:'small',
      date: smallCakeDate,
    };
  }
};