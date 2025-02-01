from gradio_client import Client

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

