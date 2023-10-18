
from rest_framework import viewsets
from .serializer import AwardSerializer, SongSerializer, MusicianCreateSerializer, MusicianRetrieveSerializer
from .models import Award, Musician, Song
from rest_framework.views import APIView
from django.http import JsonResponse

# Create your views here.

class AwardView(viewsets.ModelViewSet):
    serializer_class = AwardSerializer
    queryset = Award.objects.all()

class MusicianView(viewsets.ModelViewSet):
    queryset = Musician.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MusicianCreateSerializer
        return MusicianRetrieveSerializer

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()

class LastWeekView(APIView):
    def get(self, request):
        if Song.objects.exists():
        # Obtener la última canción
            last_song = Song.objects.latest('id')
            week = last_song.week
            week+= 1
        else:
            # No hay canciones, establecer week en 1 o cualquier valor predeterminado
            week = 1

        data = {'week': week}
        return JsonResponse(data)