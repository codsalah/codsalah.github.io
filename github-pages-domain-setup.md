# GitHub Pages Domain Setup

This document explains how your blog is set up to work with GitHub Pages URL (`codsalah.github.io`).

## How It Works

1. **Primary domain**: The site uses the GitHub Pages domain `codsalah.github.io`
2. **GitHub Pages hosting**: GitHub automatically serves the site from the repository
3. **SEO benefits**: Canonical URLs ensure proper SEO handling

## Key Files and Settings

### 1. Repository Configuration

The repository is configured to use the default GitHub Pages domain without a custom CNAME file.

### 2. _config.yml

The configuration specifies the GitHub Pages domain:
```yaml
url: "https://codsalah.github.io" # GitHub Pages domain
baseurl: "" # Empty for sites at the root of domain
canonical_url: true # Ensures proper canonical URL handling
```

### 3. Canonical URLs

The `<link rel="canonical">` tag in the HTML head tells search engines which version of the URL is the "official" one. This prevents duplicate content issues.

## GitHub Pages Configuration

The site is configured to use the default GitHub Pages domain:

1. **Repository name**: `codsalah.github.io`
2. **GitHub Pages source**: Main branch
3. **Domain**: Automatically served at `https://codsalah.github.io`

2. **For the GitHub Pages domain**:
   - No additional configuration needed - GitHub handles this automatically

## Benefits of This Setup

1. **Branding**: Your custom domain reinforces your personal/professional brand
2. **Fallback**: If your custom domain has issues, the GitHub Pages domain still works
3. **SEO**: Search engines will understand both URLs refer to the same content
4. **Flexibility**: You can change your primary domain in the future without losing traffic

## Maintenance

If you need to change domains in the future:

1. Update the `url` in `_config.yml`
2. Update the `CNAME` file with your new domain
3. Update your DNS settings
4. The canonical URL tags will ensure a smooth transition for SEO

## Troubleshooting

- If your custom domain isn't working, check DNS propagation (can take up to 48 hours)
- Verify HTTPS is enforced in your GitHub repository settings
- Check GitHub Pages settings to ensure your custom domain is properly recognized 