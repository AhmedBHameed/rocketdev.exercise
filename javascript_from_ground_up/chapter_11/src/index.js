import './css/style.css';
// Write your code here.

let primavera = [
  '#DDFFBD',
  '#B7FAA5',
  '#95E0D7',
  '#A7A5E2',
  '#A7A5E2',
  '#A7A5E2',
  '#816C95',
  '#FF85FE',
  '#FF85FE',
];

let fireworks = [
  '#E9C698',
  '#FE8856',
  '#E0404B',
  '#6C3F77',
  '#AA64D6',
  '#AA64D6',
  '#D9B5B9',
];

let jardin = ['#B0D164', '#476E4D', '#6BB071', '#B2DEA6', '#DAE0DE', '#F7F7E4'];

let playa = ['#F2EAE2', '#EBD4B7', '#F0B452', '#D48C25', '#6F89BF', '#BEC3E3'];

let estambre = [
  '#FAE2BE',
  '#C2BABA',
  '#8D8C9C',
  '#C9D998',
  '#E3F1B7',
  '#EEE5E0',
];

let celebration = [
  '#A7E376',
  '#E2EB67',
  '#EBED9F',
  '#8EE8C0',
  '#3CBA90',
  '#C298E0',
];

function primaveraColors(arrOfColors, colorCategoryName) {
  let colorContainer = document.createElement('div');
  colorContainer.className = 'color-container';
  let colorCategorySmall = document.createElement('small');
  colorCategorySmall.className = 'color-category-name';
  colorCategorySmall.textContent = colorCategoryName;
  colorContainer.appendChild(colorCategorySmall);

  for (let i = 0; i < arrOfColors.length; i++) {
    let colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = arrOfColors[i];

    let colorSpan = document.createElement('span');
    colorSpan.className = 'hex-color';
    colorSpan.textContent = arrOfColors[i];

    colorBox.appendChild(colorSpan);
    colorContainer.appendChild(colorBox);
  }

  return colorContainer;
}

const container = document.createElement('div');
container.className = 'container';

const primaveraColorsContent = primaveraColors(primavera, 'Primavera');
const fireworksColorsContent = primaveraColors(fireworks, 'Fireworks');

[primaveraColorsContent, fireworksColorsContent].forEach((el) => {
  container.append(el);
});

const wrapper = document.createElement('section');
wrapper.className = 'wrapper';
wrapper.appendChild(container);
document.body.append(wrapper);
