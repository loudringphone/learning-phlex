class AdminMailerPreview < ActionMailer::Preview
  def welcome
    # http://localhost:3000/rails/mailers/admin_mailer/welcome
    AdminMailer.welcome(user: User.last)
  end

  def portfolio
    AdminMailer.portfolio(user: User.last)
  end
end
