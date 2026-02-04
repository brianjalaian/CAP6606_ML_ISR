#!/bin/bash
# Inject Netlify Identity and auth-gate.js into all HTML files

BUILD_DIR="_build/html"

# Copy auth-gate.js to build output
cp auth-gate.js "$BUILD_DIR/"

# The script tags to inject before </head>
HEAD_SCRIPTS='<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>'

# The script tags to inject before </body>
BODY_SCRIPTS='<script src="/auth-gate.js"></script>
<script>
  // Initialize Netlify Identity
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/";
        });
      }
    });
  }
</script>'

# Find all HTML files and inject scripts
find "$BUILD_DIR" -name "*.html" -type f | while read -r file; do
  echo "Injecting auth into: $file"

  # Inject before </head>
  sed -i.bak "s|</head>|${HEAD_SCRIPTS}</head>|" "$file"

  # Inject before </body>
  sed -i.bak "s|</body>|${BODY_SCRIPTS}</body>|" "$file"

  # Remove backup files
  rm -f "${file}.bak"
done

echo "Auth injection complete!"
