
from django.shortcuts import get_list_or_404
from rest_framework import viewsets
from .serializer import AwardSerializer, SongSerializer, MusicianCreateSerializer, MusicianRetrieveSerializer, MusicianAward, RankingSerializer
from .models import Award, Musician, Song, Rank, Ranking
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count

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

    def create(self, request, *args, **kwargs):
        # Obtener los IDs de los músicos desde la solicitud
        musician_idslist = request.data.get('musicians', [])  # Asegúrate de que musician_idslist sea una lista
        musician_ids = [int(id) for id in musician_idslist.split(',')]
        # Verificar que al menos un músico fue proporcionado
        if not musician_ids:
            return Response({'detail': 'Debes proporcionar al menos un músico.'}, status=status.HTTP_400_BAD_REQUEST)

        # Asegurarse de que los músicos con esos IDs existan
        for musician_id in musician_ids:
            try:
                musician = Musician.objects.get(id=musician_id)
            except Musician.DoesNotExist:
                return Response({'detail': f'Músico con ID {musician_id} no encontrado.'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear la canción y asociar los músicos
        song_data = {
            'name': request.data.get('name'),
            'rating': request.data.get('rating'),
            'start_date': request.data.get('start_date'),
            'end_date': request.data.get('end_date'),
            'week': request.data.get('week'),
            'release_year': request.data.get('release_year'),
            'genre': request.data.get('genre'),
            'album': request.data.get('album'),
        }

        song = Song.objects.create(**song_data)
        song.musicians.set(musician_ids)  # Asociar los músicos con la canción

        serializer = self.get_serializer(song)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def last_week_view(request):
    if request.method == 'GET':
        if Song.objects.exists():
            # Obtener la última canción
            last_song = Song.objects.latest('id')
            week = last_song.week + 1
        else:
            # No hay canciones, establecer week en 1 o cualquier valor predeterminado
            week = 1

        data = {'week': week}
        return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def update_musicians(request):
    if request.method == 'POST':
        musician_updates = request.data.get("musicianUpdates", [])
        # Itera sobre los datos y actualiza los músicos
        week = request.data.get('valueweek')
        startdate_str = request.data.get('start_date')
        endate_str= request.data.get('end_date')

        from datetime import datetime
        startdate = datetime.strptime(startdate_str, '%Y-%m-%d')

        for updatemus in musician_updates:
            musician_id = updatemus['id']
            points_to_add = updatemus['pointsToAdd']
            musician = Musician.objects.get(id=musician_id)
            musician.points += int(points_to_add)
            musician.points_year += int(points_to_add)
            musician.points_semester += int(points_to_add)
            musician.save()

            award = Award.objects.create(
                classification='week',  
                points=points_to_add,    
            )
            musician.awards.add(award)

            week_awards = musician.awards.filter(classification='week')
            total_points = sum([award.points for award in week_awards])
            if week_awards:
                rating = total_points / len(week_awards)
            else:
                rating = 0

            musician.rating = rating
            musician.save()
        
        musicians = get_list_or_404(Musician)

        musicians_sorted = sorted(musicians, key=lambda musician: musician.points, reverse=True)
        
        for position, musician in enumerate(musicians_sorted, start=1):
            musician.current_position = position
            musician.save()

            Rank.objects.create(
            musician=musician,
            week=week,
            position=musician.current_position
            )

            if musician.best_position == 0 or musician.current_position <= musician.best_position:
                musician.best_position = musician.current_position
                musician.start_date_bp = startdate_str
                musician.end_date_bp = endate_str
                musician.save()

        if startdate.month == 6 and 21 <= startdate.day <= 27:
            top_10_musicians = Musician.objects.order_by('-points_semester')[:10]
            year = startdate.year
            
            ranking_instance = Ranking(
            info="Semester 1 "+str(year),  
            musician1=top_10_musicians[0].name,
            points1=top_10_musicians[0].points_semester,
            musician2=top_10_musicians[1].name,
            points2=top_10_musicians[1].points_semester,
            musician3=top_10_musicians[2].name,
            points3=top_10_musicians[2].points_semester,
            musician4=top_10_musicians[3].name,
            points4=top_10_musicians[3].points_semester,
            musician5=top_10_musicians[4].name,
            points5=top_10_musicians[4].points_semester,
            musician6=top_10_musicians[5].name,
            points6=top_10_musicians[5].points_semester,
            musician7=top_10_musicians[6].name,
            points7=top_10_musicians[6].points_semester,
            musician8=top_10_musicians[7].name,
            points8=top_10_musicians[7].points_semester,
            musician9=top_10_musicians[8].name,
            points9=top_10_musicians[8].points_semester,
            musician10=top_10_musicians[9].name,
            points10=top_10_musicians[9].points_semester,
            )
            ranking_instance.save()


            top_10_musicians = Musician.objects.order_by('-points_year')[:10]
            year = startdate.year
            
            yearbefore = year-1
            ranking_instance2 = Ranking(
            info="Period - "+str(yearbefore) + " - "+str(year),  
            musician1=top_10_musicians[0].name,
            points1=top_10_musicians[0].points_year,
            musician2=top_10_musicians[1].name,
            points2=top_10_musicians[1].points_year,
            musician3=top_10_musicians[2].name,
            points3=top_10_musicians[2].points_year,
            musician4=top_10_musicians[3].name,
            points4=top_10_musicians[3].points_year,
            musician5=top_10_musicians[4].name,
            points5=top_10_musicians[4].points_year,
            musician6=top_10_musicians[5].name,
            points6=top_10_musicians[5].points_year,
            musician7=top_10_musicians[6].name,
            points7=top_10_musicians[6].points_year,
            musician8=top_10_musicians[7].name,
            points8=top_10_musicians[7].points_year,
            musician9=top_10_musicians[8].name,
            points9=top_10_musicians[8].points_year,
            musician10=top_10_musicians[9].name,
            points10=top_10_musicians[9].points_year,
            )
            ranking_instance2.save()

            Musician.objects.all().update(points_semester=0)
            Musician.objects.all().update(points_year=0)

        if startdate.month == 12 and 22 <= startdate.day <= 28:
            top_10_musicians = Musician.objects.order_by('-points_semester')[:10]
            
            year = startdate.year
            ranking_instance = Ranking(
            info="Semester 2 "+str(year),  
            musician1=top_10_musicians[0].name,
            points1=top_10_musicians[0].points_semester,
            musician2=top_10_musicians[1].name,
            points2=top_10_musicians[1].points_semester,
            musician3=top_10_musicians[2].name,
            points3=top_10_musicians[2].points_semester,
            musician4=top_10_musicians[3].name,
            points4=top_10_musicians[3].points_semester,
            musician5=top_10_musicians[4].name,
            points5=top_10_musicians[4].points_semester,
            musician6=top_10_musicians[5].name,
            points6=top_10_musicians[5].points_semester,
            musician7=top_10_musicians[6].name,
            points7=top_10_musicians[6].points_semester,
            musician8=top_10_musicians[7].name,
            points8=top_10_musicians[7].points_semester,
            musician9=top_10_musicians[8].name,
            points9=top_10_musicians[8].points_semester,
            musician10=top_10_musicians[9].name,
            points10=top_10_musicians[9].points_semester,
            )
            ranking_instance.save()

            Musician.objects.all().update(points_semester=0)

        return Response('Músicos actualizados con éxito', status=status.HTTP_200_OK)

    return Response('Solicitud no válida', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def top_musicians(request):
    top_musicians = Musician.objects.order_by('-points')[:3]

    serializer = MusicianCreateSerializer(top_musicians, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def top_musicians_with_awards(request):
    # Obtener a los músicos con más premios (awards)
    top_musicians = Musician.objects.annotate(award_count=Count('awards')).order_by('-award_count','-points')[:3]

    # Serializar los músicos
    serializer = MusicianAward(top_musicians, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def all_songs(request):
    songs = Song.objects.order_by('-week')
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ranking(request):
    musicians = Musician.objects.order_by('current_position')
    serializer = MusicianRetrieveSerializer(musicians, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def sorted_by_awards(request):
    musicians = Musician.objects.annotate(award_count=Count('awards')).order_by('-award_count','current_position')
    serializer = MusicianRetrieveSerializer(musicians, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def musician_detail(request, musician_id):
    try:
        musician = Musician.objects.get(id=musician_id)
    except Musician.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = MusicianRetrieveSerializer(musician)
    return Response(serializer.data)

@api_view(['GET'])
def musician_songs(request, musician_id):
    songs = Song.objects.filter(musicians=musician_id)
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def rankings_his(request):
    ranking = Ranking.objects.order_by('-id')
    serializer = RankingSerializer(ranking, many=True)
    return Response(serializer.data)

from django.shortcuts import get_object_or_404

@api_view(['GET'])
def rank_musicians(request, ranking_id):
    ranking = get_object_or_404(Ranking, id=ranking_id)
    musicians_data = []
    info = ranking.info
    for i in range(1, 11):
        musician_name = getattr(ranking, f"musician{i}")
        points = getattr(ranking, f"points{i}")
        
        # Buscar el Musician por el nombre
        musician = Musician.objects.filter(name=musician_name).first()
        
        if musician:
            musician_data = {
                'musician': MusicianCreateSerializer(musician).data,
                'points': points,
            }
            musicians_data.append(musician_data)
    
    response_data = {
        'info': info,
        'musicians': musicians_data,
    }
    return JsonResponse({'musicians': response_data})

@api_view(['GET'])
def musician_awards(request, musician_id):
    musician = Musician.objects.filter(id=musician_id).first()

    if not musician:
        return Response(status=404)

    awards = {
        "week": musician.awards.filter(classification="week").count(),
        "january": musician.awards.filter(classification="january").count(),
        "february": musician.awards.filter(classification="february").count(),
        "march": musician.awards.filter(classification="march").count(),
        "april": musician.awards.filter(classification="april").count(),
        "may": musician.awards.filter(classification="may").count(),
        "june": musician.awards.filter(classification="june").count(),
        "july": musician.awards.filter(classification="july").count(),
        "august": musician.awards.filter(classification="august").count(),
        "september": musician.awards.filter(classification="september").count(),
        "october": musician.awards.filter(classification="october").count(),
        "november": musician.awards.filter(classification="november").count(),
        "december": musician.awards.filter(classification="december").count(),
        "sixmonth": musician.awards.filter(classification="sixmonth").count(),
        "year": musician.awards.filter(classification="year").count(),
    }

    return Response(awards)

@api_view(['POST'])
def add_points_to_musicians(request):
    musician_ids = request.data.get("musicianIds")
    print(musician_ids)
    points_to_add = request.data.get("pointsToAdd")
    classification = request.data.get("classification")

    if musician_ids and points_to_add:
        # Actualiza los puntos de los músicos seleccionados
        musicians = Musician.objects.filter(id__in=musician_ids)
        for musician in musicians:
            musician.points += points_to_add
            musician.points_semester += points_to_add
            musician.points_year += points_to_add
            musician.save()

            award = Award.objects.create(
                classification=classification,     
            )
            musician.awards.add(award)

    musicians = Musician.objects.all()

    musicians_sorted = sorted(musicians, key=lambda musician: musician.points, reverse=True)

    for position, musician in enumerate(musicians_sorted, start=1):
        musician.current_position = position
        musician.save()

        if musician.best_position == 0 or musician.current_position < musician.best_position:
            musician.best_position = musician.current_position
            musician.save()

    return Response({"message": "Puntos y premio agregados correctamente."})


@api_view(['POST'])
def addpointsweek(request):
    musician_ids = request.data.get("musicianIds")
    points_to_add = request.data.get("pointsToAdd")

    if musician_ids and points_to_add:
        
        musicians = Musician.objects.filter(id__in=musician_ids)
        for musician in musicians:
            musician.points += points_to_add
            musician.points_semester += points_to_add
            musician.points_year += points_to_add
            musician.save()


    musicians = Musician.objects.all()

    musicians_sorted = sorted(musicians, key=lambda musician: musician.points, reverse=True)

    for position, musician in enumerate(musicians_sorted, start=1):
        musician.current_position = position
        musician.save()

        if musician.best_position == 0 or musician.current_position < musician.best_position:
            musician.best_position = musician.current_position
            musician.save()

    return Response({"message": "Puntos y premio agregados correctamente."})

    


@api_view(['POST'])
def addpointstrophy(request):
    musician_ids = request.data.get("musicianIds")
    print(musician_ids)
    points_to_add = request.data.get("pointsToAdd")
    classification = request.data.get("classification")

    if musician_ids and points_to_add:
        
        musicians = Musician.objects.filter(id__in=musician_ids)
        for musician in musicians:
            musician.points += points_to_add
            musician.points_semester += points_to_add
            musician.points_year += points_to_add
            musician.save()

            award = Award.objects.create(
                classification=classification,     
            )
            musician.awards.add(award)


    musiciansr = Musician.objects.all()

    musicians_sorted = sorted(musiciansr, key=lambda musician: musician.points, reverse=True)

    for position, musician in enumerate(musicians_sorted, start=1):
        print(musician.name)
        musician.current_position = position
        musician.save()

        if musician.best_position == 0 or musician.current_position < musician.best_position:
            musician.best_position = musician.current_position
            musician.save()

    return Response({"message": "Puntos y premio agregados correctamente."})

    
@api_view(['GET'])
def get_latest_song(request):
    ultima_cancion = Song.objects.order_by('-id').first()

    if ultima_cancion:
        serializer = SongSerializer(ultima_cancion)
        return Response(serializer.data)
    else:
        # Manejo si no hay canciones
        return Response({"mensaje": "No se encontraron canciones"}, status=status.HTTP)
    
@api_view(['GET'])
def ranking_view(request):
    musicians_data = Musician.objects.order_by('current_position').values()

    for musician in musicians_data:
        ranks = Rank.objects.filter(musician_id=musician['id']).values('week', 'position')
        musician['ranks'] = {rank['week']: rank['position'] for rank in ranks}

    latest_song = Song.objects.latest('id')
    max_week = latest_song.week

    return JsonResponse({'musiciansData': list(musicians_data), 'maxWeek': max_week})