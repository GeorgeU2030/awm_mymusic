
const developmentConfig = {
    API_BASE_URL: 'http://localhost:8000', 
  };
  
  const productionConfig = {
    API_BASE_URL: 'https://tu-servidor-en-produccion.com', 
  };
  
  const config = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
  
  export default config;
  