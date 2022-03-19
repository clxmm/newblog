#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
# cd clxmm

# # 如果是发布到自定义域名
# echo 'www.clcmm.org' > CNAME

# git init
# git add -A
# git commit -m 'treemap'

# # 如果发布到 https://<USERNAME>.github.io
# git push -f https://github.com/clxmm/clxmm.github.io master

# cd -