# Generated by Django 4.2.6 on 2023-10-18 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mymusic', '0002_alter_musician_best_position_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='album',
            field=models.ImageField(blank=True, null=True, upload_to='album/'),
        ),
    ]