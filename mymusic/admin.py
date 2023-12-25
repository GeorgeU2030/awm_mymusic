from django.contrib import admin
from .models import Award, Musician, Song, Rank, Ranking
# Register your models here.

admin.site.register(Award)
admin.site.register(Musician)
admin.site.register(Song)
admin.site.register(Rank)
admin.site.register(Ranking)