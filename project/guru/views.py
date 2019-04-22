from django.shortcuts import render
from .models import User
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics
from guru.serializers import UserSerializer, CreateUserSerializer,LoginUserSerializer, UpdateUserSerializer
from django.contrib.auth import authenticate, login, logout


class UserViewSet(generics.ListCreateAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegistrationView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token":Token.objects.get_or_create(user= user)[0].key,
        })


# curl -X POST http://localhost:8000/auth/login/ -d "password=1110asia&username=asialea8@gmail.com"
class LoginView(generics.GenericAPIView):
    serializer_class = LoginUserSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.get_or_create(user=user)[0].key,

        })

# curl http://127.0.0.1:8000/auth/logout/  -H 'Authorization: Token 16a4856a35530a18f6fbb2d694251163ffd07b72'
class LogoutView(APIView):
    def post(self, request):
        return self.logout(request)

    def get(self, request):
        return self.logout(request)

    def logout(self, request):
        try:
            request.user.auth_token.delete()

        except (AttributeError, ObjectDoesNotExist):
            return Response({"fail":("Failed logged out.")},status=status.HTTP_400_BAD_REQUEST)

        return Response({"success":("Successfully logged out.")},status=status.HTTP_204_NO_CONTENT)

#curl http://127.0.0.1:8000/auth/user/  -H 'Authorization: Token 6818f44df21d2b35c3ff8c0c15e3b451b9d172c7'
class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UpdateUserView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UpdateUserSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        try:
            user_id = int(self.kwargs['id'])
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            user = None
        return user
