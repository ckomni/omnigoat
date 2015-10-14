Paperclip.interpolates :associated_post_category do |attachment, style|
  attachment.instance.post.category.name
end

Paperclip.interpolates :post_id do |attachment, style|
  attachment.instance.post.id
end

Paperclip.interpolates :name do |attachment, style|
  attachment.instance.name
end
