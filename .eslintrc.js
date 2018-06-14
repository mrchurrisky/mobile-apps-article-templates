const path = require('path');

module.exports = {
    "env": {
        "browser": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "extends": "airbnb-base",
    "settings": {
        "import/resolver": {
            "node": {
                "paths": [
                    path.resolve(__dirname, 'ArticleTemplates/assets/js')
                ]
            }
        }
    },
    "rules": {
        "indent": [2, 4],
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0
    },
    'globals': {
        '__webpack_public_path__': true,
        'MobileRangeSlider': true,
        'GU': true,
        'YT': true,
        'twttr': true,
        'curl': true,
    }
};
