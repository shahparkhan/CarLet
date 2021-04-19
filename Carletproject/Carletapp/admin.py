from django.contrib import admin
from Carletapp.models import CarletUser, UserDocument
from django.utils.safestring import mark_safe
from Carletapp.models import VehicleDetail, TripDetail, VehicleLocation
from django.contrib.gis.db.models import PointField
from django.contrib.gis.db import models as geomodels
from .widget import LatLongWidget
# Register your models here.
admin.site.register(CarletUser)
admin.site.register(VehicleDetail)
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

admin.site.register(UserDocument, AdminUserDocument)
