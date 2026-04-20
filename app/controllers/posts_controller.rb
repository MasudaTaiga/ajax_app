class PostsController < ApplicationController
  # 一覧表示（トップページなど）を表示するためのアクション
  def index
    # Postモデルを使って、データベースの全ての投稿を取得します。
    # order(id: "DESC") により、新しい投稿が上に来るように「IDの降順」で並べ替えています。
    @posts = Post.order(id: "DESC")
  end

  # 新規投稿ページを表示するためのアクション（今回はJSで送るので中身は空でもOK）
  def new
  end

  # 投稿データを保存するためのアクション
  def create
    # binding.pry # デバッグ用：ここで処理を止めて中身を確認したい時にコメントアウトを外します

    # JavaScriptから送られてきたデータ（params[:content]）を元に、新しい投稿を作成して保存します。
    # 作成されたデータは変数 post に代入されます。
    post = Post.create(content: params[:content])

    # 元々は index へリダイレクトしていましたが、今回は非同期通信（Ajax）のためコメントアウトされています。
    # redirect_to action: :index

    # JavaScript側へ「保存したデータ」をJSON形式で送り返します。
    # これにより、ページをリロードせずに、ブラウザ側で新しい投稿を表示するなどの処理が可能になります。
    render json:{ post: post }
  end
end