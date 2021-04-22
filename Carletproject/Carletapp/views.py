from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status, authentication, permissions
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token 
import smtplib 
from password_generator import PasswordGenerator
from email.message import EmailMessage
from validate_email import validate_email
from .models import CarletUser, VehicleDetail, VehicleDocument, UserDocument, TripDetail, VehicleLocation, VehicleDocument, Wallet
import uuid
import base64
# from django.contrib.gis.geos import *
# from django.contrib.gis.measure import D
# from django.contrib.gis.db.models.functions import Distance

# Create your views here.

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
        NIC_picture = request.data.get('nic_picture')
        driver_license = request.data.get('driver_license')
        driver_license_picture = request.data.get('driver_license_picture')
        account_no = request.data.get('iban')
        carlet_user = CarletUser.objects.get(pk=user_id)

        try:
            user_doc = UserDocument.objects.create(doc_id=doc_uuid, user_doc_id= carlet_user, NIC=nic, NIC_picture=NIC_picture,
                                                  driver_license= driver_license, driver_license_picture=driver_license_picture, account_number=account_no)
            wallet = Wallet.objects.create(user=carlet_user, amount=0, payment_amount=0)
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

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request,format=None):
        pickup_date = request.data.get('pickup_date')
        dropoff_date = request.data.get('dropoff_date')
        user_latitude = float(request.data.get('latitude'))
        user_longitude = float(request.data.get('longitude'))
        filters = request.data.get('filters')
        
                
        #exclude past history, then get cars not available
        # try:
        # query1 = TripDetail.objects.filter(dropoff_date__lte=pickup_date).values('vehicle_trip_id')
        # query2 = TripDetail.objects.filter(dropoff_date__gte=pickup_date).filter(pickup_date__lte=pickup_date).values('vehicle_trip_id')
        # query3 = TripDetail.objects.filter(pickup_date__range=[pickup_date, dropoff_date],dropoff_date__range=[pickup_date, dropoff_date] ).values('vehicle_trip_id')
        query2 = TripDetail.objects.filter(dropoff_date__gte=pickup_date).filter(pickup_date__lte=pickup_date).filter(booking_confirm=True).values('vehicle_trip_id')
        query3 = TripDetail.objects.filter(pickup_date__range=[pickup_date, dropoff_date],dropoff_date__range=[pickup_date, dropoff_date] ).filter(booking_confirm=True).values('vehicle_trip_id')
        query4 = VehicleDetail.objects.exclude(vehicle_id__in=query2).exclude(vehicle_id__in=query3).filter(put_up_for_rent=True)

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
            resp["vehicle_picture1"] = path_splitting(loc.vehicleloc_id.vehicle_picture1.path)
            resp["vehicle_picture2"] = path_splitting(loc.vehicleloc_id.vehicle_picture2.path)
            resp["vehicle_id"] = loc.vehicleloc_id.vehicle_id
            docs = UserDocument.objects.get(user_doc_id = loc.vehicleloc_id.vehicle_user)
            resp["picture"] = path_splitting(docs.picture.path)
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
        return Response({"Success": result})
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
        
        
        reg_papers = base64_to_image(request.data.get('reg_papers'))
        insurance_papers = base64_to_image(request.data.get('insurance_papers'))
        tracker_papers = base64_to_image(request.data.get('tracker_papers'))

        try:
            vehicle_detail = VehicleDetail.objects.create(vehicle_id=vehicle_id, vehicle_name=vehicle_name, vehicle_model=vehicle_model, vehicle_type=vehicle_type,
                                                    daily_rate=daily_rate, license_plate=license_plate, vehicle_picture1=vehicle_picture1,vehicle_picture2=vehicle_picture2 )

            if vehicle_picture3 is not None:
                vehicle_picture3 = base64_to_image(vehicle_picture3)
                vehicle_detail.vehicle_picture3 = vehicle_picture3
                vehicle_detail.save()

            if vehicle_picture4 is not None:
                vehicle_picture4 = base64_to_image(vehicle_picture4)
                vehicle_detail.vehicle_picture4 = vehicle_picture4
                vehicle_detail.save()
            
            if vehicle_picture5 is not None:
                vehicle_picture5 = base64_to_image(vehicle_picture5)
                vehicle_detail.vehicle_picture5 = vehicle_picture5
                vehicle_detail.save()
               
            vehicle_doc = VehicleDocument.objects.create(vehicledoc_id = vehicle_detail, reg_papers=reg_papers, insurance_papers=insurance_papers, tracker_papers=tracker_papers)
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


class RaterReviewVehicle(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        trip_id = request.data.get('trip_id')
        rating = int(request.data.get('rating'))
        # user_id = request.data.get('user_id')

        try:
            trip = TripDetail.objects.get(pk=trip_id)
            vehicle = VehicleDetail.objects.get(pk=trip.vehicle_trip_id.vehicle_id)
            vehicle.rating_counter = vehicle.rating_counter + 1
            vehicle.vehicle_rating = (vehicle.vehicle_rating*(vehicle.rating_counter - 1) + rating)/vehicle.rating_counter
            vehicle.save()
            return Response({"Success": "Vehicle Rated"})
        except:
            return Response({"Error": "An error occured"},  status=status.HTTP_400_BAD_REQUEST)

class RequestVehicle(APIView):
    def post(self, request, format=None):
        trip_id = uuid.uuid4()
        renter_id = request.data.get('user_id')
        vehicle_id = request.data.get('vehicle_id')
        pickup_date = request.data.get('pickup_date')
        dropoff_date = request.data.get('dropoff_date')
        duration = request.data.get('duration')
        cost = request.data.get('cost')
        try:
            trip_detail = TripDetail.objects.create(trip_id=trip_id,renter_id=renter_id, vehicle_trip_id=vehicle_id, pickup_date=pickup_date, dropoff_date=dropoff_date, duration=duration, cost=cost, booking_confirm=False )
            return Response({"Success": "Vehicle Requested"})
        except:
            return Response({"Error": "An error occured"})

class ApproveRequest(APIView):
    def post(Self, request, format=None):
        trip_id = request.data.get('trip_id')
        try:
            trip_detail = TripDetail.objects.get(pk=trip_detail)
            trip_detail.booking_confirm = True
            trip_detail.save()
            return Response({"Success": "Booking Confirmed"})
        except:
            return Response({"Error": "An error occured"})

class SentRentRequest(APIView):
    def post(self,request, format=None):
        user_id = request.data.get('user_id')
        
        try:
            user = CarletUser.objects.get(pk=user_id)
            query1 = TripDetail.objects.filter(renter_id=user)
            result = []
            for trips in query1:
                resp = {}
                resp['trip_id'] = trips.trip_id
                resp['vehicle_name'] = trips.vehicle_trip_id.vehicle_name
                resp['vehicle_model'] = trips.vehicle_trip_id.vehicle_model
                loc = VehicleLocation.objects.get(pk=trips.vehicle_trip_id)
                resp['vehicle_street_address'] = loc.vehicle_street_address
                resp['vehicle_city'] = loc.vehicle_city
                resp['vehicle_state'] = loc.vehicle_state
                resp['rating'] = trips.vehicle_trip_id.vehicle_rating
                resp['daily_rate'] = trips.vehicle_trip_id.daily_rate
                if (trips.booking_confirm and trips.payment and trips.dropoff_date < datetime.today().date()):
                    resp['status'] = "Dropoff Done"
                elif (trips.booking_confirm and trips.payment):
                    resp['status'] = "Payment Done"
                elif (trips.booking_confirm and not (trips.payment)):
                    resp['status'] = "Payment Pending"
                elif (not (trips.booking_confirm)):
                    if trips.dropoff_date < datetime.today().date():
                        continue 
                    resp['status'] = "Approval Pending"
                result.append(resp)
            
            return Response({"Success": "", "result" : result})
        except:
            return Response({"Error": "An error occured"},status=status.HTTP_400_BAD_REQUEST)

class RecvRentRequest(APIView):
    def post(self,request, format=None):
        user_id = request.data.get('user_id')

        try:
            user = CarletUser.objects.get(pk=user_id)
            vehicles = VehicleDetail.objects.filter(vehicle_user=user).values('vehicle_id')
            print(vehicles)
            query1 = TripDetail.objects.filter(vehicle_trip_id__in=vehicles)
            print(query1)

            result = []
            for trips in query1:
                resp = {}
                resp['trip_id'] = trips.trip_id
                resp['vehicle_name'] = trips.vehicle_trip_id.vehicle_name
                resp['vehicle_model'] = trips.vehicle_trip_id.vehicle_model
                resp['rating'] = trips.renter_id.user_rating
                resp['first_name'] = trips.renter_id.user.first_name
                resp['last_name'] = trips.renter_id.user.last_name
                resp['status'] = trips.booking_confirm
                        
                if (trips.booking_confirm and trips.payment and trips.dropoff_date < datetime.today().date()):
                    resp['status'] = "Dropoff Done"
                elif (trips.booking_confirm and trips.payment):
                    resp['status'] = "Payment Done"
                elif (trips.booking_confirm and not (trips.payment)):
                    resp['status'] = "Payment Pending"
                elif (not (trips.booking_confirm)):
                    if trips.dropoff_date < datetime.today().date():
                        continue 
                    resp['status'] = "Approval Pending"
                
                result.append(resp)
            return Response({"Success": "", "result" : result})
            
        except:
            return Response({"Error": "An error occured"},status=status.HTTP_400_BAD_REQUEST)

class GenerateReceipt(APIView):
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        amount = request.data.get('amount')
        carlet_user = CarletUser.objects.get(pk=user_id)
        email = carlet_user.user.email
        EmailAdd = "automatedcarlet@gmail.com" 
        Pass = "monashmishad" 
        try : 
            msg = EmailMessage()
            msg['Subject'] = 'Payment Voucher' 
            msg['From'] = EmailAdd
            msg['To'] = email
            try:
                wallet = Wallet.objects.get(pk=carlet_user)
                wallet.payment_amount = int(amount)
                wallet.payment_approved = False
                wallet.proof_of_payment = None
                wallet.save()
            except:
                return Response({"Error": "An error occured"}, status=status.HTTP_400_BAD_REQUEST)

            msg.set_content('This email serves as your payment voucher to topup your CarLet wallet.\n Please make a transfer to the following bank details:\n IBAN:123456789101112 \n Amount: '+ str(amount)) 

            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp: 
                smtp.login(EmailAdd,Pass) 
                smtp.send_message(msg) 
            
            return Response({"Success": "Voucher has been sent"})
        except: 
            return Response({"Failed": "Voucher not sent"}, status=status.HTTP_400_BAD_REQUEST)



class UploadReceipt(APIView):
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        proof_of_payment = request.data.get('proof_of_payment') 

        try:
            carlet_user = CarletUser.objects.get(pk=user_id)
            wallet = Wallet.objects.get(pk=carlet_user)
            wallet.proof_of_payment = proof_of_payment
            wallet.save()
            return Response({"Success": "Receipt has been uploaded"})
        except: 
            return Response({"Error": "An error occured"}, status=status.HTTP_400_BAD_REQUEST)