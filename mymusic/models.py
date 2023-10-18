from django.db import models

# Create your models here.
class Award(models.Model):
    month = models.CharField(max_length=20, null=True, blank=True)
    classification = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.classification} - {self.month}"

class Musician(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='musicians/', null=True, blank=True)
    flag = models.ImageField(upload_to='flags/', null=True, blank=True)
    country = models.CharField(max_length=100)
    awards = models.ManyToManyField('Award', related_name='musicians')
    points = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)
    best_position = models.IntegerField(default=0)
    current_position = models.IntegerField(default=0)

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
    musicians = models.ManyToManyField(Musician, related_name='songs')

    def __str__(self):
        return f"{self.name}"