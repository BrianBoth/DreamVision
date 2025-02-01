import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os

cloud_name = os.getenv("CLOUDINARY_NAME")
api_key = os.getenv("CLOUDINARY_KEY")
secret = os.getenv("VIDEO_SECRET")


def video_upload(vid_url):    
  cloudinary.config( 
      cloud_name = cloud_name, 
      api_key = api_key,
      api_secret = secret,
      secure=True
  )

  # Upload an image
  upload_result = cloudinary.uploader.upload(vid_url,
                                            public_id="userID")
  print(upload_result["secure_url"])

  # Optimize delivery by resizing and applying auto-format and auto-quality
  optimize_url, _ = cloudinary_url("userID", fetch_format="auto", quality="auto")
  print(optimize_url)

  # Transform the image: auto-crop to square aspect_ratio
  auto_crop_url, _ = cloudinary_url("userID", width=500, height=500, crop="auto", gravity="auto")
  print(auto_crop_url)
  return auto_crop_url
