#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Load the original logo
logo_path = "/Users/hskim/Documents/-   RESOURCE/LOGO/THEYOOL/PNG/자산 4@20x.png"
insta_text_path = "/Users/hskim/Desktop/스크린샷 2025-11-07 16.54.50.png"
output_path = "/Users/hskim/theyool/public/images/insta-logo.png"

# Load images
logo = Image.open(logo_path)
insta_text = Image.open(insta_text_path)

# Get dimensions
logo_width, logo_height = logo.size

# The original logo has "법무법인 | 더율" at the bottom
# We need to create a new image with "Insta | 더율"

# Create new image with same size
new_logo = Image.new('RGBA', logo.size, (255, 255, 255, 0))

# Extract just the symbol part (top portion)
# Based on the image, the symbol is roughly in the top 60% of the image
symbol_height = int(logo_height * 0.6)
symbol = logo.crop((0, 0, logo_width, symbol_height))

# Paste the symbol
new_logo.paste(symbol, (0, 0), symbol if symbol.mode == 'RGBA' else None)

# Now we need to add "Insta | 더율" text at the bottom
# First, let's resize the Insta text to fit properly
insta_width, insta_height = insta_text.size

# Calculate the scaling factor
# The "법무법인" part is roughly 40% of the logo width
target_insta_width = int(logo_width * 0.25)
scale_factor = target_insta_width / insta_width
new_insta_height = int(insta_height * scale_factor)

# Resize insta text
insta_resized = insta_text.resize((target_insta_width, new_insta_height), Image.Resampling.LANCZOS)

# Position for "Insta" text (left side, bottom area)
insta_x = int(logo_width * 0.05)  # 5% from left
insta_y = int(logo_height * 0.7)   # 70% down

# Paste Insta text
if insta_resized.mode == 'RGBA':
    new_logo.paste(insta_resized, (insta_x, insta_y), insta_resized)
else:
    new_logo.paste(insta_resized, (insta_x, insta_y))

# Extract "더율" part from original logo
# The text area is in the bottom 40% of the image
text_area = logo.crop((0, symbol_height, logo_width, logo_height))

# Find the "더율" part (it's after the "|" divider)
# We'll crop from roughly 50% onwards of the text area
theyool_x_start = int(logo_width * 0.4)
theyool_part = logo.crop((theyool_x_start, symbol_height, logo_width, logo_height))

# Paste "더율" part to the right of "Insta"
theyool_x = insta_x + target_insta_width + int(logo_width * 0.05)
new_logo.paste(theyool_part, (theyool_x, symbol_height), theyool_part if theyool_part.mode == 'RGBA' else None)

# Save the new logo
new_logo.save(output_path, 'PNG')
print(f"Created Insta logo at: {output_path}")
print(f"Size: {new_logo.size}")
