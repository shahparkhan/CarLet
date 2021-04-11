from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status, authentication, permissions
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.files.base import ContentFile
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
import smtplib
from password_generator import PasswordGenerator
from email.message import EmailMessage
from validate_email import validate_email
from .models import CarletUser, UserDocument
import uuid
import base64

def base64_to_image(base64_string):
    #print(base64_string)
    #print(base64_string.split(';base64,'))
    format, imgstr = base64_string.split(';base64,')
    ext = format.split('/')[-1]
    return ContentFile(base64.b64decode(imgstr), name=uuid.uuid4().hex + "." + ext)

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

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request,format=None):
        pickup_date = request.data.get('pickup_date')
        dropoff_date = request.data.get('dropoff_date')
        # filters = request.data.get('filters')
        model = ""
        vehicle_type = ""


        #exclude past history, then get cars not available
        # try:
        query1= TripDetail.objects.exclude(dropoff_date__lte=pickup_date).filter(pickup_date__range=[pickup_date,dropoff_date], dropoff_date__range=[pickup_date,dropoff_date])
        # .values('vehicle_trip_id_id')
        print(query1.values)
        # query2 = VehicleDetail.objects.exclude(vehicle_id__in=query1)
        # print(query2)
        # if query2 is not None:
        return Response(query1.values())
        # else:
        #     return Response({"Error": "No cars found with this search result"})
        # except:
        #     return Response({"Error: No cars found with this search result"})