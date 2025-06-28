# How to Use Multilingual Articles and Chapter Navigation

This guide explains how to use the multilingual support and chapter navigation features in your blog.

## Table of Contents

1. [Setting Up Language Versions](#setting-up-language-versions)
2. [Setting Up Chapter Navigation](#setting-up-chapter-navigation)
3. [Combining Languages and Chapters](#combining-languages-and-chapters)
4. [File Naming Conventions](#file-naming-conventions)
5. [Examples](#examples)
6. [How It Works](#how-it-works)
7. [Best Practices](#best-practices)

## Setting Up Language Versions

To make an article available in multiple languages:

1. **Add language metadata** to each article's frontmatter:

   ```yaml
   ---
   layout: post
   title: Your Article Title
   lang: en  # Current language of this article
   lang_versions:
     en: /YYYY/MM/DD/article-name-en  # Path to English version
     ar: /YYYY/MM/DD/article-name-ar  # Path to Arabic version
   ---
   ```

2. **For RTL languages** (like Arabic), add the direction attribute:

   ```yaml
   ---
   layout: post
   title: عنوان المقال
   lang: ar
   direction: rtl  # Required for right-to-left languages
   lang_versions:
     en: /YYYY/MM/DD/article-name-en
   ---
   ```

3. **Create separate files** for each language version with matching frontmatter.

## Setting Up Chapter Navigation

For multi-chapter content like books or tutorials:

1. **Add chapter metadata** to each article's frontmatter:

   ```yaml
   ---
   layout: post
   title: Chapter 1: Introduction
   series_id: "unique-series-name"  # Identifies the series
   chapters:
     - title: "Chapter 1: Introduction"
       url: "/YYYY/MM/DD/chapter-1"
     - title: "Chapter 2: Main Content"
       url: "/YYYY/MM/DD/chapter-2"
     - title: "Chapter 3: Conclusion"
       url: "/YYYY/MM/DD/chapter-3"
   ---
   ```

2. **For all chapters except the first**, add `is_chapter: true` to hide them from the main index:

   ```yaml
   ---
   layout: post
   title: Chapter 2: Main Content
   series_id: "unique-series-name"
   is_chapter: true  # Hides this chapter from the main index
   chapters:
     - title: "Chapter 1: Introduction"
       url: "/YYYY/MM/DD/chapter-1"
     - title: "Chapter 2: Main Content"
       url: "/YYYY/MM/DD/chapter-2"
   ---
   ```

3. **Ensure all chapters** list the complete chapter navigation array.

## Combining Languages and Chapters

To create multilingual chapter-based content:

1. **Add both language and chapter metadata** to each article:

   ```yaml
   ---
   layout: post
   title: Book Title - Chapter 1
   lang: en
   lang_versions:
     ar: /YYYY/MM/DD/chapter-1-ar
   series_id: "book-series-name"
   chapters:
     - title: "Chapter 1: Introduction"
       url: "/YYYY/MM/DD/chapter-1"
     - title: "Chapter 2: Main Content"
       url: "/YYYY/MM/DD/chapter-2"
   ---
   ```

2. **For translated chapters**, ensure you:
   - Update the `lang` field
   - Reverse the `lang_versions` to point to the original
   - Translate the chapter titles
   - Update chapter URLs to match translated versions

   ```yaml
   ---
   layout: post
   title: عنوان الكتاب - الفصل الأول
   lang: ar
   direction: rtl
   lang_versions:
     en: /YYYY/MM/DD/chapter-1
   series_id: "book-series-name"
   chapters:
     - title: "الفصل 1: مقدمة"
       url: "/YYYY/MM/DD/chapter-1-ar"
     - title: "الفصل 2: المحتوى الرئيسي"
       url: "/YYYY/MM/DD/chapter-2-ar"
   ---
   ```

## File Naming Conventions

Follow a consistent naming pattern for your files:

- **English articles**: `YYYY-MM-DD-article-name.md` or `YYYY-MM-DD-article-name-en.md`
- **Arabic articles**: `YYYY-MM-DD-article-name-ar.md`
- **Chapter articles**: `YYYY-MM-DD-chapter-name-ch1.md`, `YYYY-MM-DD-chapter-name-ch2.md`
- **Multilingual chapters**: `YYYY-MM-DD-chapter-name-ch1-ar.md`

## Examples

### Example 1: Multilingual Article (English version)

```yaml
---
layout: post
title: Getting Started with Jekyll
description: A guide to Jekyll for beginners
thumbnail: "/photos/jekyll/thumbnail.png"
tags: ["jekyll", "tutorial"]
lang: en
lang_versions:
  ar: /2024/05/15/getting-started-with-jekyll-ar
---
```

### Example 2: Chapter-based Tutorial (First chapter)

```yaml
---
layout: post
title: Python Basics - Part 1
description: Introduction to Python programming
thumbnail: "/photos/python/basics.png"
tags: ["python", "programming"]
series_id: "python-basics"
chapters:
  - title: "Part 1: Getting Started"
    url: "/2024/05/20/python-basics-part1"
  - title: "Part 2: Data Types"
    url: "/2024/05/27/python-basics-part2"
  - title: "Part 3: Control Flow"
    url: "/2024/06/03/python-basics-part3"
---
```

### Example 3: Multilingual Chapter Tutorial (Arabic chapter 2)

```yaml
---
layout: post
title: أساسيات بايثون - الجزء 2
description: أنواع البيانات في بايثون
thumbnail: "/photos/python/basics.png"
tags: ["python", "programming"]
lang: ar
direction: rtl
lang_versions:
  en: /2024/05/27/python-basics-part2
series_id: "python-basics"
is_chapter: true
chapters:
  - title: "الجزء 1: البدء"
    url: "/2024/05/20/python-basics-part1-ar"
  - title: "الجزء 2: أنواع البيانات"
    url: "/2024/05/27/python-basics-part2-ar"
  - title: "الجزء 3: التحكم بالتدفق"
    url: "/2024/06/03/python-basics-part3-ar"
---
```

## How It Works

1. **Language switching**: When `lang_versions` is present, a language dropdown appears in the top navbar
2. **Chapter navigation**: When `chapters` is present, a chapter dropdown appears in the article
3. **Both features can be used together** and operate independently:
   - Switch languages within the same chapter
   - Navigate between chapters within the same language
4. **Index filtering**: Articles with `is_chapter: true` are hidden from the main index
5. **RTL support**: Articles with `direction: rtl` are rendered right-to-left

## Best Practices

1. **Consistency**: Ensure all chapters list all other chapters
2. **Complete translations**: Provide full translations for all content
3. **URL structure**: Maintain consistent URL patterns across languages and chapters
4. **Navigation text**: Include instructions in your content explaining how to use the navigation
5. **RTL handling**: Always add `direction: rtl` for right-to-left languages
6. **Series organization**: Use meaningful `series_id` values to group related content
7. **Comprehensive metadata**: Include all necessary metadata in each file's frontmatter
8. **File naming**: Follow consistent naming conventions for all files 