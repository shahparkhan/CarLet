"""Carletproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Carletapp import views
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup1/', csrf_exempt(views.SignUp1.as_view())),
    path('signup2/', csrf_exempt(views.SignUp2.as_view())),
    path('login/', csrf_exempt(views.Login.as_view())),
    path('uservalidation/', csrf_exempt(views.UserRegistrationValidation.as_view())),
    path('userregister/', csrf_exempt(views.UserRegistration.as_view())),
    path('forgotpassword/', csrf_exempt(views.ForgetPassword.as_view())),
    path('changepassword/', csrf_exempt(views.ChangePassword.as_view())),
    path('checkverification/', csrf_exempt(views.CheckVerification.as_view())),
    path('checkregistration/', csrf_exempt(views.CheckRegistration.as_view())),
    path('searchvehicle/', csrf_exempt(views.SearchVehicle.as_view())),
    path('registervehicle/', csrf_exempt(views.VehicleRegistration.as_view())),
    path('licensevalidation/', csrf_exempt(views.VehicleDetailValidation.as_view())),
    path('requestvehicle/', csrf_exempt(views.RequestVehicle.as_view())),
    path('approverequest/', csrf_exempt(views.ApproveRequest.as_view())),
    path('ratevehicle/', csrf_exempt(views.RaterReviewVehicle.as_view())),
    path('raterenter/', csrf_exempt(views.RateReviewRenter.as_view())),
    path('sentrentrequest/', csrf_exempt(views.SentRentRequest.as_view())),
    path('rcvrentrequest/', csrf_exempt(views.RecvRentRequest.as_view())),
    path('generatereceipt/', csrf_exempt(views.GenerateReceipt.as_view())),
    path('uploadreceipt/', csrf_exempt(views.UploadReceipt.as_view())),
    path('getprofileinfo/', csrf_exempt(views.GetProfileInfo.as_view())),
    path('payment/', csrf_exempt(views.Payment.as_view())),
    path('accountsetting/<str:pk>/', csrf_exempt(views.ProfileAccountSetting.as_view())),
    path('uservehicle/<str:pk>/', csrf_exempt(views.UserVehicleList.as_view())),
    path('vehiclesetting/<str:pk>/', csrf_exempt(views.VehicleSetting.as_view())),
    path('triphistory/<str:pk>/', csrf_exempt(views.TripHistory.as_view())),
    path('profilepic/<str:pk>/', csrf_exempt(views.RetreiveProfilePicture.as_view())),
    path('vehiclepictures/<str:pk>/', csrf_exempt(views.DisplayVehiclePictures.as_view())),
    path('redeemamount/<str:pk>/', csrf_exempt(views.RedeemAmount.as_view())),
    path('removefromrent/<str:pk>/', csrf_exempt(views.RemoveVehicleForRent.as_view())),
    path('updateprofilepic/<str:pk>/', csrf_exempt(views.UpdateProfilePicture.as_view())),
    path('addfav/', csrf_exempt(views.AddFavorite.as_view())),
    path('removefav/<str:pk>/', csrf_exempt(views.RemoveFavorite.as_view())),
    path('displayfav/<str:pk>/', csrf_exempt(views.FavoriteList.as_view())),


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


