# %%
import os
import requests

# File containing a list of image URLs
output_dir = "images"
os.makedirs(output_dir, exist_ok=True)

def download_image(url):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        filename = os.path.join(output_dir, os.path.basename(url))

        with open(filename, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")

for i in range(1, 48):
    url = f'https://lwi.nexon.com/maplestory/guide/char_info/char_view/char{i}.jpg'
    download_image(url)

print("Download complete!")

# %%
