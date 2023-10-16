from django.urls import path, include
from rest_framework import routers
from mymusic import views

router = routers.DefaultRouter()
router.register(r'awards', views.AwardView, 'awards')
router.register(r'musicians', views.MusicianView, 'musicians')
router.register(r'songs', views.SongView, 'songs')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]