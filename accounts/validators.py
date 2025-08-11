from django.core.exceptions import ValidationError
import os

#def allowOnlyImages(value):
    #ext = os.path.splitext(value.name)[1]
    #print(ext)
    #valid_extensions = ['png','jpg', 'jpeg']
    #if not ext.lower() in valid_extensions:
        #raise ValidationError('Unsupported file extensions. Allowed extensions: ' +str(valid_extensions))
def allowOnlyImages(value):
    ext = os.path.splitext(value.name)[1]  # ".jpg", ".PNG"
    ext = ext[1:].lower()  # remove dot, make lowercase: "jpg"
    valid_extensions = ['png', 'jpg', 'jpeg']
    if ext not in valid_extensions:
        raise ValidationError(
            f'Unsupported file extension. Allowed extensions: {valid_extensions}'
        )