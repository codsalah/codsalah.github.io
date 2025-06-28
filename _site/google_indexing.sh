#!/bin/bash
# Google Indexing Helper Script

# This script uses curl to submit URLs to Google for indexing
# Usage: ./google_indexing.sh [options]

# Color codes for output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

# Site URL
SITE_URL="https://codsalah.github.io"

# Submit sitemap to Google (opens browser)
submit_sitemap() {
  echo -e "${YELLOW}Opening Google Search Console to submit your sitemap...${RESET}"
  echo "Please sign in with your Google account and submit the sitemap at:"
  echo -e "${GREEN}https://search.google.com/search-console/sitemaps?resource_id=${SITE_URL}${RESET}"
  
  # Try to open browser based on OS
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "https://search.google.com/search-console/sitemaps?resource_id=${SITE_URL}" 2>/dev/null || true
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://search.google.com/search-console/sitemaps?resource_id=${SITE_URL}" 2>/dev/null || true
  fi
}

# Request Google to fetch your homepage
request_indexing() {
  echo -e "${YELLOW}Opening Google's Inspect URL tool for your homepage...${RESET}"
  echo "Please sign in with your Google account and click 'REQUEST INDEXING' for:"
  echo -e "${GREEN}${SITE_URL}${RESET}"
  
  # Try to open browser based on OS
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "https://search.google.com/search-console/inspect?resource_id=${SITE_URL}&url=${SITE_URL}" 2>/dev/null || true
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://search.google.com/search-console/inspect?resource_id=${SITE_URL}&url=${SITE_URL}" 2>/dev/null || true
  fi
}

# Ping search engines with your sitemap
ping_search_engines() {
  echo -e "${YELLOW}Pinging search engines with your sitemap...${RESET}"
  
  # Google
  curl -s "https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml" > /dev/null
  echo -e "${GREEN}✓${RESET} Pinged Google"
  
  # Bing
  curl -s "https://www.bing.com/ping?sitemap=${SITE_URL}/sitemap.xml" > /dev/null
  echo -e "${GREEN}✓${RESET} Pinged Bing"
}

# Check if your site is indexed
check_indexed() {
  echo -e "${YELLOW}Checking if your site is indexed by Google...${RESET}"
  echo "Opening Google search for: site:${SITE_URL}"
  
  # Try to open browser based on OS
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "https://www.google.com/search?q=site:${SITE_URL}" 2>/dev/null || true
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://www.google.com/search?q=site:${SITE_URL}" 2>/dev/null || true
  fi
}

# Main menu
echo -e "${GREEN}============================================${RESET}"
echo -e "${GREEN}       Google Indexing Helper Tool         ${RESET}"
echo -e "${GREEN}============================================${RESET}"
echo ""
echo "This script will help you get your site indexed by Google."
echo ""
echo "What would you like to do?"
echo "1) Submit sitemap to Google Search Console"
echo "2) Request Google to index your homepage"
echo "3) Ping search engines with your sitemap"
echo "4) Check if your site is indexed"
echo "5) Do all of the above"
echo "q) Quit"
echo ""
read -p "Enter your choice (1-5, q): " choice

case $choice in
  1)
    submit_sitemap
    ;;
  2)
    request_indexing
    ;;
  3)
    ping_search_engines
    ;;
  4)
    check_indexed
    ;;
  5)
    submit_sitemap
    sleep 2
    request_indexing
    sleep 2
    ping_search_engines
    sleep 2
    check_indexed
    ;;
  q|Q)
    echo "Goodbye!"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Exiting.${RESET}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}Done!${RESET}"
echo "Note: It may take some time (days to weeks) for Google to index your site."
echo "Continue creating quality content and sharing your site online to improve indexing." 