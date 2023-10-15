from rest_framework import serializers
from .models import Award, Musician, Song

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields ='__all__'

class MusicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musician
        fields ='__all__'

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields ='__all__'