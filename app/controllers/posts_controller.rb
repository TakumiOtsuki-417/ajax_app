class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    Post.create(content: params[:content])
    # メモを保存した後に、トップページへ遷移するようにする。
    # その際にpostsテーブルを読込むindexアクションを利用させてもらう。
    redirect_to action: :index 
  end
end
