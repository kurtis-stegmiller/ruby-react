json.array! @payments do |payment|
  json.id payment.id
  json.order_id payment.order_id
  json.start_date format_date(payment.start_date) unless payment.start_date.nil?
  json.end_date format_date(payment.end_date) unless payment.end_date.nil?
  json.amount number_to_currency(payment.amount,unit: "#{payment.currency} ")
# json.subscription payment.subscription
  json.status t("payments.types.#{Payment::TYPES[payment.status]}")
end
