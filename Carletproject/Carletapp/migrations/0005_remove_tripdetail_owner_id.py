# Generated by Django 3.1.7 on 2021-04-10 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Carletapp', '0004_auto_20210410_1558'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tripdetail',
            name='owner_id',
        ),
    ]
