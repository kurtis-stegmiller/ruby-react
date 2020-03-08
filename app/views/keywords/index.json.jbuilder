json.set! 'data' do
  json.array! @keywords, partial: 'keywords/keyword', as: :keyword
end
json.set! 'pages' do
  json.total @keywords.total_pages
  json.current_page @keywords.current_page
  json.next_page @keywords.next_page
  json.prev_page @keywords.prev_page
end