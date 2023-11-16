# frozen_string_literal: true

class ApplicationLayout < ApplicationView
  include Phlex::Rails::Layout
  include Phlex::Rails::Helpers::LinkTo
  include Phlex::Rails::Helpers::Routes

  def template(&block)
    doctype

    html do
      head do
        title { @@title || 'Default Page Title' }
        meta name: 'viewport', content: 'width=device-width,initial-scale=1'
        csp_meta_tag
        csrf_meta_tags
        stylesheet_link_tag 'application', data_turbo_track: 'reload'
        javascript_importmap_tags
      end

      body do
        nav(id: 'navbar') do
          link_to 'Home', home_path
          link_to 'Search', search_path
          link_to 'About', about_path
          link_to 'Mailers', 'rails/mailers', target: '_blank' if Rails.env.development?
        end
        main(&block)
      end
    end
  end
end
