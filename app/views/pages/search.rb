# frozen_string_literal: true

include Phlex::Rails::Helpers::AssetPath

class Pages::Search < ApplicationView
  include Phlex::Rails::Helpers::StyleSheetLinkTag

  def initialize
    page_title('Search')
  end

  def template
    head do
      stylesheet_link_tag 'search', data_turbo_track: 'reload'
    end

    div(data_controller: 'search', data_search_audio_urls: audio_urls.to_json) do
      h1 { 'Image Search' }

      form(id: 'search') do
        label do
          plain ' Search terms: '
          input(
            type: 'search',
            id: 'query',
            required: true,
            autofocus: true,
            placeholder: 'Type your search here...'
          )
          button { 'Search' }
        end
      end

      button(id: 'backTop') { 'Top' }

      button(id: 'btnFly') { 'Fly!' }

      div(id: 'images')
    end
  end

  private

  def page_title(title)
    super(title)
  end

  def audio_urls
    {
      audio1: asset_path('audio1.mov'),
      audio2: asset_path('audio2.mov'),
      audio3: asset_path('audio3.mov'),
      audio4: asset_path('audio4.mov'),
      audio5: asset_path('audio5.mov')
    }
  end
end
