# Phlex Learning Repository

Welcome to my learning repository where I document my journey of converting existing Ruby on Rails mailers from HTML.erb to Ruby using Phlex. This endeavor has not only involved transitioning to Phlex but also delving into tools like Premailer for inline styling and exploring the integration of Hotwire Stimulus for JavaScript functionality.

## Why Phlex?

### Better Developer Experience
Phlex offers a familiar and enjoyable development experience. Views in Phlex are "plain old Ruby objects," and templates are expressed as methods, making it feel like JSX for Ruby on Rails.

### Improved Safety
With Phlex, view templates render in an isolated execution context. Only specific instance variables and methods are exposed, reducing the risk of unintended side effects.

### Enhanced Performance
Rendering Phlex views is significantly faster compared to traditional rendering methods such as ActionView partials or ViewComponent components.

## Conversion Process

1. **HTML.erb to Ruby with Phlex**
   - I've been converting existing mailers from HTML.erb to Ruby using Phlex. This involves adapting to Phlex's approach of representing views as Ruby objects with template methods.

2. **Premailer for Inline Styles**
   - I've learned to use Premailer, a gem that injects inline styles into the email templates. This ensures compatibility with email clients that require inline styling.

3. **Hotwired Stimulus for JavaScript**
   - Phlex allows incorporating Hotwired Stimulus for handling JavaScript functionality within Ruby views. This is similar to having a JavaScript section in HTML.erb files but more seamlessly integrated.

## Repository Structure

- **/mailer:** Contains the converted mailer written in Ruby with Phlex.
- **/examples:** Provides usage examples and demonstrations of Phlex features, including:
  - **Hotwired Stimulus Integration:** Learn how to seamlessly integrate Hotwired Stimulus for handling JavaScript functionality within Phlex views.
  - **Premailer Usage:** Explore examples showcasing the integration of Premailer to inject inline styles into email templates, ensuring compatibility with various email clients.
- **/learning_notes:** Documentation of key learnings, and solutions encountered during the conversion process.
