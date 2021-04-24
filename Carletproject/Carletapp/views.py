from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status, authentication, permissions
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.files.base import ContentFile
from django.contrib.gis.geos import *
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
import smtplib
from password_generator import PasswordGenerator
from email.message import EmailMessage
from .models import CarletUser, UserDocument, VehicleDetail, TripDetail, VehicleLocation, VehicleDocument
import uuid
import base64

def base64_to_image(base64_string):
    #print(base64_string)
    #print(base64_string.split(';base64,'))
    format, imgstr = base64_string.split(';base64,')
    ext = format.split('/')[-1]
    return ContentFile(base64.b64decode(imgstr), name=uuid.uuid4().hex + "." + ext)

# Create your views here.

def image_to_base64(image_path):
    print(image_path)
    with open(image_path, "rb") as image_file:
        image_data = base64.b64encode(image_file.read()).decode('utf-8')
        #data:image/png;base64, 
        image_data = "data:image/" + image_path.split('.')[-1] + ";base64," + image_data

    return image_data

def path_splitting(path):
    temp = path.split('media')
    path = "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/media" + temp[1]
    return path

class SignUp1(APIView):

    def post(self,request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignUp2(APIView):

    def post(self, request, format=None):
        user_uuid = uuid.uuid4()
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        phone_number = request.data.get('phone_number')

        #unique phone number validation
        if CarletUser.objects.filter(phone_number__iexact=phone_number).exists():
            return Response({"phone_number": "An account with this phone number already exists"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=email)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            new_Carlet_user = CarletUser.objects.create(carletuser_id=user_uuid, user=user,phone_number=phone_number)
            return Response({"Success": "Carlet User has been created"})
        except:
            return Response({"email": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

class ForgetPassword(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        EmailAdd = "automatedcarlet@gmail.com"
        Pass = "monashmishad"
        try :
            msg = EmailMessage()
            msg['Subject'] = 'Password Reset'
            msg['From'] = EmailAdd
            msg['To'] = email
            pwo = PasswordGenerator()
            pwo.minlen = 8
            pwo.maxlen = 10
            new_password = pwo.generate()
            print(new_password)
            try:
                user = User.objects.get(username=email)
                user.password = new_password
                user.save()
            except:
                return Response({"email": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            msg.set_content('Your password has been rest to: ' + new_password)

            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
                smtp.login(EmailAdd,Pass)
                smtp.send_message(msg)

            return Response({"Success": "Email has been sent"})
        except:
            return Response({"Failed": "Email not sent"}, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user1 = User.objects.get(email = email)
        except:
            return Response({"Error": "Username or password is incorrect"}, status = status.HTTP_403_FORBIDDEN)

        # user = authenticate(request, username=email, password=password)
        if user1.password == password:
            user_uuid = CarletUser.objects.get(user__email=email).carletuser_id
            token, created = Token.objects.get_or_create(user=user1)
            return Response({"Success": "Successfully logged in",
                            "uuid": str(user_uuid),
                            "token": token.key})
        else:
            return Response({"Error": "Username or password is incorrect"}, status = status.HTTP_403_FORBIDDEN)

class UserRegistrationValidation(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        for attribute in request.data:

            if attribute == "nic": #validate unique NIC
                nic = request.data.get("nic")
                if UserDocument.objects.filter(NIC__iexact=nic).exists():
                    return Response({"nic": "This NIC number is already registered"}, status= status.HTTP_403_FORBIDDEN)
                else:
                    return Response({"Success": "Valid NIC"})

            if attribute == "driver_license": #validate driver license
                driver_license = request.data.get("driver_license")
                if UserDocument.objects.filter(driver_license__iexact=driver_license).exists():
                    return Response({"driver_license": "This driver license is already registered"}, status= status.HTTP_403_FORBIDDEN)
                else:
                    return Response({"Success": "Valid driver license"})

            if attribute == "iban": #validate iban
                account_no = request.data.get("iban")
                if UserDocument.objects.filter(account_number__iexact=account_no).exists():
                    return Response({"iban": "This Iban is already registered"}, status= status.HTTP_403_FORBIDDEN)
                else:
                    return Response({"Success": "Valid iban"})

class UserRegistration(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        doc_uuid = uuid.uuid4()
        user_id = request.data.get('user_id')
        nic = request.data.get('NIC')
        NIC_picture = base64_to_image(request.data.get('nic_picture'))
        driver_license = request.data.get('driver_license')
        driver_license_picture = base64_to_image(request.data.get('driver_license_picture'))
        account_no = request.data.get('iban')
        picture = base64_to_image(request.data.get('picture'))
        carlet_user = CarletUser.objects.get(pk=user_id)

        try:
            user_doc = UserDocument.objects.create(doc_id=doc_uuid, user_doc_id= carlet_user, NIC=nic, NIC_picture=NIC_picture,
                                                  driver_license= driver_license, driver_license_picture=driver_license_picture, account_number=account_no, picture=picture)

            return Response({"Success": "User Registration Successful"})
        except:
            return Response({"Error": "There was some error uploading your registration information. Please try again later"}, status= status.HTTP_400_BAD_REQUEST)

class CheckVerification(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post (self, request, format=None):
        user_id = request.data.get('user_id')

        try:
            carlet_user = CarletUser.objects.get(pk=user_id)
            if (carlet_user.isVerified == True):
                return Response({"Success": "User is Verified"})
            else:
                return Response({"Error": "User not verified"}, status= status.HTTP_400_BAD_REQUEST)

        except:
            return Response({"Error": "User not Found"} , status= status.HTTP_500_INTERNAL_SERVER_ERROR)

class CheckRegistration(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post (self, request, format=None):
        user_id = request.data.get('user_id')
        try:
            carlet_user = CarletUser.objects.get(pk=user_id)
            UserDocument.objects.get(user_doc_id = carlet_user)
            return Response({"Success": "User has Registered"})
        except:
            return Response({"Error": "User has not Registered"} , status= status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChangePassword(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post (self, request, format=None):
        user_id = request.data.get('user_id')
        old_password_filled = request.data.get('old_password')
        new_password_filled = request.data.get('new_password')
        try:
            print("hello1")
            carlet_user = CarletUser.objects.get(pk=user_id)
            old_password = carlet_user.user.password
            print("hello2")
            if old_password != old_password_filled:
                return Response({"Error": "Incorrect password entered"} , status= status.HTTP_401_UNAUTHORIZED)
            else:
                carlet_user.user.password = new_password_filled
                carlet_user.user.save()
                return Response({"Success": "Password successfully changed"})
        except:
            return Response({"Error": "User not found"} , status= status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchVehicle(APIView):

    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self,request,format=None):
        pickup_date = request.data.get('pickup_date')
        dropoff_date = request.data.get('dropoff_date')
        user_latitude = float(request.data.get('latitude'))
        user_longitude = float(request.data.get('longitude'))
        filters = request.data.get('filters')
        


        query2 = TripDetail.objects.filter(dropoff_date__gte=pickup_date).filter(pickup_date__lte=pickup_date).values('vehicle_trip_id')
        query3 = TripDetail.objects.filter(pickup_date__range=[pickup_date, dropoff_date],dropoff_date__range=[pickup_date, dropoff_date] ).values('vehicle_trip_id')
        query4 = VehicleDetail.objects.exclude(vehicle_id__in=query2).exclude(vehicle_id__in=query3)

        if query4 is not None:
            for key in filters:
                if key == "None":        
                    pass
                if key == "vehicle_type":
                    query4 = query4.filter(vehicle_type=filters[key])
                    if not query4:
                        return Response({"Error": "No cars found with this search result"})
                if key == "price":
                    query4 = query4.filter(daily_rate__lte=filters[key])
                    if not query4:
                        return Response({"Error": "No cars found with this search result"})
                if key == "rating":
                    query4 = query4.filter(vehicle_rating__gte=filters[key])
                    if not query4:
                        return Response({"Error": "No cars found with this search result"})
        else:
            return Response({"Error": "No cars found with this search result"})


        locs = VehicleLocation.objects.filter(vehicleloc_id__in=query4)



        distance = 20000 
        ref_location = Point(user_latitude, user_longitude)
        locs = locs.filter(point_location__distance_lte=(ref_location, D(m=distance))).annotate(distance=Distance("point_location", ref_location)).order_by("distance")
        
        # print("HERE")

        result = []
        for loc in locs:
            resp = {}
            resp["vehicle_street_address"] = loc.vehicle_street_address
            resp["vehicle_city"] = loc.vehicle_city
            resp["vehicle_state"] = loc.vehicle_state
            resp["vehicle_latitude"] = loc.vehicle_latitude
            resp["vehicle_longitude"] = loc.vehicle_longitude
            resp["phone_number"] = str(loc.vehicleloc_id.vehicle_user.phone_number)
            resp["first_name"] = loc.vehicleloc_id.vehicle_user.user.first_name
            resp["last_name"] = loc.vehicleloc_id.vehicle_user.user.last_name
            resp["owner_rating"] = loc.vehicleloc_id.vehicle_user.rating
            resp["vehicle_name"] = loc.vehicleloc_id.vehicle_name
            resp["vehicle_model"] = loc.vehicleloc_id.vehicle_model
            resp["vehicle_type"] = loc.vehicleloc_id.vehicle_type
            # resp["vehicle_picture1"] = image_to_base64(loc.vehicleloc_id.vehicle_picture1.path)
            # resp["vehicle_picture2"] = image_to_base64(loc.vehicleloc_id.vehicle_picture2.path)
            resp["vehicle_picture1"] = path_splitting(loc.vehicleloc_id.vehicle_picture1.path)
            resp["vehicle_picture2"] = path_splitting(loc.vehicleloc_id.vehicle_picture2.path)
            resp["vehicle_id"] = loc.vehicleloc_id.vehicle_id
            try:
                resp["vehicle_picture3"] = path_splitting(loc.vehicleloc_id.vehicle_picture3.path)
            except:
                resp["vehicle_picture3"] = ""

            try:
                resp["vehicle_picture4"] = path_splitting(loc.vehicleloc_id.vehicle_picture4.path)
            except:
                resp["vehicle_picture4"] = ""
            try:
                resp["vehicle_picture5"] = path_splitting(loc.vehicleloc_id.vehicle_picture5.path)
            except:
                resp["vehicle_picture5"] = ""

            resp["daily_rate"] = loc.vehicleloc_id.daily_rate
            resp["vehicle_rating"] = loc.vehicleloc_id.vehicle_rating
            result.append(resp)

        
            

        # print(query4.values())
        # if query2 is not None:
        return Response(result)
        # else:
        #     return Response({"Error": "No cars found with this search result"})
        # except:
        #     return Response({"Error: No cars found with this search result"})

class VehicleRegistration(APIView):

    def post(self,request,format=None):
        vehicle_id = uuid.uuid4()
        vehicle_name = request.data.get('vehicle_name')
        vehicle_model = request.data.get('vehicle_model')
        vehicle_type = request.data.get('vehicle_type')
        daily_rate = request.data.get('daily_rate')
        license_plate = request.data.get('license_plate')
        vehicle_picture1 = base64_to_image(request.data.get('vehicle_picture1'))
        vehicle_picture2 = base64_to_image(request.data.get('vehicle_picture2'))
        vehicle_picture3 = request.data.get('vehicle_picture3')
        vehicle_picture4 = request.data.get('vehicle_picture4')
        vehicle_picture5 = request.data.get('vehicle_picture5')
        street_address = request.data.get('street_address')
        city = request.data.get('city')
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        point_location = Point(latitude,longitude)
        
        reg_papers = base64_to_image(request.data.get('reg_papers'))
        insurance_papers = base64_to_image(request.data.get('insurance_papers'))
        tracker_papers = base64_to_image(request.data.get('tracker_papers'))

        try:
            vehicle_detail = VehicleDetail.objects.create(vehicle_id=vehicle_id, vehicle_name=vehicle_name, vehicle_model=vehicle_model, vehicle_type=vehicle_type,
                                                    daily_rate=daily_rate, license_plate=license_plate, vehicle_picture1=vehicle_picture1,vehicle_picture2=vehicle_picture2 )

            if vehicle_picture3 != "":
                vehicle_picture3 = base64_to_image(vehicle_picture3)
                vehicle_detail.vehicle_picture3 = vehicle_picture3
                vehicle_detail.save()

            if vehicle_picture4 != "":
                vehicle_picture4 = base64_to_image(vehicle_picture4)
                vehicle_detail.vehicle_picture4 = vehicle_picture4
                vehicle_detail.save()
            
            if vehicle_picture5 != "":
                vehicle_picture5 = base64_to_image(vehicle_picture5)
                vehicle_detail.vehicle_picture5 = vehicle_picture5
                vehicle_detail.save()
               
            vehicle_doc = VehicleDocument.objects.create(vehicledoc_id = vehicle_detail, reg_papers=reg_papers, insurance_papers=insurance_papers, tracker_papers=tracker_papers)
            vehicle_loc = VehicleLocation.objects.create(vehicleloc_id= vehicle_detail, vehicle_street_address= street_address, vehicle_city= city, point_location=point_location)
            return Response({"Success": "Vehicle Registration Successful"})
        
        except:
            return Response({"Error": "There was some error uploading your registration information. Please try again later"}, status= status.HTTP_400_BAD_REQUEST)



class VehicleDetailValidation(APIView):

    def post(self,request,format=None):
        license_plate = request.data.get('license_plate')
        if VehicleDetail.objects.filter(license_plate__iexact=license_plate).exists():
            return Response({"license_plate": "Vehicle with this license plate is already registered"}, status= status.HTTP_403_FORBIDDEN)
        else:
            return Response({"Success": "Valid license plate number"})

class GetProfileInfo(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        try:
            carlet_user = CarletUser.objects.get(pk=user_id)
            user_doc = UserDocument.objects.get(user_doc_id=carlet_user)
            wallet = Wallet.objects.get(pk=carlet_user)
            resp = {}
            resp["Success"] = ""
            resp["amount"] = wallet.amount
            resp["picture"] = path_splitting(user_doc.picture.path)
            resp["name"] = carlet_user.user.first_name + " " + carlet_user.user.last_name
            return Response(resp)
        except: 
            return Response({"Error": "An error occured"}, status=status.HTTP_400_BAD_REQUEST)

class ProfileAccountSetting(APIView):
    
    def patch(self,request, pk, format=None):
        carlet_id = uuid.UUID(pk)
        carlet_user = CarletUser.objects.get(pk=carlet_id)
        user = User.objects.get(username=carlet_user.user.username)        

        for attribute in request.data:
            
            if attribute == "name":
                name = request.data.get('name')
                name = name.split(" ")
                user.first_name = name[0]
                try:
                    user.last_name = name[1]
                except:
                    user.last_name = ""
                user.save()
                return Response({"Success": "Name updated"})
            
            if attribute == "phone_number":
                phone_number = request.data.get('phone_number')
                
                if CarletUser.objects.filter(phone_number__iexact=phone_number).exists():
                    return Response({"phone_number": "An account with this phone number already exists"}, status=status.HTTP_400_BAD_REQUEST)
                
                carlet_user.phone_number = phone_number
                carlet_user.save()
                return Response({"Success": "Phone number updated"})
            
            if attribute == "profile_picture":
                profile_picture = base64_to_image(request.data.get('profile_picture'))
                user_doc = UserDocument.objects.get(user_doc_id=carlet_user)
                user_doc.picture = profile_picture
                user_doc.save()
                return Response({"Success": "Profile picture updated"})

            if attribute == "email":
                email = request.data.get('email')
                if User.objects.filter(email__iexact=email).exists():
                    return Response({"phone_number": "An account with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
                
                user.email = email
                user.save()
                return Response({"Success": "Email updated"})
            
            if attribute == "password":
                password = request.data.get('password')
                user.password = password
                user.save()
                return Response({"Success": "Password updated"})

class UserVehicleList(APIView):

    def get(self,request, pk, format=None):
        carlet_id = uuid.UUID(pk)
        carlet_user = CarletUser.objects.get(pk=carlet_id)
        user_vehicles = VehicleDetail.objects.filter(vehicle_user=carlet_user)
        if user_vehicles.exists():
            result = []
            vehicle_list = user_vehicles
            for vehicle in user_vehicles:
                detail = {}
                detail['vehicle_id'] = vehicle.vehicle_id
                detail['vehicle_name'] = vehicle.vehicle_name
                detail['vehicle_model'] = vehicle.vehicle_model
                result.append(detail)

            return Response({"Success": result})
        else:
            return Response({"Error": "There are no vehicles registered by you."})


class VehicleSetting(APIView):

    def patch(self,request, pk, format=None):
        pk = uuid.UUID(pk)
        vehicle = VehicleDetail.objects.get(pk=pk)
        vehicle_documents = VehicleDocument.objects.get(pk=vehicle)
        for attribute in request.data:

            if attribute == "vehicle_name":
                vehicle_name = request.data.get("vehicle_name")
                vehicle.vehicle_name = vehicle_name
                vehicle.save()
                #return Response({"Success": "Vehicle name updated"})
            
            if attribute == "vehicle_model":
                vehicle_model = request.data.get("vehicle_model")
                vehicle.vehicle_model = vehicle_model
                vehicle.save()
                #return Response({"Success": "Vehicle model updated"})

            if attribute == "vehicle_type":
                vehicle_type = request.data.get("vehicle_type")
                vehicle.vehicle_type = vehicle_type
                vehicle.save()
                #return Response({"Success": "Vehicle type updated"})
            
            if attribute == "rate":
                daily_rate = request.data.get("rate")
                vehicle.daily_rate = daily_rate
                vehicle.save()
                #return Response({"Success": "Vehicle rate updated"})

            if attribute == "vehicle_picture1":
                vehicle_picture1 = base64_to_image(request.data.get("vehicle_picture1"))
                vehicle.vehicle_picture1 = vehicle_picture1
                vehicle.save()
                #return Response({"Success": "Vehicle picture1 updated"})
            
            
            if attribute == "vehicle_picture2":
                vehicle_picture2 = base64_to_image(request.data.get("vehicle_picture2"))
                vehicle.vehicle_picture2 = vehicle_picture2
                vehicle.save()
                #return Response({"Success": "Vehicle picture2 updated"})
            
            if attribute == "vehicle_picture3":
                vehicle_picture3 = base64_to_image(request.data.get("vehicle_picture3"))
                vehicle.vehicle_picture3 = vehicle_picture3
                vehicle.save()
                #return Response({"Success": "Vehicle picture3 updated"})
            
            if attribute == "vehicle_picture4":
                vehicle_picture4 = base64_to_image(request.data.get("vehicle_picture4"))
                vehicle.vehicle_picture4 = vehicle_picture4
                vehicle.save()
                #return Response({"Success": "Vehicle picture4 updated"})
            
            if attribute == "vehicle_picture5":
                vehicle_picture5 = base64_to_image(request.data.get("vehicle_picture5"))
                vehicle.vehicle_picture5 = vehicle_picture5
                vehicle.save()
                #return Response({"Success": "Vehicle picture5 updated"})
                
            if attribute == "reg_papers":
                reg_papers = request.data.get('reg_papers')
                vehicle_documents.reg_papers = reg_papers
                vehicle_documents.save()
                #return Response({"Success": "Registration papers updated"})
            
            if attribute == "insurance_papers":
                insurance_papers = request.data.get('insurance_papers')
                vehicle_documents.insurance_papers = insurance_papers
                vehicle_documents.save()
                #return Response({"Success": "Insurance papers updated"})
            
            if attribute == "tracker_papers":
                tracker_papers = request.data.get('tracker_papers')
                vehicle_documents.tracker_papers = tracker_papers
                vehicle_documents.save()
                #return Response({"Success": "Tracker papers updated"})
        
        return Response({"Success":"Update successful"})


class TripHistory(APIView):

    def get(self,request, pk, format=None):
        carlet_id = uuid.UUID(pk)
        carlet_user = CarletUser.objects.get(pk=carlet_id)
        by_you = TripDetail.objects.filter(renter_id=carlet_user).filter(booking_confirm=True).filter(payment=True).filter(rating_done_renter=True)
        
        history = {}
        if by_you.exists():
            result = []
            for trip in by_you:
                vehicle = trip.vehicle_trip_id
                vehicle_location = VehicleLocation.objects.get(vehicleloc_id=vehicle)
                vehicle_owner = vehicle.vehicle_user
                detail = {}
                detail['vehicle_name'] = vehicle.vehicle_name
                detail['vehicle_model'] = vehicle.vehicle_model
                detail['vehicle_type'] = vehicle.vehicle_type
                detail['daily_rate'] = vehicle.daily_rate
                detail['vehicle_address'] = vehicle_location.vehicle_street_address
                detail['vehicle_owner_name'] = vehicle_owner.user.first_name + " " + vehicle_owner.user.last_name
                detail['vehicle_owner_rating'] = vehicle_owner.rating
                detail['pickup_date'] = trip.pickup_date
                detail['dropoff_date'] = trip.dropoff_date
                detail['trip_amount'] = trip.duration * vehicle.daily_rate
                result.append(detail)
            history['by_you'] = result
        else:
            history["by_you"] = "No cars rented by you"

        user_vehicles = VehicleDetail.objects.filter(vehicle_user=carlet_user)        
        if user_vehicles.exists:
            result = []
            for vehicle in user_vehicles:
                #vehicle_location = VehicleLocation.objects.get(vehicleloc_id=vehicle)
                from_you = TripDetail.objects.filter(vehicle_trip_id=vehicle).filter(booking_confirm=True).filter(payment=True).filter(rating_done_owner=True)
                if from_you.exists():
                    for trip in from_you:
                        vehicle_renter = trip.renter_id
                        detail = {}
                        detail['vehicle_name'] = vehicle.vehicle_name
                        detail['vehicle_model'] = vehicle.vehicle_model
                        detail['vehicle_type'] = vehicle.vehicle_type
                        detail['daily_rate'] = vehicle.daily_rate
                        #detail['vehicle_address'] = vehicle_location.vehicle_street_address
                        detail['vehicle_renter_name'] = vehicle_renter.user.first_name + " " + vehicle_renter.user.last_name
                        detail['vehicle_renter_rating'] = vehicle_renter.rating
                        detail['pickup_date'] = trip.pickup_date
                        detail['dropoff_date'] = trip.dropoff_date
                        detail['trip_amount'] = trip.duration * vehicle.daily_rate
                        result.append(detail)
                        history['from_you'] = result
                else:
                    continue
            if result == []:
                history["from_you"] = "No cars owned by you"
        else:
            history["from_you"] = "No cars owned by you"

        return Response(history)


class RetreiveProfilePicture(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request, pk, format=None):
        carlet_id = uuid.UUID(pk)
        carlet_user = CarletUser.objects.get(pk=carlet_id)
        user_doc = UserDocument.objects.get(user_doc_id=carlet_user)
        try:
            image_path = path_splitting(user_doc.picture.path)
            return Response({"Success": image_path})
        except:
            return Response({"Error": "No image found"}, status = status.HTTP_400_BAD_REQUEST)

# class RedeemWallet(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

class DisplayVehiclePictures(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        picture_count = 2
        vehicle_id = uuid.UUID(pk)
        vehicle = VehicleDetail.objects.get(vehicle_id=vehicle_id)
        pic1 = path_splitting(vehicle.vehicle_picture1.path)
        pic2 = path_splitting(vehicle.vehicle_picture2.path)
        pic3 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU'
        pic4 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU'
        pic5 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU'
        
        try:
            pic3 = path_splitting(vehicle.vehicle_picture3.path)
            picture_count = picture_count + 1
        except:
            pass
        try:
            pic4 = path_splitting(vehicle.vehicle_picture4.path)
            picture_count = picture_count + 1
        except:
            pass
        try:
            pic5 = path_splitting(vehicle.vehicle_picture5.path)
            picture_count = picture_count + 1
        except:
            pass
        
        resp = [pic1,pic2,pic3,pic4,pic5]
        return Response({"Success": resp, "count": picture_count})


class RemoveVehicleForRent(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self,request,pk, format=None):
        pk = uuid.UUID(pk)
        vehicle = VehicleDetail.objects.get(pk=pk)
        vehicle.put_up_for_rent = False
        vehicle.save()
        return Response({"Success": "Vehicle is not up for rent"})

class RedeemAmount(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, format=None):
        pk = uuid.UUID(pk)
        carlet_user = CarletUser.objects.get(pk=pk)
        user_wallet = Wallet.objects.get(user=carlet_user)
        redeem_amount = int(request.data.get('redeem_amount'))

        if user_wallet.amount < redeem_amount:
            return Response({"Error": "You do not have sufficient funds in wallet"})
        else:
            user_wallet.redeem_amount = redeem_amount
            user_wallet.is_Redeemed = False
            user_wallet.save()
            return Response({"Success": "Your request has been rceieved to admin"})
