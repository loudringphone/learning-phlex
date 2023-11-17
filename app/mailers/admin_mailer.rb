class AdminMailer < ApplicationMailer
  default from: 'from@example.com'
  # layout 'mailer'
  layout -> { MailerLayout }

  def welcome(user:)
    mail(to: user.email, subject: 'Welcome!') do |format|
      format.html do
        # html = modified_html_with_inject_style(Pages::Welcome.new(name: name))
        # render html
        render(Welcome.new(name: user.name))
      end
    end
  end

  def portfolio(user:)
    mail(to: user.email, subject: 'Come see my portfolio!') do |format|
      format.html do
        render(Portfolio.new(name: user.name))
      end
    end
  end

  def self.mails
    instance_methods(false) - ApplicationMailer.instance_methods(false)
  end

  private

  def modified_html_with_inject_style(view)
    content = render_to_string(view)
    doc = Nokogiri::HTML(content)
    # turn the style tag on the erb file to a string
    style = doc.at_css('style').content
    parser = CssParser::Parser.new
    # parser.load_uri!(file) is to loard css file
    parser.load_string!(style)
    # no need to do the below if the erb has no media specific rules; inline style/email could not be responsive to different media conditions
    # keys = parser.rules_by_media_query.keys
    # keys.delete(:all)
    # parser.each_rule_set do |set|
    #   parser.remove_rule_set!(set, keys)
    # end
    selectors = get_selectors(parser)
    selectors.each do |selector|
      doc.css(selector).each do |element|
        # styles take precedence original inline styles > rest
        element['style'] = parser.find_by_selector(selector).join + element['style'].to_s
      end
    end
    doc.to_html.html_safe
  end

  def get_selectors(parser)
    selectors = parser.each_selector.map { |selector| selector }
    with_hash, without_hash = selectors.partition { |selector| selector.include?('#') }
    with_dot, without_dot_and_hash = without_hash.partition { |selector| selector.include?('.') }
    sort_and_combine_selectors(with_hash, with_dot, without_dot_and_hash)
  end

  # styles take precedence ids > classes > rest
  def sort_and_combine_selectors(with_hash, with_dot, without_dot_and_hash)
    (with_hash.sort_by { |s| -s.index('#') }) + (with_dot.sort_by { |s| -s.index('.') }) + without_dot_and_hash.sort
  end
end
