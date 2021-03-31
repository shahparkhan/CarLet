from django.db import models
from django.conf import settings 
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Carlet_User (models.Model):
    carletuser_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
      settings.AUTH_USER_MODEL, # new
      on_delete=models.CASCADE
    )
    phone_number = models.IntegerField()
    picture = models.ImageField()
    isVerified = models.BooleanField()
    isBanned = models.BooleanField()
    isSuperadmin = models.BooleanField()
    permanentBan = models.BooleanField()
    tempBan = models.DateField(null = True)
    wallet = models.IntegerField()


# class Vehicle_detail(models.Model):
#     vehicle_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.vehicle_id


# class Vehicle_document(models.Model):
#     vehicledoc_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.vehicledoc_id


# class Vehicle_Location(models.Model):
#     vehicleloc_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.vehicleloc_id


# class User_document(models.Model):
#     userdoc_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.userdoc_id


# class User_History(models.Model):
#     userhis_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.userhis_id


# class Rating(models.Model):
#     rating_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.rating_id


# class Voucher(models.Model):
#     voucher_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.voucher_id


# class Trip_history(models.Model):
#     trip_id = models.EmailField(max_length=100)

#     def __str__(self):
#         return self.trip_id
