const color = {
  primary: '#F8CF84',
  second: '#F2AE1C',
  point: '#4C7031',
  pointHover: '#7AB152',
  danger: '#C50000',
  white: '#FFFFFF',
  black: '#333333',
  lightGray: '#C8C8C8',
  darkGray: '#616161',
}

const fontSize = {
  small: '1.4rem',
  large: '1.8rem',
  larger: '2.1rem',
  smh: '2.4rem',
  smmh: '3rem',
  mdh: '3.6rem',
  lgh: '4.8rem',
  sml: '6rem',
  lgl: '7.2rem',
}

// 반응형 모바일 사이즈(태블릿 ~ 모바일)
const device = {
  mobile: `screen and (max-width: 768px)`,
}

const Theme = {
  fontSize,
  color,
  device,
}

export default Theme
