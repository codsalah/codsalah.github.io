module Jekyll
    class TagPageGenerator < Generator
      safe true
  
      def generate(site)
        # ابحث عن الـ collection باسم "articles"
        articles_collection = site.collections.find { |label, _| label == "articles" }
        articles = articles_collection ? articles_collection[1].docs : []
  
        # اجمع الـ tags يدويًا من الـ articles ووحد شكلها
        all_tags = articles.map { |post| post.data["tags"] }.flatten.uniq
        # وحد الـ tags بتحويلها لـ lowercase واستبدال المسافات بـ -
        all_tags = all_tags.map { |tag| tag.downcase.gsub(/\s+/, "-") }.uniq
  
        # ولد صفحة لكل tag
        all_tags.each do |tag|
          site.pages << TagPage.new(site, tag)
        end
      end
    end
  
    class TagPage < Page
      def initialize(site, tag)
        @site = site
        @tag = tag
  
        # استخدم الـ tag الأصلي في المسار، لكن التأكد من إنه موحد
        super(site, site.source, "tag/#{tag}", "index.html")
  
        self.data["layout"] = "tag"
        self.data["tag"] = tag
        self.data["title"] = "Tag: #{tag}"
      end
    end
  end