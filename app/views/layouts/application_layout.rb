# frozen_string_literal: true

class ApplicationLayout < ApplicationView
  include Phlex::Rails::Layout
  include Phlex::Rails::Helpers::LinkTo
  include Phlex::Rails::Helpers::Routes
  include Phlex::Rails::Helpers::ContentFor

  def template(&block)
    doctype

    html do
      head do
        title { @@title || 'Default Page Title' }
        meta name: 'viewport', content: 'width=device-width,initial-scale=1'
        csp_meta_tag
        csrf_meta_tags
        stylesheet_link_tag 'application', data_turbo_track: 'reload'
        yield(:styles) if content_for?(:styles)
        javascript_importmap_tags
      end

      body(data_controller: 'app') do
        nav(class: 'navbar') do
          link_to 'Home', home_path
          link_to 'Search', search_path
          link_to 'Search2', search2_path
          link_to 'About', about_path
          if Rails.env.development?
            a(class: 'admin-mailer', href: mailers_path) { 'Mailers' }
            AdminMailer.mails.each do |mail|
              a(class: 'mail', href: "#{mailers_path}/#{mail}") { mail.capitalize }
            end
          end
        end
        main(&block)
      end
    end
  end
end
