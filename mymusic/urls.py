from django.urls import path, include
from rest_framework import routers
from mymusic import views

router = routers.DefaultRouter()
router.register(r'awards', views.AwardView, 'awards')
router.register(r'musicians', views.MusicianView, 'musicians')
router.register(r'songs', views.SongView, 'songs')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("lastweek/", views.last_week_view, name="lastweek"),
    path("update-musicians/", views.update_musicians, name="updatemusician"),
    path("topmusicians/", views.top_musicians, name="topmusician"),
    path("topawards/", views.top_musicians_with_awards, name="topawards"),
    path("allsongs/", views.all_songs, name="allsongs"),
    path("ranking/", views.ranking, name="ranking"),
    path("sortawards/", views.sorted_by_awards, name="sortawards"),
    path("addpoints/", views.add_points_to_musicians, name="addpoints"),
    path("addpointsweek/", views.addpointsweek, name="addpointsaweek"),
    path("addpointstrophy/", views.addpointstrophy, name="addpointstrophy"),
    path("musicians/<int:musician_id>/", views.musician_detail, name="musiciandetails"),
    path("musicians/<int:musician_id>/songs/", views.musician_songs, name="musiciansongs"),
    path("musicians/<int:musician_id>/awards/", views.musician_awards, name="musicianawards"),
]