# frozen_string_literal: true

class Pages::Home < ApplicationView
  def initialize
    page_title('Home')
    @minus = 1 - 7
    @plus = 1 + 7
    user = User.last
    @obj = { name: user.name, email: user.email }.to_json
  end

  def template
    div(data_controller: 'home', data_home_obj: @obj, data_home_minus: @minus, data_home_plus: @plus) do
      h1(class: 'orange') { 'Home page' }
      p(class: 'navy', style: 'user-select: none') do
        plain 'Please come visit my '
        a(href: 'https://winstonsportfolio95.netlify.app/', target: '_blank') { 'portfolio' }
        plain ' and hopefully you would '
        strong(id: 'salmon') { 'love' }
        plain ' my work.'
      end

      button(id: 'reset') { 'Reset' }

      render CardComponent.new(url: 'https://winstonsportfolio95.netlify.app/')
    end
  end

  def page_title(title)
    super(title)
  end
end
