from django.db import models
from django.conf import settings
from django import forms
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.gis.db.models import PointField
import uuid

# Create your models here.




class CarletUser (models.Model):
    carletuser_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = PhoneNumberField(unique=True)
    isVerified = models.BooleanField(default = False)
    isBanned = models.BooleanField(default = False)
    isSuperadmin = models.BooleanField(default = False)
    permanentBan = models.BooleanField(default = False)
    isTempBan = models.BooleanField(default = False)
    tempBan = models.DateField(blank = True, null = True)
    rating = models.DecimalField(default=5.0, max_digits = 2, decimal_places = 1)
    rating_counter = models.PositiveIntegerField(default=1)

    def __str__(self):
      return (str(self.user.email) + " "+str(self.carletuser_id))



class VehicleDetail(models.Model):
    vehicle_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vehicle_user = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name='vehicle_user')
    vehicle_model = models.CharField(max_length = 50)
    vehicle_name = models.CharField(max_length = 50)
    vehicle_type = models.CharField(max_length = 50)
    vehicle_picture1 = models.ImageField(upload_to='vehicle_pictures1/')
    vehicle_picture2 = models.ImageField(upload_to='vehicle_pictures2/')
    vehicle_picture3 = models.ImageField(blank = True, null = True, upload_to='vehicle_pictures3/')
    vehicle_picture4 = models.ImageField(blank = True, null = True, upload_to='vehicle_pictures4/')
    vehicle_picture5 = models.ImageField(blank = True, null = True, upload_to='vehicle_pictures5/')
    daily_rate = models.PositiveIntegerField(default=0)
    vehicle_isVerified = models.BooleanField(default=False)
    vehicle_rating = models.DecimalField(default=5.0, max_digits = 2, decimal_places = 1)
    put_up_for_rent = models.BooleanField(default=True)
    rating_counter = models.IntegerField(default=1)
    license_plate = models.CharField(max_length = 50, default="abcd")

    def __str__(self):
        return (self.vehicle_name + " " + str(self.vehicle_id) + " " + self.vehicle_user.user.username)


class VehicleDocument(models.Model):
    vehicledoc_id = models.OneToOneField(VehicleDetail, on_delete=models.CASCADE, primary_key=True)
    reg_papers = models.ImageField(blank = True, null = True, upload_to='reg_papers/')
    insurance_papers = models.ImageField(blank = True, null = True, upload_to='insurance_papers/')
    tracker_papers = models.ImageField(blank = True, null = True, upload_to='tracker_papers/')

    def __str__(self):
        return  (self.vehicledoc_id.vehicle_user.user.username + " " +  str(self.vehicledoc_id))



class VehicleLocation(models.Model):
    vehicleloc_id = models.OneToOneField(VehicleDetail, on_delete=models.CASCADE, primary_key=True, related_name='vehicleloc_id')
    vehicle_street_address = models.TextField(max_length = 300,blank = True, null = True)
    vehicle_city = models.CharField(max_length = 50,blank = True, null = True)
    vehicle_state = models.CharField(max_length = 50,blank = True, null = True)
    vehicle_zip = models.CharField(max_length = 50, blank = True, null = True)
    vehicle_latitude = models.DecimalField(max_digits=19, decimal_places=4,blank = True, null = True)
    vehicle_longitude = models.DecimalField(max_digits=19, decimal_places=4,blank = True, null = True)
    point_location = PointField(null=False, blank=False, srid=4326, verbose_name="vehicle_location", default= (0,0))

    def __str__(self):
        return  (self.vehicleloc_id.vehicle_user.user.username + " "  + str(self.vehicleloc_id))




class UserDocument(models.Model):
    doc_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_doc_id = models.OneToOneField(CarletUser, on_delete=models.CASCADE, related_name='user_doc_id')
    NIC = models.CharField(max_length = 13, unique= True)
    NIC_picture = models.ImageField(blank = True, null = True, upload_to='nic_pictures/')
    picture = models.ImageField(blank = True, null = True, upload_to='profile_pictures/')
    driver_license = models.CharField(max_length = 50)
    driver_license_picture = models.ImageField(blank=True, null=True,upload_to='license_pictures/')
    account_number = models.CharField(max_length = 24)
    picture = models.ImageField(blank=True, null=True)



    def __str__(self):
        return (self.user_doc_id.user.email + " " + str(self.doc_id))


class TripDetail(models.Model):
    trip_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # owner_id = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name ='owner_id')
    renter_id = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name ='renter_id')
    vehicle_trip_id = models.ForeignKey(VehicleDetail, on_delete=models.CASCADE)
    pickup_date = models.DateField()
    dropoff_date = models.DateField()
    duration = models.PositiveIntegerField()
    cost = models.PositiveIntegerField()
    booking_confirm = models.BooleanField(default=False)
    rating_done_renter = models.BooleanField(default=False)
    rating_done_owner =  models.BooleanField(default=False)
    payment = models.BooleanField(default=False)

    def __str__(self):
       return (self.vehicle_trip_id.vehicle_user.user.username + " rented to "+self.renter_id.user.username +" - " + str(self.trip_id))

class Wallet(models.Model):
    user = models.OneToOneField(CarletUser,on_delete=models.CASCADE, primary_key=True )
    amount = models.PositiveIntegerField(default=0)
    proof_of_payment = models.ImageField(blank = True, null = True, upload_to='proof_of_payment/')
    payment_amount = models.PositiveIntegerField(default=0)
    payment_approved = models.BooleanField(default=False)
    redeem_amount = models.PositiveIntegerField(default=0)
    is_Redeemed = models.BooleanField(default=False)
    
    def __str__(self):
        return (self.user.user.email + " " + str(self.amount))

class Favorite(models.Model):
    favorite_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CarletUser,on_delete=models.CASCADE)
    fav_vehicle = models.ForeignKey(VehicleDetail, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'fav_vehicle'),)
    

    def __str__(self):
        return (self.user.user.email + " " + str(self.favorite_id))


# class Rating(models.Model):
#     rating_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     rater_id = models.OneToOneField(CarletUser, on_delete=models.CASCADE, related_name= 'rater_id')
#     rated_id = models.OneToOneField(CarletUser, on_delete= models.CASCADE, related_name = 'rated_id')
#     rating_points = models.DecimalField(max_digits = 1, decimal_places = 1)
#     review = models.TextField(max_length = 300)
#     isRenter = models.BooleanField()

#     class Meta:
#         unique_together = (('rater_id', 'rated_id'),)

#     def __str__(self):
#         return ((self.rater_id.user.username) + " " + self.rated_id.user.username + " " + str(self.rating_id))



# class Voucher(models.Model):
#     voucher_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     amount = models.PositiveIntegerField()
#     carlet_user_id = models.ForeignKey(CarletUser, on_delete=models.CASCADE, related_name='carletuser')
#     status = models.BooleanField(default=False)
#     issue_date = models.DateField()
#     due_date = models.DateField()


#     def __str__(self):
#         return (self.carlet_user_id.user.username + " " + str(self.voucher_id))


