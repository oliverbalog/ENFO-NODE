module.exports = {
    resolve: {
      fallback: { 
        "url": require.resolve("url/"),
        "fs": false,
        "crypto": require.resolve("crypto-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "child_process": false,
        "zlib": require.resolve("browserify-zlib"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "dgram": false,
        "async_hooks": false,
      }
    }
  };