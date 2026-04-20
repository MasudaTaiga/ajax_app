#!/usr/bin/env bash
# exit on error
set -o errexit

# 開発・テスト用Gemを除外してインストール
bundle install --without development test

# --trace を付けて詳細なエラーを表示させる
bundle exec rake assets:precompile --trace
bundle exec rake assets:clean

# マイグレーションにも --trace を追加
bundle exec rake db:migrate --trace