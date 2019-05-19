from django.shortcuts import render
from .models import User,Work, Education, AboutUser, UserSkills,UserInterests
from rest_framework.response import Response
from rest_framework import permissions,status, generics,viewsets
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from guru.serializers import *
from django.contrib.auth import authenticate, login, logout
import json
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

class UserViewSet(generics.ListCreateAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegistrationView(generics.GenericAPIView):
    serializer_class = CreateUserSerializer
    model = User

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        aboutUser = AboutUser.objects.create(user_id=user)
        aboutUser.save()
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

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.request.user, data=self.request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"user": user })

class UpdateUserView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CreateUserSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def post(self, request, *args, **kwargs):
        return self.update(self, request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.request.user, data=self.request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({"user": user })

class AboutUserView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AboutUserSerializer

    def get(self,request):
        aboutUser = AboutUser.objects.get(user_id=self.request.user.id)
        serializer = AboutUserSerializer(aboutUser)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        return self.update(self, request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.request.user, data=self.request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        aboutUser = serializer.save()
        return Response({"aboutUser": aboutUser })

class WorkView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

    @method_decorator(ensure_csrf_cookie)
    def get(self,request):
        work = Work.objects.filter(user_id=self.request.user.id).all().order_by('end').reverse()
        serializer = WorkSerializer(work,many=True)
        return Response(serializer.data)

    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        work = serializer.save()
        return  Response({"success":("Successfully submitted.")})

    def delete(self,request, *args, **kwargs):
        work_id = self.kwargs['id']
        work = Work.objects.filter(id=work_id).delete()
        return Response({"success":("Successfully deleted.")})


class UserSkillsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = UserSkills.objects.all()
    serializer_class = UserSkillsSerializer

    def get(self,request):
        skills = UserSkills.objects.filter(user_id=self.request.user.id).all()
        serializer = UserSkillsSerializer(skills,many=True)
        return Response(serializer.data)

    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        work = serializer.save()
        return  Response({"success":("Successfully submitted.")})

    def delete(self,request, *args, **kwargs):
        skill_id = self.kwargs['id']
        skill = UserSkills.objects.filter(id=skill_id).delete()
        return Response({"success":("Successfully deleted.")})


class UserInterestsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = UserInterests.objects.all()
    serializer_class = UserInterestsSerializer

    def get(self,request):
        interests = UserInterests.objects.filter(user_id=self.request.user.id).all()
        serializer = UserInterestsSerializer(interests,many=True)
        return Response(serializer.data)

    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        interest = serializer.save()
        return  Response({"success":("Successfully submitted.")})

    def delete(self,request, *args, **kwargs):
        interest_id = self.kwargs['id']
        skill = UserInterests.objects.filter(id=interest_id).delete()
        return Response({"success":("Successfully deleted.")})


class EducationView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    def get(self,request,*args, **kwargs):
        edu = Education.objects.filter(user_id=self.request.user.id).all().order_by('end').reverse()
        serializer = EducationSerializer(edu,many=True)
        return Response(serializer.data)

    def post(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        edu = serializer.save()
        return  Response({"success":("Successfully submitted.")})

    def delete(self,request, *args, **kwargs):
        edu_id = self.kwargs['id']
        edu = Education.objects.filter(id=edu_id).delete()
        return Response({"success":("Successfully deleted.")})

class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        try:
            username = str(self.kwargs['username'])
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = None
        return user
