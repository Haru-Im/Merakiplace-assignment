module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        alias: {
          '~/mobile-ui': './app/mobile-ui',
          '~/hooks': './app/hooks',
          '~/mobile-assets': './app/mobile-assets',
          '~/providers': './app/providers',
          '~/screens': './app/screens',
          '~/screens/*': './app/screens/*',
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
        },
      },
    ],
  ],
};
