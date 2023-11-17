# frozen_string_literal: true

class Pages::About < ApplicationView
  def initialize
    page_title('About')
  end

  def template
    card_styles

    h1 { 'About page' }

    p(class: 'orange') { 'ABOUTABOUTABOUTABOUT' }
    p { 'Style tag in Phlex' }
    p(class: 'lightcoral', style: 'color: black') { 'inline style' }
  end

  def page_title(title)
    super(title)
  end

  def card_styles
    style do
      <<~CSS
        p {color: blueviolet}
      CSS
    end
  end
end
