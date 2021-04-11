from django.contrib import admin
from Carletapp.models import CarletUser, UserDocument
from django.utils.safestring import mark_safe
# from Carletapp.models import VehicleDetail, TripDetail

# Register your models here.
admin.site.register(CarletUser)
# admin.site.register(VehicleDetail)
# admin.site.register(Vehicle_document)
# admin.site.register(Vehicle_Location)
# admin.site.register(UserDocument)
# admin.site.register(TripDetail)
# admin.site.register(Rating)
# admin.site.register(Voucher)

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