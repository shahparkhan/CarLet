# Generated by Django 3.1.7 on 2021-04-11 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Carletapp', '0006_vehicledetail_put_up_for_rent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdocument',
            name='NIC_picture',
            field=models.ImageField(blank=True, null=True, upload_to='nic_pictures/'),
        ),
    ]
