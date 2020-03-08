json.id keyword.id
json.keyword keyword.keyword
json.description keyword.description
json.url keyword.url
json.clicks keyword.clicks
json.created_at date_time_with_zone keyword.created_at
json.updated_at date_time_with_zone keyword.updated_at
# json.expire_on keyword.expire_on ? date_with_zone(keyword.expire_on)  : 'expired' unless keyword.pending?
json.expire_on keyword.expire_on ? mdy(keyword.expire_on)  : 'expired' unless keyword.pending?
json.expire_on "pending" if keyword.pending?
json.status keyword.status
json.subscription_id keyword.payments.last ? keyword.payments.last.subscription_id : ''