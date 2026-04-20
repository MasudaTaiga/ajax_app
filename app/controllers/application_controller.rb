class ApplicationController < ActionController::Base
  before_action :basic_auth
 

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      # ユーザー名をキー、パスワードを値としたハッシュを作成
      auth_list = {
        ENV["BASIC_AUTH_USER"] => ENV["BASIC_AUTH_PASSWORD"],
        ENV["BASIC_AUTH_USER_2"] => ENV["BASIC_AUTH_PASSWORD_2"] # 2つ目のアカウント
      }
  
      # 入力されたusernameがハッシュのキーに存在し、かつパスワードが一致するか確認
      auth_list[username] == password
    end
  end
end