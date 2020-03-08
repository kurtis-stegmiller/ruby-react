json.partial! 'pages/user_subscriptions', subs: @subs unless logged_in?(:admin)
json.partial! 'pages/admin_subscriptions', subs: @subs if logged_in?(:admin)