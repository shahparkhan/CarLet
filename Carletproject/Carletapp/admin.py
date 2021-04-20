from django.contrib import admin
from Carletapp.models import CarletUser, UserDocument
from Carletapp.models import VehicleDetail, TripDetail, VehicleLocation, VehicleDocument
from imagekit.admin import AdminThumbnail
from django.utils.safestring import mark_safe
import csv

# Register your models here.

# admin.site.register(VehicleDetail)
# admin.site.register(VehicleDocument)
admin.site.register(VehicleLocation)
# admin.site.register(UserDocument)
admin.site.register(TripDetail)
# admin.site.register(Rating)
# admin.site.register(Voucher)
# @register(UserDocument)
# class AdminCarletUser(admin.ModelAdmin):
#     list_display = ('carletuser_id',)

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


admin.site.register(UserDocument, AdminUserDocument)
admin.site.register(VehicleDocument, AdminVehicleDocument)
admin.site.register(VehicleDetail, AdminVehicleDetail)
admin.site.register(CarletUser)