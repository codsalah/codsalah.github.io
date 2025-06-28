module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = []
      
      # Collect tags from posts
      site.posts.docs.each do |post|
        tags.concat(post.data['tags'] || [])
      end
      
      # Collect tags from articles if they exist
      if site.collections['articles']
        site.collections['articles'].docs.each do |article|
          tags.concat(article.data['tags'] || [])
        end
      end
      
      # Remove duplicates and sort
      tags = tags.flatten.uniq.sort
      
      # Generate a page for each tag
      tags.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = "tag/#{tag}"
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "Posts tagged with \"#{tag}\""
      self.data['description'] = "All posts and articles tagged with #{tag}"
    end
  end
end
