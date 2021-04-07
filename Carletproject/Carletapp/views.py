from django.shortcuts import render
from .serializers import UserSerializer, Carlet_UserSerializer
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User

# Create your views here.