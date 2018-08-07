#!/bin/bash -xe
jq ".version = \"1.0.${BUILD_NUMBER}\"" package.json > tmp
mv tmp package.json

yarn 
yarn build
yarn pack
ls
echo "Would do a release to npm here."

# ./update.sh ios-live 1.0.${BUILD_NUMBER} ${BRANCH_NAME}
# ./update.sh android-news-app 1.0.${BUILD_NUMBER} ${BRANCH_NAME}