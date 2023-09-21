require('dotenv').config();


const generateCode = (value) => {
  value = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .join('');
  let code = '';
  const merge = value + process.env.SECRET_GENERATE;
  let length = merge.length;
  for (let i = 0; i < 10; i++) {
    const index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2);
    code += merge.charAt(index);
    length = index;
  }
  return `${value.charAt(0)}${code}`.toUpperCase();
};

export default generateCode;
