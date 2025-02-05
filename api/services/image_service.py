import gradio as gr
from gradio_client import Client
from services.video_storage import video_upload

client = Client("black-forest-labs/FLUX.1-schnell")

def generate_img(text):
    result = client.predict(
        prompt=text,
        seed=0,
        randomize_seed="true",
        width=1024,
        height=1024,
        num_inference_steps=10, # higher steps higher accuracy
        api_name="/infer"
    )
    return result[0] # this is the temporary path

def generate_path(dream_description):
    # generates ai image
    temp_path = generate_img(dream_description)
    # stores generated temp path in cloudinary
    public_url = video_upload(temp_path)
    return {"img_url": public_url}
