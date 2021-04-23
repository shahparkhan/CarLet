# Generated by Django 3.1.7 on 2021-04-21 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Carletapp', '0014_vehiclelocation_point_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='tripdetail',
            name='booking_confirm',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='vehicledetail',
            name='rating_counter',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='vehicledocument',
            name='insurance_papers',
            field=models.ImageField(blank=True, null=True, upload_to='insurance_papers/'),
        ),
        migrations.AlterField(
            model_name='vehicledocument',
            name='reg_papers',
            field=models.ImageField(blank=True, null=True, upload_to='reg_papers/'),
        ),
        migrations.AlterField(
            model_name='vehicledocument',
            name='tracker_papers',
            field=models.ImageField(blank=True, null=True, upload_to='tracker_papers/'),
        ),
    ]