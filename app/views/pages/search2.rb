# frozen_string_literal: true

class Pages::Search2 < ApplicationView
  include Phlex::Rails::Helpers::AssetPath
  include Phlex::Rails::Helpers::ContentFor
  include Phlex::Rails::Helpers::StyleSheetLinkTag

  def initialize
    page_title('Search2')
  end

  def template
    content_for :styles do
      stylesheet_link_tag 'search', data_turbo_track: 'reload'
    end

    div(data_controller: 'search2', data_search2_audio_urls: audio_urls.to_json) do
      h1(data_action: 'click->search2#search') { 'Image Search2' }

      form(id: 'search', data_action: 'submit->search2#search') do
        label do
          plain ' Search terms: '
          input(
            type: 'search',
            id: 'query',
            data_search2_target: 'terms',
            required: true,
            autofocus: true,
            placeholder: 'Type your search here...'
          )
          button { 'Search' }
        end
      end

      button(id: 'backTop', data_action: 'click->search2#backTop') { 'Top' }

      button(id: 'btnFly', data_action: 'click->search2#fly') { 'Fly!' }

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
