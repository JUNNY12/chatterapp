/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
     extend: {
        fontFamily: {
          'roboto':['Roboto Flex', 'sans-serif'],
        },
          backgroundImage: {
            'notfound': "url('/images/404.svg')"
          },
       colors: {
         pink: {
           50: '#fdf6fc',
           100: '#fcebfc',
           200: '#f7d7f5',
           300: '#f0b7ea',
           400: '#e68cdc',
           500: '#d65fc9',
           600: '#ba40aa',
           700: '#993289',
           800: '#7d2b6f',
           900: '#67285b',
           950: '#430f39',
         },
         white: {
           50: '#ffffff',
           100: '#efefef',
           200: '#dcdcdc',
           300: '#bdbdbd',
           400: '#989898',
           500: '#7c7c7c',
           600: '#656565',
           700: '#525252',
           800: '#464646',
           900: '#3d3d3d',
           950: '#292929',
         },
         black: {
           50: '#f7f7f7',
           100: '#e3e3e3',
           200: '#c8c8c8',
           300: '#a4a4a4',
           400: '#818181',
           500: '#666666',
           600: '#515151',
           700: '#434343',
           800: '#383838',
           900: '#313131',
           950: '#000000',
         },
       },
       screens: {
         desktop: {
           max: '2560px'
         },
         laptopL: {
           max: '1600px'
         },
         laptopM: {
           max: '1440px'
         },
         laptopS: {
           max: '1280px'
         },
         tabletXL: {
           max: '1200px'
         },
         tabletL: {
           max: '1024px'
         },
         tabletM: {
           max: '920px'
         },
         tabletS: {
           max: '768px'
         },
         tabletXS: {
           max: '640px'
         },
         mobileXL: {
           max: '540px'
         },
         mobileL: {
           max: '425px'
         },
         mobileM: {
           max: '375px'
         },
         mobileS: {
           max: '320px'
         },
       },
     },
   },
  plugins: [],
};
