from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserProfile


@receiver(post_save, sender=User)
def create_profile_receiver(sender, instance, created, **kwarg):
    print(created)
    if created:
        UserProfile.objects.create(user=instance)
        print('user profile is created')
    else:
        try:
            profile = UserProfile.objects.get(user=instance)
            profile.save()
        except:
            #create the user profile is not exist
            UserProfile.objects.create(user=instance)
            print('profile did not exist but was created')
