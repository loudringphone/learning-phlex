class MailerLayout < Phlex::HTML
  include Phlex::Rails::Helpers::StyleSheetLinkTag
  include Phlex::Rails::Layout

  def template(&block)
    doctype
    html do
      head do
        meta(charset: 'UTF-8')
        meta(http_equiv: 'X-UA-Compatible', content: 'IE=edge')
        meta(name: 'viewport', content: 'width=device-width, initial-scale=1')
        title { 'Sherpa' }
        stylesheet_link_tag 'mailer/styles', media: 'all', 'data-turbolinks-track': 'reload'
      end
      body(style: 'max-width: 600px; margin: auto', &block)
    end
  end
end
