from django.contrib import admin
from Carletapp.models import CarletUser, UserDocument
from django.utils.safestring import mark_safe
from Carletapp.models import VehicleDetail, TripDetail, VehicleLocation, VehicleDocument, Wallet
from django.contrib.gis.db.models import PointField
from django.contrib.gis.db import models as geomodels
from .widget import LatLongWidget
# Register your models here.
admin.site.register(CarletUser)
# admin.site.register(VehicleDetail)
# admin.site.register(VehicleDocument)
#admin.site.register(VehicleLocation)
# admin.site.register(UserDocument)
admin.site.register(TripDetail)
# admin.site.register(Rating)
# admin.site.register(Voucher)

@admin.register(VehicleLocation)
class VehicleLocationAdmin(admin.ModelAdmin):
    formfield_overrides = {
        geomodels.PointField: {'widget': LatLongWidget},
    }



class AdminUserDocument(admin.ModelAdmin):
    list_display = ('doc_id','user_doc_id')
    readonly_fields = ["profile_image", "nic_image" ,"license_image"]
    def nic_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.NIC_picture.url,
            width=400,
            height=240,
            )
    )
    def profile_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.picture.url,
            width=400,
            height=240,
            )
    )
    def license_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.driver_license_picture.url,
            width=400,
            height=240,
            )
    )
    pass

class AdminVehicleDocument(admin.ModelAdmin):
    list_display = ('vehicledoc_id', )
    readonly_fields = ['reg_image', 'insurance_image', 'tracker_image']
    def reg_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.reg_papers.url,
            width=400,
            height=240,
            )
    )
    def insurance_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.insurace_papers.url,
            width=400,
            height=240,
            )
    )
    def tracker_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.tracker_papers.url,
            width=400,
            height=240,
            )
    )
    pass

class AdminVehicleDetail(admin.ModelAdmin):
    list_display = ('vehicle_id', 'vehicle_user' , 'vehicle_name', 'vehicle_model' )
    readonly_fields = ['vehicle_image1', 'vehicle_image2', 'vehicle_image3', 'vehicle_image4', 'vehicle_image5']
    def vehicle_image1(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.vehicle_picture1.url,
            width=400,
            height=240,
            )
    )
    def vehicle_image2(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.vehicle_picture2.url,
            width=400,
            height=240,
            )
    )
    def vehicle_image3(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.vehicle_picture3.url,
            width=400,
            height=240,
            )
    )
    def vehicle_image4(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.vehicle_picture4.url,
            width=400,
            height=240,
            )
    )
    def vehicle_image5(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.vehicle_picture5.url,
            width=400,
            height=240,
            )
    )
    pass

class AdminWallet(admin.ModelAdmin):
    list_display = ('user', 'amount', 'payment_approved')
    readonly_fields = ['payment_image']
    search_fields = ['payment_approved']
    def payment_image(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url = obj.proof_of_payment.url,
            width=400,
            height=240,
            )
    )
    def save_model(self, request, obj, form, change):
        if obj.payment_approved == True:
            obj.amount = obj.payment_amount + obj.amount
            obj.payment_amount = 0
            obj.payment_approved = False
        if obj.is_Redeemed == True:
            obj.amount = obj.amount - obj.redeem_amount
            obj.redeem_amount = 0
            obj.is_Redeemed = False
        
        super().save_model(request, obj, form, change)

admin.site.register(UserDocument, AdminUserDocument)
admin.site.register(VehicleDocument, AdminVehicleDocument)
admin.site.register(VehicleDetail, AdminVehicleDetail)
admin.site.register(Wallet, AdminWallet)
