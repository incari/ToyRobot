const svgTransform = {
    process() {
      return { code: 'export default {};' };
    },
    getCacheKey() {
      return 'svgTransform';
    },
  };
  
  export default svgTransform;