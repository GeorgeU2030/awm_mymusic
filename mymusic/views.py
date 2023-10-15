
from rest_framework import viewsets
from .serializer import AwardSerializer, SongSerializer, MusicianSerializer
from .models import Award, Musician, Song
# Create your views here.

class AwardView(viewsets.ModelViewSet):
    serializer_class = AwardSerializer
    queryset = Award.objects.all()

class MusicianView(viewsets.ModelViewSet):
    serializer_class = AwardSerializer
    queryset = Musician.objects.all()

class SongView(viewsets.ModelViewSet):
    serializer_class = AwardSerializer
    queryset = Song.objects.all()