from rest_framework import serializers
from .models import Award, Musician, Song, Ranking

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields ='__all__'

class RankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking
        fields = '__all__'

class MusicianCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musician
        fields = ('name', 'photo', 'flag', 'country')

class MusicianAward(serializers.ModelSerializer):
    award_count = serializers.IntegerField()
    class Meta:
        model = Musician
        fields = ('name','photo','award_count')

class MusicianRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musician
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    musicians = MusicianCreateSerializer(many=True)

    class Meta:
        model = Song
        fields = '__all__'