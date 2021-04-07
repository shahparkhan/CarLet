from django.db import models
from django.conf import settings 
<<<<<<< HEAD
from django.contrib.auth.base_user import BaseUserManager

=======
from django import forms
from django.contrib.auth.models import User
>>>>>>> 0c9e1766752d0aba5e758131a58b9cdfa4dc9b8b
from phonenumber_field.modelfields import PhoneNumberField
import uuid

# Create your models here.



class CarletUser (models.Model):
    carletuser_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = PhoneNumberField(unique=True)
    isVerified = models.BooleanField(default = False)
    isBanned = models.BooleanField(default = False)
    isSuperadmin = models.BooleanField(default = False)
    permanentBan = models.BooleanField(default = False)
    isTempBan = models.BooleanField(default = False)
    tempBan = models.DateField(blank = True, null = True)
    wallet = models.IntegerField(default=0)
    
    def __str__(self):
      return self.user.username



class VehicleDetail(models.Model):
    vehicle_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vehicle_user = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name='vehicle_user')
    vehicle_model = models.CharField(max_length = 50)
    vehicle_name = models.CharField(max_length = 50)
    vehicle_type = models.CharField(max_length = 50)
    vehicle_picture1 = models.ImageField() 
    vehicle_picture2 = models.ImageField()
    vehicle_picture3 = models.ImageField(blank = True, null = True)  
    vehicle_picture4 = models.ImageField(blank = True, null = True) 
    vehicle_picture5 = models.ImageField(blank = True, null = True) 
    daily_rate = models.PositiveIntegerField(default =0)
    vehicle_isVerified = models.BooleanField(default=False)

    def __str__(self):
        return (self.vehicle_name + " " + str(self.vehicle_id) + " " + self.vehicle_user.user.username)


<<<<<<< HEAD
class VehicleDocument(models.Model):
    vehicledoc_id = models.OneToOneField(VehicleDetail, on_delete=models.CASCADE, primary_key=True)
=======

class Vehicle_document(models.Model):
    vehicledoc_id = models.OneToOneField(Vehicle_detail, on_delete=models.CASCADE, primary_key=True)
>>>>>>> 0c9e1766752d0aba5e758131a58b9cdfa4dc9b8b
    reg_papers = models.FileField()
    insurance_papers = models.FileField()
    tracker_papers = models.FileField()
    
    def __str__(self):
        return  (self.vehicledoc_id.vehicle_user.user.username + " " +  str(self.vehicledoc_id))


<<<<<<< HEAD
class VehicleLocation(models.Model):
    vehicleloc_id = models.OneToOneField(VehicleDetail, on_delete=models.CASCADE, primary_key=True, related_name='vehicleloc_id')
=======

class Vehicle_Location(models.Model):
    vehicleloc_id = models.OneToOneField(Vehicle_detail, on_delete=models.CASCADE, primary_key=True, related_name='vehicleloc_id')
>>>>>>> 0c9e1766752d0aba5e758131a58b9cdfa4dc9b8b
    vehicle_street_address = models.TextField(max_length = 300)
    vehicle_city = models.CharField(max_length = 50)
    vehicle_state = models.CharField(max_length = 50)
    vehicle_zip = models.CharField(max_length = 50, blank = True, null = True)
    vehicle_latitude = models.DecimalField(max_digits=19, decimal_places=4,blank = True, null = True)
    vehicle_longitude = models.DecimalField(max_digits=19, decimal_places=4,blank = True, null = True)
    
    def __str__(self):
        return  (self.vehicleloc_id.vehicle_user.user.username + " "  + str(self.vehicleloc_id))




class UserDocument(models.Model):
    doc_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_doc_id = models.OneToOneField(CarletUser, on_delete=models.CASCADE, related_name='user_doc_id')
    NIC = models.CharField(max_length = 13, unique= True)
    NIC_picture = models.ImageField()
    driver_license = models.CharField(max_length = 50)
    driver_license_picture = models.ImageField()
    account_number = models.CharField(max_length = 24)
    picture = models.ImageField(blank=True, null=True)



    def __str__(self):
        return (self.user_doc_id.user.username + " " + str(self.doc_id))


class TripDetail(models.Model):
    trip_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner_id = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name ='owner_id')
    renter_id = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name ='renter_id')
    vehicle_id = models.ForeignKey(VehicleDetail, on_delete=models.CASCADE)
    pickup_date = models.DateField()
    dropoff_date = models.DateField()
    duration = models.PositiveIntegerField()
    cost = models.PositiveIntegerField()

    def __str__(self):
        return (self.owner_id.user.username + " " + self.owner_id.user.username + " " + str(self.trip_id))
    


class Rating(models.Model):
    rating_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rater_id = models.OneToOneField(CarletUser, on_delete=models.CASCADE, related_name= 'rater_id')
    rated_id = models.OneToOneField(CarletUser, on_delete= models.CASCADE, related_name = 'rated_id')
    rating_points = models.DecimalField(max_digits = 1, decimal_places = 1)
    review = models.TextField(max_length = 300)
    isRenter = models.BooleanField()

    class Meta:
        unique_together = (('rater_id', 'rated_id'),)

    def __str__(self):
        return ((self.rater_id.user.username) + " " + self.rated_id.user.username + " " + str(self.rating_id))

    

class Voucher(models.Model):
    voucher_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.PositiveIntegerField()
    carlet_user_id = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name='carletuser')
    status = models.BooleanField(default=False)
    issue_date = models.DateField()
    due_date = models.DateField()


    def __str__(self):
        return (self.carlet_user_id.user.username + " " + str(self.voucher_id))


