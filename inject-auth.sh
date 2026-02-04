#!/bin/bash
# Inject Netlify Identity and auth-gate.js into all HTML files

BUILD_DIR="_build/html"

# Copy auth files to build output
cp auth-gate.js "$BUILD_DIR/"
cp auth.html "$BUILD_DIR/"

echo "Injecting authentication scripts into HTML files..."

# Find all HTML files and inject scripts
find "$BUILD_DIR" -name "*.html" -type f | while read -r file; do
  echo "Processing: $file"

  # Create a temp file for the modified content
  tmpfile=$(mktemp)

  # Read the file, inject scripts, write to temp
  cat "$file" | \
    sed 's|</head>|<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script></head>|' | \
    sed 's|</body>|<script src="/auth-gate.js"></script></body>|' > "$tmpfile"

  # Replace original with modified
  mv "$tmpfile" "$file"
done

echo "Auth injection complete!"
echo "Files processed:"
find "$BUILD_DIR" -name "*.html" -type f | wc -l
