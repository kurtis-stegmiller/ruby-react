json.array! subs do |sub|
  json.id sub.id
  json.name sub.name
  json.description sub.description
  json.period t("subscription_types.#{Subscription::TYPES[sub.period]}")
  json.amount sub.amount % 1 == 0 ? "#{number_to_human(sub.amount)}.-" : sub.amount
  json.per_month number_with_precision(sub.amount / Subscription::DIVIDE_BY_TYPES[sub.period], precision: 0) if Subscription::DIVIDE_BY_TYPES[sub.period]
  json.discount number_to_percentage(sub.discount,precision: 0) if sub.discount
  json.currency sub.currency
  json.payment_url sub.payment_url+thrive_pass_through(current_user)
end
