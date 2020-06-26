export default {
  colors: {
    background: '#001022',
    lightBackground: '#151D31',
    hoverColor: '#0B172A',
    nonFocusedTextColor: '#8A8E98',
    textColor: '#FFFFFF',
    mainColor: '#2D9CDB',
  },
  font: 'Ubuntu',
  fontBold: 'Ubuntu-Bold',
};

export interface Theme {
  colors: {
    background: string;
    lightBackground: string;
    hoverColor: string;
    nonFocusedTextColor: string;
    textColor: string;
    mainColor: string;
  };
  font: string;
  fontBold: string;
}