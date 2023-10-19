from rest_framework import serializers
from .models import Award, Musician, Song

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields ='__all__'

class MusicianCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musician
        fields = ('name', 'photo', 'flag', 'country')

class MusicianRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musician
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    musicians = serializers.PrimaryKeyRelatedField(
        queryset=Musician.objects.all(),
        many=True  # Asegura que pueda manejar una lista de músicos
    )
    class Meta:
        model = Song
        fields ='__all__'