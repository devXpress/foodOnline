from django.core.exceptions import ValidationError
import os


def allow_only_images_validator(value):
    ext = os.path.splitext(value.name)[1]
    print(ext)

    valid_ext_list = ['.png', '.jpg', '.jpeg']
    if ext.lower() not in valid_ext_list:
        raise ValidationError('Unsupported file extension uploaded, allowed extension:' +str(valid_ext_list) )