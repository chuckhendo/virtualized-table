const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

export default function getStringWidth(inputText) {
  context.font = `16px "Helvetica Neue"`;
  const width = context.measureText(inputText).width;
  return Math.ceil(width) + 10;
}
