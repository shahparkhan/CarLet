from django.db import models
from django.conf import settings 
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
import uuid

# Create your models here.
class Carlet_User (models.Model):
    carletuser_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone_number = PhoneNumberField()
    picture = models.ImageField()
    isVerified = models.BooleanField()
    isBanned = models.BooleanField()
    isSuperadmin = models.BooleanField()
    permanentBan = models.BooleanField()
    tempBan = models.DateField(blank = True, null = True)
    wallet = models.IntegerField()
    def __str__(self):
      return self.user.username



class Vehicle_detail(models.Model):
    vehicle_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vehicle_name = models.CharField(max_length = 100)
    vehicle_street_address = models.TextField(max_length = 300)
    vehicle_city = models.CharField(max_length = 100)
    vehicle_state = models.CharField(max_length = 100)
    vehicle_zip = models.CharField(max_length = 100, blank = True, null = True)
    vehicle_latitude = models.DecimalField(max_digits=19, decimal_places=10,blank = True, null = True)
    vehicle_longitude = models.DecimalField(max_digits=19, decimal_places=10,blank = True, null = True)


    def __str__(self):
        return (self.vehicle_name +" "+ str(self.vehicle_id))




class User_document(models.Model):
    user_doc_id = models.OneToOneField(Carlet_User, on_delete=models.CASCADE, primary_key=True)
    nic = models.CharField(max_length = 13)
    nic_picture = models.ImageField()
    driver_license = models.CharField(max_length = 50)
    driver_license_picture = models.ImageField()
    account_number = models.CharField(max_length = 24)


    def __str__(self):
        return str(self.user_doc_id)


class Trip_detail(models.Model):
    trip_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner_id = models.ForeignKey(Carlet_User, on_delete=models.CASCADE, related_name ='owner_id')
    renter_id = models.ForeignKey(Carlet_User, on_delete=models.CASCADE, related_name ='renter_id')
    vehicle_id = models.ForeignKey(Vehicle_detail, on_delete=models.CASCADE)
    pickup_date = models.DateField()
    dropoff_date = models.DateField()
    duration = models.PositiveIntegerField()
    cost = models.PositiveIntegerField()

    def __str__(self):
        return str(self.trip_id)
    


class Rating(models.Model):
    rating_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rater_id = models.OneToOneField(Carlet_User, on_delete=models.CASCADE, related_name= 'rater_id')
    rated_id = models.OneToOneField(Carlet_User, on_delete= models.CASCADE, related_name = 'rated_id')
    rating_points = models.DecimalField(max_digits = 1, decimal_places = 1)
    review = models.TextField(max_length = 300)
    isRenter = models.BooleanField()

    class Meta:
        unique_together = (('rater_id', 'rated_id'),)


    def __str__(self):
        return str(self.rater_id)

    

class Voucher(models.Model):
    voucher_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.PositiveIntegerField()
    carlet_user_id = models.ForeignKey(Carlet_User, on_delete=models.CASCADE, related_name='carletuser')
    status = models.BooleanField()
    issue_date = models.DateField()
    due_date = models.DateField()

    def __str__(self):
        return str(self.voucher_id)


