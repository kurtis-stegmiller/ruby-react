# keywords controller
class KeywordsController < ApplicationController
  respond_to :json
  before_action :set_keyword, only: %i[show edit update destroy]

  # GET /keywords
  # GET /keywords.json
  def index
    page = params[:page] || 1
    @keywords = current_user.keywords.recent_first.page(page).per(10)
  end

  # GET /keyword-lookup
  def lookup
    keywords = Keyword.by_keyword(params[:keyword]).active.to_a
    Keyword.by_keyword(params[:keyword]).pending.each do |kw|
      if kw.unpaid_expired?
        kw.destroy
      else
        keywords << kw
      end
    end
    if keywords.length.zero?
      render json: { keyword: 'available' }
    else
      render json: { keyword: 'unavailable' }
    end
  end

  # GET /keywords/1
  # GET /keywords/1.json
  def show; end

  # POST /keywords
  # POST /keywords.json
  def create
    @keyword = Keyword.new(keyword_params)
    @keyword.user = current_user

    if @keyword.save
      render :show, status: :created, location: @keyword
    else
      render json: @keyword.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /keywords/1
  # PATCH/PUT /keywords/1.json
  def update
    if @keyword.update(keyword_params)
      render :show, status: :ok, location: @keyword
    else
      render json: @keyword.errors, status: :unprocessable_entity
    end
  end

  # DELETE /keywords/1
  # DELETE /keywords/1.json
  def destroy
    @keyword.destroy
    head :no_content
  end

  # DELETE /keywords-delete
  # DELETE /keywords-delete.json
  def destroy_selected
    current_user.keywords.where(id: params[:ids]).destroy_all
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_keyword
    @keyword = current_user.keywords.find(params[:id])
  end

  # Never trust parameters from the scary internet,
  # only allow the white list through.
  def keyword_params
    params.require(:keyword).permit(:user_id, :keyword, :description, :url, :clicks)
  end
end
