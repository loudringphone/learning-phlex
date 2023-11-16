# frozen_string_literal: true

class AdminMailer::Welcome < ApplicationView
  attr_reader :name

  def initialize(name:)
    @name = name
  end

  def template
    p { "Dear #{name}" }
    p(class: 'orange') { 'Welcome' }
    p(style: 'color: grey') do
      plain 'Please come visit my '
      a(href: 'https://winstonsportfolio95.netlify.app/', target: '_blank') { 'portfolio' }
      plain ' and hopefully you would '
      strong(id: 'salmon') { 'love' }
      plain ' my work.'
    end
    p do
      plain 'Best regards,'
      br
      plain 'Winston'
    end
  end
end
