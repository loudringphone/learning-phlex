# frozen_string_literal: true

class CardComponent < ApplicationComponent
  attr_reader :url

  def initialize(url:)
    @url = url
  end

  def template
    div(class: 'card') do
      a(href: url, target: '_blank') do
        h1 { url }
      end
    end
  end
end
