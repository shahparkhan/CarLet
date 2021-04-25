# Generated by Django 3.1.7 on 2021-04-24 20:50

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('Carletapp', '0019_auto_20210424_1114'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('favorite_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fav_vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Carletapp.vehicledetail')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Carletapp.carletuser')),
            ],
        ),
    ]
