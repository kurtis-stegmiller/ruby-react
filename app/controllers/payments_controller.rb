# payments controller
class PaymentsController < ApplicationController
  protect_from_forgery except: %i[create]

  layout false, only: %i[index create]

  # GET /payments
  # GET /payments.json
  # def index
  #   return if current_user.nil?
  #   @payments = current_user.payments.recent_first if params[:user_id].nil?
  #   return if params[:user_id].nil?
  #   @user = User.find(params[:user_id])
  #   @payments = @user.payments.recent_first
  #   render 'payments/index', layout: 'modal'
  # end

  # GET /payments/1
  # GET /payments/1.json
  def show
    payment_params = PaymentProcessor.success_page(payment_hash_params)

    logger.error '='*50
    logger.error payment_params
    logger.error '='*50
    @payment = Payment.where(payment_params).first if payment_params != false

    if @payment.nil?
      head :no_content
      # redirect_to root_path, alert: 'Error processing payment'
    else
      keyword = current_user.keywords.pending.find(params[:keyword])
      @payment.user = current_user
      @payment.keyword = keyword
      @payment[:start_date] = Time.zone.now if @payment[:start_date].nil?
      interval = Subscription.find(payment_params[:subscription_id])
                             .rails_interval
      @payment[:end_date] = @payment[:start_date] + eval(interval)

      @payment.save
      keyword.active!

      redirect_to root_path,
                  success: 'Thank You! Your keyword subscription is now active!'
    end
  end

  # POST /payments
  # POST /payments.json
  def create
    # user = user.find(params[:id])
    pay_params = PaymentProcessor.process(payment_hash_params)
    # logger.error '-'*50
    # logger.error payment_params
    # logger.error '-'*50
    @payment = Payment.create!(pay_params) if pay_params

    head :no_content
  end

  # POST /payment
  # POST /payment.json
  def new
    subscription = Subscription.find(params[:payment][:subscription_id])
    start_date = Time.zone.now
    end_date = start_date + eval(subscription.rails_interval)
    payment = Payment.new(payment_params.merge(
        user: current_user,
        status:'approved',
        ip:request.remote_ip,
        start_date: start_date,
        end_date: end_date))

    if payment.save
      payment.keyword.active!
      render json: {save: 'ok'}
    else
      render json: payment.errors, status: :unprocessable_entity
    end
  end

  private

  def payment_hash_params
    params.except(:controller, :action, :format).to_unsafe_h
  end

  # Never trust parameters from the scary internet,
  # only allow the white list through.
  def payment_params
    params.require(:payment).permit(:user_id, :keyword_id, :subscription_id)
  end
end
