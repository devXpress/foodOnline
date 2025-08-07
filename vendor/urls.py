from django.urls import path
from . import views
from accounts import views as AccountViews


urlpatterns = [
        path('', AccountViews.vendorDashboard, name= 'vendor'),
        path('vprofile',views.vprofile, name='vprofile'),
        
]