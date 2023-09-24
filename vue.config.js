module.exports = {
  configureWebpack: {
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      maxAssetSize: 244 * 1024, // Adjust this value as needed
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Check if module.context is not null
              if (module.context) {
                // Get the name of the package from the file path
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (packageName && packageName[1]) {
                  // You can customize the vendor chunk name as needed
                  return `vendor.${packageName[1].replace('@', '')}`;
                }
              }
              // Default name if no match is found
              return 'vendor';
            },
          },
        },
      },
    },
  },
};
