#!/bin/sh

# Create the env.js file with the environment variable
echo "window.env = {" > /usr/share/nginx/html/env.js
for i in $(env | grep BOOK_URL)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)
    echo "  $key: '$value'," >> /usr/share/nginx/html/env.js
done
echo "};" >> /usr/share/nginx/html/env.js

# Replace all occurrences of placeholders in JS and CSS files
find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|BOOK_URL_PLACEHOLDER|$BOOK_URL|g" '{}' +
