export const getNumberFromSting = (string) => {
  const regex = /\d+/; // Biểu thức chính quy để tìm số
  const match = string.match(regex);

  if (match) {
    return Math.ceil(+match[0]); // Chuyển đổi kết quả thành số nguyên
  }

  return null;
};
