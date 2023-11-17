require 'rails_helper'

RSpec.describe AdminMailer, type: :mailer do
  describe 'welcome' do
    let(:user) { create(:user, name: 'Winston', email: 'winston@example.com') }

    it 'sends a welcome email' do
      mail = AdminMailer.welcome(user: user)
      # Premailer::Rails::Hook.perform(mail)
      expect(mail.subject).to eq('Welcome!')
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(['from@example.com'])
      expect(mail.body.encoded).to include('https://winstonsportfolio95.netlify.app/')
      expect(mail.body.encoded).to include('class="orange" style="color: orange; font-size: x-large;"')
    end
  end
end
