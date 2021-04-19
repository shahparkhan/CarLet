from rest_framework import serializers
from phonenumber_field.serializerfields import PhoneNumberField
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from .models import CarletUser



class UserSerializer(serializers.ModelSerializer):
    # user = Carlet_UserSerializer(read_only=True, many=True)
    def validate_email(self, value):
        # try:
        #     valid = validate_email(email_address = value, check_format = True, check_smtp = True, check_dns = True)
        #     print(valid)
        # except:
        #     raise serializers.ValidationError("Email is not valid")

        lower_email = value.lower()
        if User.objects.filter(email__iexact=lower_email).exists():
            raise serializers.ValidationError("Email already exists")
        return lower_email

    def validate_password(self, value):
        password = value.lower()
        if len(value) < 8:
            raise serializers.ValidationError("Password should be 8 characters long")
        return password

    class Meta:
        model = User
        email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
        
        fields = ['password', 'email']

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# class CarletUserSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = CarletUser
#         fields = ['user, phone_number']
