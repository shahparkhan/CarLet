# Generated by Django 3.1.7 on 2021-04-02 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Carletapp', '0007_auto_20210331_1826'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle_document',
            fields=[
                ('vehicledoc_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='Carletapp.vehicle_detail')),
                ('ownerdoc_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Carletapp.carlet_user')),
            ],
        ),
    ]