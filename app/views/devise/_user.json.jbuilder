json.id user.id
json.email user.email
json.avatar gravatar
json.is_admin 1 if logged_in?(:admin)