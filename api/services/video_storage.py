import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
import os
import uuid

cloud_name = os.getenv("CLOUDINARY_NAME")
api_key = os.getenv("CLOUDINARY_KEY")
secret = os.getenv("VIDEO_SECRET")


def video_upload(vid_url, userid):    
  cloudinary.config( 
      cloud_name = cloud_name, 
      api_key = api_key,
      api_secret = secret,
      secure=True
  )
  public_id = str(uuid.uuid4()) 

  # Upload an image //change userID to actual userID 
  upload_result = cloudinary.uploader.upload(vid_url,
                                            public_id=public_id)
  print(upload_result["secure_url"])

  optimize_url, _ = cloudinary_url(public_id, fetch_format="auto", quality="auto")
  print(optimize_url)

  auto_crop_url, _ = cloudinary_url(public_id, width=500, height=500, crop="auto", gravity="auto")
  print(auto_crop_url)
  return auto_crop_url
