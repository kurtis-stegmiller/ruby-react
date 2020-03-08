json.array! subs do |sub|
  json.id sub.id
  json.name sub.name
  json.description sub.description
  json.period t("subscription_types.#{Subscription::TYPES[sub.period]}")
end
