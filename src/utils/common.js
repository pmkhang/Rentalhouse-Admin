// export const getNumberFromSting = (string) => {
//   const regex = /\d+/; // Biểu thức chính quy để tìm số
//   const match = string.match(regex);

//   if (match) {
//     return Math.ceil(+match[0]); // Chuyển đổi kết quả thành số nguyên
//   }

//   return null;
// };

export const getNumberFromSting = (string) => {
  let output;
  if (string.includes('đồng/tháng')) {
    output = +string.replace(/[^\d.,]/g, '') / 1000;
  } else if (string.includes('triệu/tháng')) {
    output = +string.replace(/[^\d.,]/g, '');
  } else if (string.includes('m2')) {
    output = +string.match(/\d+/);
  } else {
    return (output = 0);
  }
  return output;
};
