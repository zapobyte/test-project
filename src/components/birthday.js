import { useMainStore } from '../stores/index';
const giveCakeOnDate = (date) => {
  const birthday = new Date();
  birthday.setHours(0, 0, 0, 0);
  birthday.setDate(date.getDate());
  birthday.setMonth(date.getMonth());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cakeDay = new Date(birthday);
  cakeDay.setHours(0, 0, 0, 0);
  
  // Note: Uncomment below logic to give cake next year if birthday is in the past
  // if (birthday <= today) {
  //   cakeDay.setFullYear(today.getFullYear() + 1);
  //   switch (cakeDay.getDay()) {
  //     case 0:
  //       cakeDay.setDate(cakeDay.getDate() + 2);
  //       break;
  //     case 6:
  //       cakeDay.setDate(cakeDay.getDate() + 3);
  //       break;
  //     case 5:
  //       cakeDay.setDate(cakeDay.getDate() + 3);
  //       break;
  //     default:
  //       cakeDay.setDate(cakeDay.getDate() + 1);
  //       break;
  //   }
  // } else {
  //   switch (birthday.getDay()) {
  //     case 0:
  //       cakeDay.setDate(birthday.getDate() + 2);
  //       break;
  //     case 6:
  //       cakeDay.setDate(birthday.getDate() + 3);
  //       break;
  //     case 5:
  //       cakeDay.setDate(birthday.getDate() + 3);
  //       break;
  //     default:
  //       cakeDay.setDate(birthday.getDate() + 1);
  //       break;
  //   }
  // }
  switch (birthday.getDay()) {
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
  return cakeDay.toISOString().split('T')[0];
};

const findCakeSize = (date) => {
  const birthday = new Date(date.valueOf());
  const store = useMainStore();

  const users = store.getUsers;

  const hasSameBirthday = users.find((item) => {
    const userDate = new Date(item.dob);
    return userDate.getDate() === birthday.getDate() && userDate.getFullYear() === birthday.getFullYear() && userDate.getMonth() === birthday.getMonth();
  });
  const cakeUserDate = giveCakeOnDate(birthday);
  let cakeType = {};
  if (hasSameBirthday) {
    cakeType = {
      date: cakeUserDate,
      size: 'Big',
      shared: {
        name: hasSameBirthday.name,
      },
    };
    return cakeType;
  }
  cakeType = {
    date: cakeUserDate,
    size: 'Small',
  };
  return cakeType;
};

export const birthdayCakeDecider = (date) => {
  const cake = findCakeSize(date);
  return cake;
};
