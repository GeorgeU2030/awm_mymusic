
from rest_framework import viewsets
from .serializer import AwardSerializer, SongSerializer, MusicianCreateSerializer, MusicianRetrieveSerializer
from .models import Award, Musician, Song
from rest_framework.exceptions import ValidationError
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