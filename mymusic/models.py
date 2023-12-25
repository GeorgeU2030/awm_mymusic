from django.db import models

# Create your models here.
class Award(models.Model):
    month = models.CharField(max_length=20, null=True, blank=True)
    classification = models.CharField(max_length=100)
    points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.classification} - {self.month}"

class Musician(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='musicians/', null=True, blank=True)
    flag = models.ImageField(upload_to='flags/', null=True, blank=True)
    country = models.CharField(max_length=100)
    awards = models.ManyToManyField('Award', related_name='musicians',blank=True)
    points = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    best_position = models.IntegerField(default=0)
    current_position = models.IntegerField(default=0)
    start_date_bp = models.DateField(null=True)
    end_date_bp = models.DateField(null=True)
    points_year = models.IntegerField(default=0)
    points_semester = models.IntegerField(default=0)


    def __str__(self):
        return f"{self.name}"

class Song(models.Model):
    name = models.CharField(max_length=100)
    rating = models.CharField(max_length=10)
    start_date = models.DateField()
    end_date = models.DateField()
    week = models.IntegerField(default=0)
    release_year = models.PositiveSmallIntegerField(default=0)
    genre = models.CharField(max_length=100)
    album = models.ImageField(upload_to='album/', null=True, blank=True)
    musicians = models.ManyToManyField(Musician, related_name='songs')

    def __str__(self):
        return f"{self.name}"
    
class Ranking(models.Model):
    info = models.CharField(max_length=100)
    musician1 = models.CharField(max_length=100)
    points1 = models.IntegerField(default=0)
    musician2 = models.CharField(max_length=100)
    points2 = models.IntegerField(default=0)
    musician3 = models.CharField(max_length=100)
    points3 = models.IntegerField(default=0)
    musician4 = models.CharField(max_length=100)
    points4 = models.IntegerField(default=0)
    musician5 = models.CharField(max_length=100)
    points5 = models.IntegerField(default=0)
    musician6 = models.CharField(max_length=100)
    points6 = models.IntegerField(default=0)
    musician7 = models.CharField(max_length=100)
    points7 = models.IntegerField(default=0)
    musician8 = models.CharField(max_length=100)
    points8 = models.IntegerField(default=0)
    musician9 = models.CharField(max_length=100)
    points9 = models.IntegerField(default=0)
    musician10 = models.CharField(max_length=100)
    points10 = models.IntegerField(default=0)

class Rank(models.Model):
    musician = models.ForeignKey(Musician, on_delete=models.CASCADE)
    week = models.IntegerField()
    position = models.IntegerField()