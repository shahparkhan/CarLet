# Generated by Django 3.1.7 on 2021-04-02 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Carletapp', '0010_auto_20210402_1701'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle_detail',
            name='vehicle_photos2',
            field=models.ImageField(default=None, upload_to=''),
        ),
        migrations.AlterField(
            model_name='vehicle_detail',
            name='vehicle_photos3',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='vehicle_detail',
            name='vehicle_photos4',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='vehicle_detail',
            name='vehicle_photos5',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=''),
        ),
    ]
