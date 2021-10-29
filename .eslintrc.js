module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "es6": true,
    "browser": true
  },
  "rules": {
    "linebreak-style": ["error", "windows"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
};
