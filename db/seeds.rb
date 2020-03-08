u = Array.new

u[0] = User.create!(email: 'af@boxonline.com',password:'asdQWE123')
u[1] = User.create!(email: 't@boxonline.com',password:'asdQWE123', roles: :admin)


50.times { |counter| Keyword.create!(keyword: "keyword-#{counter+1}", url: 'https://kinetizine.com', clicks: counter, user: u[counter%2])}

Subscription.create!(name: 'Monthly',description: 'No risk, cancel anytime', period: 4, product_id: 10, amount: 123, currency: 'CHF', payment_url:'https://checkout.boxonline.com/123-mo/')
Subscription.create!(name: '6 months',description: 'Ideal for testing the service', period: 6, product_id: 11, amount: 438, discount:40, currency: 'CHF', payment_url:'https://checkout.boxonline.com/123-6mo/')
Subscription.create!(name: '1 year',description: 'Best value', period: 7, product_id: 12, amount: 497, discount:66, currency: 'CHF', payment_url:'https://checkout.boxonline.com/123-yr/')
