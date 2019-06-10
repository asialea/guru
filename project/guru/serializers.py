from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
import datetime


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name','password','type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],email=validated_data['email'],
        first_name = validated_data['first_name'],last_name=validated_data['last_name'],
        password = validated_data['password'],type=validated_data['type'],)
        return user


class AboutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUser
        fields = '__all__'
    # def update(self,instance,validated_data):
    #     about_user = AboutUser.objects.filter(user_id=instance.id).update(location=validated_data['location'],
    #     bio=validated_data['bio'],github=validated_data['github'],linkedin = validated_data['linkedin'],
    #     twitter_handle=validated_data['twitter_handle'])
    #     return about_user

class AviSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avi
        fields = ('user_id','avi_path',)

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'


class UserSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkills
        fields = '__all__'


class UserInterestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInterests
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)

class FilterSerializer(serializers.Serializer):
    username = serializers.CharField()
    type = serializers.CharField()
    avi__avi_path = serializers.CharField()

class UserViewSerializer(serializers.Serializer):
    username = serializers.CharField()
    type = serializers.CharField()
    avi__avi_path = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
