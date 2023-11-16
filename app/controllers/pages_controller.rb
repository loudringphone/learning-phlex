# frozen_string_literal: true

class PagesController < ApplicationController
  layout -> { ApplicationLayout }

  def home
    render Pages::Home.new
  end

  def about
    render Pages::About.new
  end

  def search
    render Pages::Search.new
  end
end
