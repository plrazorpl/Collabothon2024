module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFC72C',       
        'primary-dark': '#002f3f', 
        'primary-light': '#FFFFFF',
        'text-primary': '#003750',  
        'text-secondary': '#52616A',
        'text-light': '#FFFFFF',    
        'bg-primary': '#eaf5eb',    
        'bg-secondary': '#E9ECEF',  
        'bg-hover': '#D6D8DA',      
        'border-color': '#2c4c40',  
        'accent-success': '#00B41E',
        'accent-danger': '#D9534F', 
        'accent-warning': '#FFBC00',
        'shadow-color': 'rgba(0, 0, 0, 0.1)', 
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
