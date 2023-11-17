# frozen_string_literal: true

class Pages::Mailers < ApplicationView
  include Phlex::Rails::Helpers::LinkTo
  attr_reader :id

  def initialize(id:)
    page_title('Mailer')
    @id = id
  end

  def template
    admin_mailer = '/rails/mailers/admin_mailer'
    src = id ? "#{admin_mailer}/#{id}" : admin_mailer
    iframe(
      src: src,
      frameborder: '0',
      allowfullscreen: true,
      data_controller: 'iframe',
      data_iframe_id: id
    )
  end

  def page_title(title)
    super(title)
  end

  def iframe_style
    style do
      <<~CSS
        iframe {
          width: 100vw;
          height: 100vh;
        }
      CSS
    end
  end
end
